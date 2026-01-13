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
import FranchisesController from '#controllers/franchises_controller';
import GamesController from '#controllers/games_controller';
import GenresController from '#controllers/genres_controller';
import PlatformsController from '#controllers/platforms_controller';
import RegionsController from '#controllers/regions_controller';
import TitlesController from '#controllers/titles_controller';
import { middleware } from '#start/kernel';
import router from '@adonisjs/core/services/router';

router
  .group(() => {
    router.resource('companies', CompaniesController).apiOnly();
    router.resource('franchises', FranchisesController).apiOnly();
    router.resource('games', GamesController).apiOnly();
    router.resource('genres', GenresController).apiOnly();
    router.resource('platforms', PlatformsController).apiOnly();
    router.resource('regions', RegionsController).apiOnly();
    router.resource('titles', TitlesController).apiOnly();

    router.post('register', [AuthController, 'register']);
    router.post('login', [AuthController, 'login']);
    router.post('me', [AuthController, 'me']).use(middleware.auth({ guards: ['api'] }));
  })
  .prefix('/api');

router.on('*').render('pages/home');
