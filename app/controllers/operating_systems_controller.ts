import OperatingSystem from '#models/operating_system';
import type { HttpContext } from '@adonisjs/core/http';

export default class OperatingSystemsController {
  /**
   * Display a list of resources
   */
  async index() {
    return OperatingSystem.query().orderBy('name', 'asc').orderBy('arch', 'asc').exec();
  }

  /**
   * Display a single resource
   */
  async show({ params }: HttpContext) {
    const operatingSystem = await OperatingSystem.query()
      .where('id', params.id)
      .preload('emulators')
      .firstOrFail();

    return operatingSystem;
  }

  /**
   * Create a new resource
   */
  async store({ request, auth }: HttpContext) {
    // Only editors and admins can create operating systems
    if (auth.user!.role !== 'admin' && auth.user!.role !== 'editor') {
      return { error: 'Unauthorized' };
    }

    const { name, arch } = request.all();
    const operatingSystem = await OperatingSystem.create({ name, arch });

    return operatingSystem;
  }

  /**
   * Update an existing resource
   */
  async update({ params, request, auth }: HttpContext) {
    // Only editors and admins can update operating systems
    if (auth.user!.role !== 'admin' && auth.user!.role !== 'editor') {
      return { error: 'Unauthorized' };
    }

    const { name, arch } = request.all();
    const operatingSystem = await OperatingSystem.findOrFail(params.id);

    operatingSystem.merge({ name, arch });
    return await operatingSystem.save();
  }
}
