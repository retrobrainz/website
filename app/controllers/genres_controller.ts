import Genre from '#models/genre';

export default class GenresController {
  /**
   * Display a list of resource
   */
  async index() {
    return Genre.all();
  }
}
