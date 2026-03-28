/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import AuthController from '#controllers/auth_controller';
import CompaniesController from '#controllers/companies_controller';
import CompanyNamesController from '#controllers/company_names_controller';
import EmulatorFavoritesController from '#controllers/emulator_favorites_controller';
import EmulatorsController from '#controllers/emulators_controller';
import FranchiseTranslationsController from '#controllers/franchise_translations_controller';
import FranchisesController from '#controllers/franchises_controller';
import FrontendFavoritesController from '#controllers/frontend_favorites_controller';
import FrontendsController from '#controllers/frontends_controller';
import GameFavoritesController from '#controllers/game_favorites_controller';
import GameTranslationsController from '#controllers/game_translations_controller';
import GamesController from '#controllers/games_controller';
import GenreTranslationsController from '#controllers/genre_translations_controller';
import GenresController from '#controllers/genres_controller';
import ImagesController from '#controllers/images_controller';
import LanguageTranslationsController from '#controllers/language_translations_controller';
import LanguagesController from '#controllers/languages_controller';
import OperatingSystemsController from '#controllers/operating_systems_controller';
import PlatformsController from '#controllers/platforms_controller';
import ProfileController from '#controllers/profile_controller';
import RegionTranslationsController from '#controllers/region_translations_controller';
import RegionsController from '#controllers/regions_controller';
import TitleFavoritesController from '#controllers/title_favorites_controller';
import TitleTranslationsController from '#controllers/title_translations_controller';
import TitlesController from '#controllers/titles_controller';
import UsersController from '#controllers/users_controller';
import { middleware } from '#start/kernel';
import app from '@adonisjs/core/services/app';
import router from '@adonisjs/core/services/router';
import { readFile } from 'node:fs/promises';

router
  .group(() => {
    router
      .resource('companies', CompaniesController)
      .apiOnly()
      .use(['store', 'update', 'destroy'], middleware.auth({ guards: ['api'] }));
    router
      .resource('companies.names', CompanyNamesController)
      .apiOnly()
      .use(['store', 'update', 'destroy'], middleware.auth({ guards: ['api'] }));
    router
      .post('companies/:id/merge', [CompaniesController, 'merge'])
      .use(middleware.auth({ guards: ['api'] }));
    router
      .resource('emulators', EmulatorsController)
      .apiOnly()
      .use(['store', 'update'], middleware.auth({ guards: ['api'] }));
    router
      .resource('franchises', FranchisesController)
      .apiOnly()
      .use(['store', 'update', 'destroy'], middleware.auth({ guards: ['api'] }));
    router
      .post('franchises/:id/merge', [FranchisesController, 'merge'])
      .use(middleware.auth({ guards: ['api'] }));
    router
      .resource('frontends', FrontendsController)
      .apiOnly()
      .use(['store', 'update'], middleware.auth({ guards: ['api'] }));
    router
      .resource('games', GamesController)
      .apiOnly()
      .use(['store', 'update', 'destroy'], middleware.auth({ guards: ['api'] }));
    router
      .post('games/:id/merge', [GamesController, 'merge'])
      .use(middleware.auth({ guards: ['api'] }));
    router
      .resource('genres', GenresController)
      .apiOnly()
      .use(['store', 'update', 'destroy'], middleware.auth({ guards: ['api'] }));
    router
      .post('genres/:id/merge', [GenresController, 'merge'])
      .use(middleware.auth({ guards: ['api'] }));
    router
      .resource('images', ImagesController)
      .apiOnly()
      .use(['store', 'destroy'], middleware.auth({ guards: ['api'] }));
    router.get('languages', [LanguagesController, 'index']);
    router.get('languages/:id', [LanguagesController, 'show']);
    router
      .resource('operatingSystems', OperatingSystemsController)
      .apiOnly()
      .use(['store', 'update'], middleware.auth({ guards: ['api'] }));
    router
      .resource('platforms', PlatformsController)
      .apiOnly()
      .use(['store', 'update'], middleware.auth({ guards: ['api'] }));
    router.get('regions', [RegionsController, 'index']);
    router.get('regions/:id', [RegionsController, 'show']);
    router.resource('titles', TitlesController).apiOnly();
    router.post('titles/:id/merge', [TitlesController, 'merge']).use(middleware.auth());
    router.resource('users', UsersController).apiOnly();

    // Translations routes
    router
      .resource('franchises.translations', FranchiseTranslationsController)
      .apiOnly()
      .use(['store', 'update'], middleware.auth({ guards: ['api'] }));
    router
      .resource('games.translations', GameTranslationsController)
      .apiOnly()
      .use(['store', 'update'], middleware.auth({ guards: ['api'] }));
    router
      .resource('genres.translations', GenreTranslationsController)
      .apiOnly()
      .use(['store', 'update'], middleware.auth({ guards: ['api'] }));
    router
      .resource('languages.translations', LanguageTranslationsController)
      .apiOnly()
      .use(['store', 'update'], middleware.auth({ guards: ['api'] }));
    router
      .resource('regions.translations', RegionTranslationsController)
      .apiOnly()
      .use(['store', 'update'], middleware.auth({ guards: ['api'] }));
    router
      .resource('titles.translations', TitleTranslationsController)
      .apiOnly()
      .use(['store', 'update'], middleware.auth({ guards: ['api'] }));

    // Favorites routes
    router
      .resource('games.favorites', GameFavoritesController)
      .apiOnly()
      .use(['store', 'destroy'], middleware.auth({ guards: ['api'] }));
    router
      .resource('emulators.favorites', EmulatorFavoritesController)
      .apiOnly()
      .use(['store', 'destroy'], middleware.auth({ guards: ['api'] }));
    router
      .resource('frontends.favorites', FrontendFavoritesController)
      .apiOnly()
      .use(['store', 'destroy'], middleware.auth({ guards: ['api'] }));
    router
      .resource('titles.favorites', TitleFavoritesController)
      .apiOnly()
      .use(['store', 'destroy'], middleware.auth({ guards: ['api'] }));

    router.post('register', [AuthController, 'register']);
    router.post('login', [AuthController, 'login']);
    router.post('logout', [AuthController, 'logout']).use(middleware.auth({ guards: ['api'] }));

    router.get('me', [ProfileController, 'show']).use(middleware.auth({ guards: ['api'] }));
    router.put('me', [ProfileController, 'update']).use(middleware.auth({ guards: ['api'] }));

    router
      .group(() => {
        // Admin API routes
        router.resource('languages', LanguagesController).apiOnly();
        router.resource('languages.translations', LanguageTranslationsController).apiOnly();
        router.resource('regions', RegionsController).apiOnly();
        router.resource('regions.translations', RegionTranslationsController).apiOnly();
      })
      .prefix('/admin')
      .as('admin')
      .use(middleware.auth({ guards: ['api'] }))
      .use(middleware.role({ roles: ['admin'] }));
  })
  .prefix('/api')
  .as('api');

router.get('/lang/:locale/:filename', async ({ params, response }) => {
  const { locale, filename } = params;
  const filePath = app.languageFilesPath(locale, filename);

  try {
    const translation = await readFile(filePath, 'utf-8').then((data) => JSON.parse(data));
    return response.json(translation);
  } catch {
    return response.notFound();
  }
});

router.on('*').render('pages/home');
