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

    const query = Company.query();

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
    return Company.findOrFail(params.id);
  }

  /**
   * Handle form submission for the create action
   */
  async store({ request, response }: HttpContext) {
    const data = await request.validateUsing(companyValidator);
    const company = await Company.create(data);
    return response.created(company);
  }

  /**
   * Handle form submission for the edit action
   */
  async update({ params, request }: HttpContext) {
    const company = await Company.findOrFail(params.id);
    const data = await request.validateUsing(companyValidator);
    company.merge(data);
    await company.save();
    return company;
  }

  /**
   * Delete the resource
   */
  async destroy({ params, response }: HttpContext) {
    const company = await Company.findOrFail(params.id);
    await company.delete();
    return response.noContent();
  }
}
