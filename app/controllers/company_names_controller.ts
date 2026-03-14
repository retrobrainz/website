import Company from '#models/company';
import CompanyName from '#models/company_name';
import {
  companyNameStoreValidator,
  companyNameUpdateValidator,
} from '#validators/company_name_validator';
import type { HttpContext } from '@adonisjs/core/http';
import { DateTime } from 'luxon';

export default class CompanyNamesController {
  async index({ params }: HttpContext) {
    await Company.findOrFail(params.company_id);

    return CompanyName.query().where('companyId', params.company_id).orderBy('name', 'asc');
  }

  async show({ params }: HttpContext) {
    await Company.findOrFail(params.company_id);

    return CompanyName.query()
      .where('companyId', params.company_id)
      .where('id', params.id)
      .firstOrFail();
  }

  async store({ params, request, auth, response }: HttpContext) {
    if (!auth.user || (auth.user.role !== 'admin' && auth.user.role !== 'editor')) {
      return response.forbidden({ message: 'Unauthorized' });
    }

    await Company.findOrFail(params.company_id);

    const { startDate, endDate, name, ...payload } =
      await request.validateUsing(companyNameStoreValidator);

    const existingCompanyName = await CompanyName.query().where('name', name).first();

    if (existingCompanyName) {
      return response.badRequest({ message: 'Company name already exists' });
    }

    const companyName = await CompanyName.create({
      companyId: params.company_id,
      name,
      ...payload,
      startDate: startDate ? DateTime.fromISO(startDate) : null,
      endDate: endDate ? DateTime.fromISO(endDate) : null,
    });

    return response.created(companyName);
  }

  async update({ params, request, auth, response }: HttpContext) {
    if (!auth.user || (auth.user.role !== 'admin' && auth.user.role !== 'editor')) {
      return response.forbidden({ message: 'Unauthorized' });
    }

    await Company.findOrFail(params.company_id);

    const companyName = await CompanyName.findOrFail(params.id);

    if (companyName.companyId !== Number(params.company_id)) {
      return response.badRequest({
        error: 'Company name does not belong to the specified company',
      });
    }

    const { startDate, endDate, name, ...payload } = await request.validateUsing(
      companyNameUpdateValidator,
    );

    if (name && name !== companyName.name) {
      const existingCompanyName = await CompanyName.query()
        .where('name', name)
        .whereNot('id', companyName.id)
        .first();

      if (existingCompanyName) {
        return response.badRequest({ message: 'Company name already exists' });
      }
    }

    companyName.merge({
      ...payload,
      ...(name !== undefined ? { name } : {}),
      ...(startDate !== undefined
        ? { startDate: startDate ? DateTime.fromISO(startDate) : null }
        : {}),
      ...(endDate !== undefined ? { endDate: endDate ? DateTime.fromISO(endDate) : null } : {}),
    });

    await companyName.save();

    return companyName;
  }

  async destroy({ params, auth, response }: HttpContext) {
    if (!auth.user || (auth.user.role !== 'admin' && auth.user.role !== 'editor')) {
      return response.forbidden({ message: 'Unauthorized' });
    }

    await Company.findOrFail(params.company_id);

    const companyName = await CompanyName.findOrFail(params.id);

    if (companyName.companyId !== Number(params.company_id)) {
      return response.badRequest({
        error: 'Company name does not belong to the specified company',
      });
    }

    await companyName.delete();

    return response.noContent();
  }
}
