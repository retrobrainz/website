import Genre from '#models/genre';
import { genreMergeValidator } from '#validators/genre_merge_validator';
import { createGenreValidator, updateGenreValidator } from '#validators/genre_validator';
import type { HttpContext } from '@adonisjs/core/http';
import db from '@adonisjs/lucid/services/db';

export default class GenresController {
  /**
   * Display a list of resource
   */
  async index({ request, i18n }: HttpContext) {
    const page = request.input('page', 1);
    const pageSize = request.input('pageSize', 10);
    const locale = request.input('locale', i18n.locale);
    const search = request.input('search');
    const noWikipedia = request.input('noWikipedia');

    const query = Genre.query().withCount('titles');

    if (search) {
      search
        .split(' ')
        .filter(Boolean)
        .forEach((term: string) => {
          query.where('name', 'ilike', `%${term}%`);
        });
    }

    if (noWikipedia) {
      query.whereNull('wikipedia');
    }

    query.orderBy('titles_count', 'desc');

    if (locale) {
      query.preload('translations', (q) => q.where('locale', locale));
    }

    return query.paginate(page, pageSize);
  }

  /**
   * Display a single resource
   */
  async show({ params, request, i18n }: HttpContext) {
    const locale = request.input('locale');
    const query = Genre.query().where('id', params.id).withCount('titles');

    if (locale === '*') {
      query.preload('translations');
    } else {
      query.preload('translations', (q) => q.where('locale', locale || i18n.locale));
    }

    return query.firstOrFail();
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

  async merge({ params, request, auth, response }: HttpContext) {
    if (!auth.user || auth.user.role !== 'admin') {
      return response.forbidden({ message: 'Unauthorized' });
    }

    const sourceGenreId = Number(params.id);
    const { targetGenreId } = await request.validateUsing(genreMergeValidator);

    if (sourceGenreId === targetGenreId) {
      return response.badRequest({ message: 'Source and target genres must be different' });
    }

    await db.transaction(async (trx) => {
      await Genre.query({ client: trx }).where('id', sourceGenreId).firstOrFail();
      await Genre.query({ client: trx }).where('id', targetGenreId).firstOrFail();

      const titleRows = await trx
        .from('title_genre')
        .where('genre_id', sourceGenreId)
        .select('title_id');

      if (titleRows.length > 0) {
        await trx
          .table('title_genre')
          .insert(
            titleRows.map((row) => ({
              title_id: row.title_id,
              genre_id: targetGenreId,
            })),
          )
          .onConflict(['title_id', 'genre_id'])
          .ignore();
      }

      await trx.from('title_genre').where('genre_id', sourceGenreId).delete();

      await trx.from('genres').where('id', sourceGenreId).delete();
    });

    const mergedGenre = await Genre.query().where('id', targetGenreId).firstOrFail();

    return mergedGenre;
  }
}
