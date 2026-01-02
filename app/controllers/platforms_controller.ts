import Platform from '#models/platform';

export default class PlatformsController {
  /**
   * Display a list of resource
   */
  async index() {
    return Platform.all();
  }
}
