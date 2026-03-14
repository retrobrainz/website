import Company from '#models/company';
import { companyMergeValidator } from '#validators/company_merge_validator';
import { companyValidator } from '#validators/company_validator';
import type { HttpContext } from '@adonisjs/core/http';
import db from '@adonisjs/lucid/services/db';
import { DateTime } from 'luxon';

export default class CompaniesController {
  /**
   * Display a list of resource
   */
  async index({ request }: HttpContext) {
    const page = request.input('page', 1);
    const pageSize = request.input('pageSize', 20);
    const search = request.input('search');

    const query = Company.query().preload('parent');

    if (search) {
      query.where((companyQuery) => {
        companyQuery
          .where('name', 'ilike', `%${search}%`)
          .orWhere('abbr', 'ilike', `%${search}%`)
          .orWhereHas('names', (nameQuery) => {
            nameQuery.where('name', 'ilike', `%${search}%`).orWhere('abbr', 'ilike', `%${search}%`);
          });
      });
    }

    query.orderBy('name', 'asc');

    return query.paginate(page, pageSize);
  }

  /**
   * Display a single resource
   */
  async show({ params }: HttpContext) {
    return Company.query()
      .where('id', params.id)
      .preload('parent')
      .preload('names', (query) => {
        query.orderBy('name', 'asc');
      })
      .preload('children', (query) => {
        query.orderBy('name', 'asc');
      })
      .firstOrFail();
  }

  /**
   * Handle form submission for the create action
   */
  async store({ request, auth, response }: HttpContext) {
    if (!auth.user || (auth.user.role !== 'admin' && auth.user.role !== 'editor')) {
      return response.forbidden({ message: 'Unauthorized' });
    }

    const { foundingDate, defunctDate, ...payload } = await request.validateUsing(companyValidator);
    const company = await Company.create({
      ...payload,
      foundingDate: foundingDate ? DateTime.fromISO(foundingDate) : null,
      defunctDate: defunctDate ? DateTime.fromISO(defunctDate) : null,
    });
    await company.refresh();
    await company.load('parent');
    return response.created(company);
  }

  /**
   * Handle form submission for the edit action
   */
  async update({ params, request, auth, response }: HttpContext) {
    if (!auth.user || (auth.user.role !== 'admin' && auth.user.role !== 'editor')) {
      return response.forbidden({ message: 'Unauthorized' });
    }

    const company = await Company.findOrFail(params.id);
    const { foundingDate, defunctDate, ...payload } = await request.validateUsing(companyValidator);
    company.merge({
      ...payload,
      ...(foundingDate !== undefined
        ? { foundingDate: foundingDate ? DateTime.fromISO(foundingDate) : null }
        : {}),
      ...(defunctDate !== undefined
        ? { defunctDate: defunctDate ? DateTime.fromISO(defunctDate) : null }
        : {}),
    });
    await company.save();
    await company.refresh();
    await company.load('parent');
    return company;
  }

  /**
   * Delete the resource
   */
  async destroy({ params, auth, response }: HttpContext) {
    if (!auth.user || auth.user.role !== 'admin') {
      return response.forbidden({ message: 'Unauthorized' });
    }

    const company = await Company.findOrFail(params.id);
    await company.delete();
    return response.noContent();
  }

  async merge({ params, request, auth, response }: HttpContext) {
    if (!auth.user || auth.user.role !== 'admin') {
      return response.forbidden({ message: 'Unauthorized' });
    }

    const sourceCompanyId = Number(params.id);
    const { targetCompanyId } = await request.validateUsing(companyMergeValidator);

    if (sourceCompanyId === targetCompanyId) {
      return response.badRequest({ message: 'Source and target companies must be different' });
    }

    await db.transaction(async (trx) => {
      await Company.query({ client: trx }).where('id', sourceCompanyId).firstOrFail();
      await Company.query({ client: trx }).where('id', targetCompanyId).firstOrFail();

      const developerRows = await trx
        .from('game_developer')
        .where('company_id', sourceCompanyId)
        .select('game_id');

      if (developerRows.length > 0) {
        await trx
          .table('game_developer')
          .insert(
            developerRows.map((row) => ({
              game_id: row.game_id,
              company_id: targetCompanyId,
            })),
          )
          .onConflict(['game_id', 'company_id'])
          .ignore();
      }

      const publisherRows = await trx
        .from('game_publisher')
        .where('company_id', sourceCompanyId)
        .select('game_id');

      if (publisherRows.length > 0) {
        await trx
          .table('game_publisher')
          .insert(
            publisherRows.map((row) => ({
              game_id: row.game_id,
              company_id: targetCompanyId,
            })),
          )
          .onConflict(['game_id', 'company_id'])
          .ignore();
      }

      await trx.from('companies').where('id', sourceCompanyId).delete();
    });

    const mergedCompany = await Company.query()
      .where('id', targetCompanyId)
      .preload('parent')
      .preload('names', (query) => {
        query.orderBy('name', 'asc');
      })
      .preload('children', (query) => {
        query.orderBy('name', 'asc');
      })
      .firstOrFail();

    return mergedCompany;
  }
}
