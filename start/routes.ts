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
import FavoritesController from '#controllers/favorites_controller';
import FranchisesController from '#controllers/franchises_controller';
import GamesController from '#controllers/games_controller';
import GenresController from '#controllers/genres_controller';
import ImagesController from '#controllers/images_controller';
import LanguagesController from '#controllers/languages_controller';
import PlatformsController from '#controllers/platforms_controller';
import ProfileController from '#controllers/profile_controller';
import RegionsController from '#controllers/regions_controller';
import UsersController from '#controllers/users_controller';
import { middleware } from '#start/kernel';
import router from '@adonisjs/core/services/router';

router
  .group(() => {
    router.resource('companies', CompaniesController).apiOnly();
    router.resource('franchises', FranchisesController).apiOnly();
    router
      .resource('games', GamesController)
      .apiOnly()
      .use(['store', 'update', 'destroy'], middleware.auth({ guards: ['api'] }))
      .use(['index', 'show'], middleware.auth({ optional: true, guards: ['api'] }));
    router.resource('genres', GenresController).apiOnly();
    router
      .resource('images', ImagesController)
      .apiOnly()
      .use(['store', 'destroy'], middleware.auth({ guards: ['api'] }));
    router.resource('languages', LanguagesController).apiOnly();
    router.resource('platforms', PlatformsController).apiOnly();
    router.resource('regions', RegionsController).apiOnly();
    router.resource('users', UsersController).apiOnly();

    // Favorites routes
    router
      .resource('favorites', FavoritesController)
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
