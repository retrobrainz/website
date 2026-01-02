import Region from '#models/region';

export default class RegionsController {
  /**
   * Display a list of resource
   */
  async index() {
    return Region.all();
  }
}
