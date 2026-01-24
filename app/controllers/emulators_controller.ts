import Emulator from '#models/emulator';

export default class EmulatorsController {
  /**
   * Display a list of resource
   */
  async index() {
    return Emulator.query().orderBy('name', 'asc').exec();
  }

  async show({ params }: { params: { id: string } }) {
    const emulator = await Emulator.query()
      .where('id', params.id)
      .preload('platforms')
      .firstOrFail();

    return emulator;
  }
}
