import Company from '#models/company';

export default class CompaniesController {
  /**
   * Display a list of resource
   */
  async index() {
    return Company.all();
  }
}
