/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import GamesController from '#controllers/games_controller';
import router from '@adonisjs/core/services/router';

router
  .group(() => {
    router.resource('games', GamesController).apiOnly();
  })
  .prefix('/api');

router.on('*').render('pages/home');
