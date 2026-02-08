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
import LanguagesController from '#controllers/languages_controller';
import OperatingSystemsController from '#controllers/operating_systems_controller';
import PlatformsController from '#controllers/platforms_controller';
import ProfileController from '#controllers/profile_controller';
import RegionsController from '#controllers/regions_controller';
import TitleTranslationsController from '#controllers/title_translations_controller';
import TitlesController from '#controllers/titles_controller';
import UsersController from '#controllers/users_controller';
import { middleware } from '#start/kernel';
import router from '@adonisjs/core/services/router';

router
  .group(() => {
    router
      .resource('companies', CompaniesController)
      .apiOnly()
      .use(['store', 'update', 'destroy'], middleware.auth({ guards: ['api'] }));
    router
      .resource('emulators', EmulatorsController)
      .apiOnly()
      .use(['store', 'update'], middleware.auth({ guards: ['api'] }));
    router
      .resource('franchises', FranchisesController)
      .apiOnly()
      .use(['store', 'update'], middleware.auth({ guards: ['api'] }));
    router
      .resource('frontends', FrontendsController)
      .apiOnly()
      .use(['store', 'update'], middleware.auth({ guards: ['api'] }));
    router
      .resource('games', GamesController)
      .apiOnly()
      .use(['store', 'update', 'destroy'], middleware.auth({ guards: ['api'] }));
    router.resource('genres', GenresController).apiOnly();
    router
      .resource('images', ImagesController)
      .apiOnly()
      .use(['store', 'destroy'], middleware.auth({ guards: ['api'] }));
    router.resource('languages', LanguagesController).apiOnly();
    router
      .resource('operatingSystems', OperatingSystemsController)
      .apiOnly()
      .use(['store', 'update'], middleware.auth({ guards: ['api'] }));
    router.resource('platforms', PlatformsController).apiOnly();
    router.resource('regions', RegionsController).apiOnly();
    router.resource('titles', TitlesController).apiOnly();
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

    router.post('register', [AuthController, 'register']);
    router.post('login', [AuthController, 'login']);
    router.post('logout', [AuthController, 'logout']).use(middleware.auth({ guards: ['api'] }));

    router.get('me', [ProfileController, 'show']).use(middleware.auth({ guards: ['api'] }));
    router.put('me', [ProfileController, 'update']).use(middleware.auth({ guards: ['api'] }));
  })
  .prefix('/api');

router.on('*').render('pages/home');
