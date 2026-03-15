import Title from '#models/title';
import { titleMergeValidator } from '#validators/title_merge_validator';
import type { HttpContext } from '@adonisjs/core/http';
import db from '@adonisjs/lucid/services/db';

export default class TitlesController {
  /**
   * Display a list of resource
   */
  async index({ request, i18n }: HttpContext) {
    const page = request.input('page', 1);
    const pageSize = request.input('pageSize', 20);
    const search = request.input('search');
    const platformId = request.input('platformId');
    const franchiseId = request.input('franchiseId');
    const noFranchise = request.input('noFranchise');
    const genreId = request.input('genreId');

    const query = Title.query();

    if (search) {
      search
        .split(' ')
        .filter(Boolean)
        .forEach((term: string) => {
          query.where('name', 'ilike', `%${term}%`);
        });
    }

    if (platformId) {
      query.whereHas('platforms', (q) => {
        q.where('platforms.id', platformId);
      });
    }

    if (franchiseId) {
      query.whereHas('franchises', (q) => {
        q.where('franchises.id', franchiseId);
      });
    }

    if (noFranchise === true || noFranchise === 'true') {
      query.whereDoesntHave('franchises', () => {});
    }

    if (genreId) {
      query.whereHas('genres', (q) => {
        q.where('genres.id', genreId);
      });
    }

    query
      .withCount('games')
      .preload('translations', (q) => q.where('locale', i18n.locale))
      .preload('games', (q) => {
        q.whereNotNull('boxartId')
          .withCount('favorites')
          .orderBy('favorites_count', 'desc')
          .groupLimit(1)
          .preload('boxart');
      })
      .preload('platforms')
      .preload('franchises', (q) =>
        q.preload('translations', (qq) => qq.where('locale', i18n.locale)),
      )
      .preload('genres', (q) => q.preload('translations', (qq) => qq.where('locale', i18n.locale)));

    query.orderBy('name', 'asc');

    return query.paginate(page, pageSize);
  }

  /**
   * Display a single resource
   */
  async show({ params, i18n }: HttpContext) {
    return Title.query()
      .where('id', params.id)
      .preload('translations', (q) => q.where('locale', i18n.locale))
      .preload('franchises', (q) =>
        q.preload('translations', (qq) => qq.where('locale', i18n.locale)),
      )
      .preload('genres', (q) => q.preload('translations', (qq) => qq.where('locale', i18n.locale)))
      .firstOrFail();
  }

  /**
   * Handle form submission for the create action
   */
  async store({ request, response }: HttpContext) {
    const data = request.only(['name', 'wikipedia']);
    const title = await Title.create(data);

    const franchiseIds = request.input('franchiseIds');
    if (Array.isArray(franchiseIds)) {
      await title.related('franchises').sync(franchiseIds);
    }

    const genreIds = request.input('genreIds');
    if (Array.isArray(genreIds)) {
      await title.related('genres').sync(genreIds);
    }

    await title.load('franchises');
    await title.load('genres');
    return response.created(title);
  }

  /**
   * Handle form submission for the edit action
   */
  async update({ params, request }: HttpContext) {
    const title = await Title.findOrFail(params.id);
    const data = request.only(['name', 'wikipedia']);
    title.merge(data);
    await title.save();

    const franchiseIds = request.input('franchiseIds');
    if (Array.isArray(franchiseIds)) {
      await title.related('franchises').sync(franchiseIds);
    }

    const genreIds = request.input('genreIds');
    if (Array.isArray(genreIds)) {
      await title.related('genres').sync(genreIds);
    }

    await title.load('franchises');
    await title.load('genres');
    return title;
  }

  /**
   * Delete record
   */
  async destroy({ params, response }: HttpContext) {
    const title = await Title.findOrFail(params.id);
    await title.delete();
    return response.noContent();
  }

  async merge({ params, request, auth, response, i18n }: HttpContext) {
    if (!auth.user || auth.user.role !== 'admin') {
      return response.forbidden({ message: 'Unauthorized' });
    }

    const sourceTitleId = Number(params.id);
    const { targetTitleId } = await request.validateUsing(titleMergeValidator);

    if (sourceTitleId === targetTitleId) {
      return response.badRequest({ message: 'Source and target titles must be different' });
    }

    await db.transaction(async (trx) => {
      await Title.query({ client: trx }).where('id', sourceTitleId).firstOrFail();
      await Title.query({ client: trx }).where('id', targetTitleId).firstOrFail();

      // Migrate games
      await trx.from('games').where('title_id', sourceTitleId).update({ title_id: targetTitleId });

      // Migrate franchises
      const franchiseRows = await trx
        .from('title_franchise')
        .where('title_id', sourceTitleId)
        .select('franchise_id');
      if (franchiseRows.length > 0) {
        await trx
          .table('title_franchise')
          .insert(
            franchiseRows.map((row) => ({
              franchise_id: row.franchise_id,
              title_id: targetTitleId,
            })),
          )
          .onConflict(['franchise_id', 'title_id'])
          .ignore();
      }

      // Migrate genres
      const genreRows = await trx
        .from('title_genre')
        .where('title_id', sourceTitleId)
        .select('genre_id');
      if (genreRows.length > 0) {
        await trx
          .table('title_genre')
          .insert(genreRows.map((row) => ({ genre_id: row.genre_id, title_id: targetTitleId })))
          .onConflict(['genre_id', 'title_id'])
          .ignore();
      }

      // Migrate favorites
      const favoriteRows = await trx
        .from('title_favorites')
        .where('title_id', sourceTitleId)
        .select('user_id');
      if (favoriteRows.length > 0) {
        await trx
          .table('title_favorites')
          .insert(favoriteRows.map((row) => ({ user_id: row.user_id, title_id: targetTitleId })))
          .onConflict(['user_id', 'title_id'])
          .ignore();
      }

      await trx.from('titles').where('id', sourceTitleId).delete();
    });

    return Title.query()
      .where('id', targetTitleId)
      .preload('translations', (q) => q.where('locale', i18n.locale))
      .preload('franchises', (q) =>
        q.preload('translations', (qq) => qq.where('locale', i18n.locale)),
      )
      .preload('genres', (q) => q.preload('translations', (qq) => qq.where('locale', i18n.locale)))
      .firstOrFail();
  }
}
