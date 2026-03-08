import Company from '#models/company';
import { companyValidator } from '#validators/company_validator';
import type { HttpContext } from '@adonisjs/core/http';

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
      query.where('name', 'ilike', `%${search}%`);
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

    const data = await request.validateUsing(companyValidator);
    const company = await Company.create(data);
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
    const data = await request.validateUsing(companyValidator);
    company.merge(data);
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
}
