import Platform from '#models/platform';

export default class PlatformsController {
  /**
   * Display a list of resource
   */
  async index() {
    return Platform.query()
      .orderBy('releaseDate', 'desc')
      .preload('company')
      .withCount('games')
      .exec();
  }

  async show({ params }: { params: { id: string } }) {
    const platform = await Platform.query()
      .where('id', params.id)
      .preload('company')
      .withCount('games')
      .firstOrFail();

    return platform;
  }
}
