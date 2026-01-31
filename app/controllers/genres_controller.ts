import Genre from '#models/genre';
import { createGenreValidator, updateGenreValidator } from '#validators/genre_validator';
import type { HttpContext } from '@adonisjs/core/http';

export default class GenresController {
  /**
   * Display a list of resource
   */
  async index({ request }: HttpContext) {
    const page = request.input('page', 1);
    const pageSize = request.input('pageSize', 20);
    return Genre.query().withCount('games').orderBy('games_count', 'desc').paginate(page, pageSize);
  }

  /**
   * Display a single resource
   */
  async show({ params }: HttpContext) {
    return Genre.query()
      .where('id', params.id)
      .preload('games', (query) => {
        query.preload('platform').preload('boxart').orderBy('name');
      })
      .withCount('games')
      .firstOrFail();
  }

  /**
   * Handle form submission for the create action
   */
  async store({ request, auth, response }: HttpContext) {
    if (!auth.user || (auth.user.role !== 'admin' && auth.user.role !== 'editor')) {
      return response.forbidden({ message: 'You are not authorized to perform this action' });
    }
    const payload = await request.validateUsing(createGenreValidator);
    return Genre.create(payload);
  }

  /**
   * Handle form submission for the edit action
   */
  async update({ params, request, auth, response }: HttpContext) {
    if (!auth.user || (auth.user.role !== 'admin' && auth.user.role !== 'editor')) {
      return response.forbidden({ message: 'You are not authorized to perform this action' });
    }
    const genre = await Genre.findOrFail(params.id);
    const payload = await request.validateUsing(updateGenreValidator);
    genre.merge(payload);
    await genre.save();
    return genre;
  }

  /**
   * Delete a resource
   */
  async destroy({ params, auth, response }: HttpContext) {
    if (!auth.user || auth.user.role !== 'admin') {
      return response.forbidden({ message: 'You are not authorized to perform this action' });
    }
    const genre = await Genre.findOrFail(params.id);
    await genre.delete();
    return response.noContent();
  }
}
