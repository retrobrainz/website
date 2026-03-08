import '@adonisjs/core/types/http'

type ParamValue = string | number | bigint | boolean

export type ScannedRoutes = {
  ALL: {
    'drive.fs.serve': { paramsTuple: [...ParamValue[]]; params: {'*': ParamValue[]} }
    'companies.index': { paramsTuple?: []; params?: {} }
    'companies.store': { paramsTuple?: []; params?: {} }
    'companies.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'companies.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'companies.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'companies.merge': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'emulators.index': { paramsTuple?: []; params?: {} }
    'emulators.store': { paramsTuple?: []; params?: {} }
    'emulators.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'emulators.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'emulators.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'franchises.index': { paramsTuple?: []; params?: {} }
    'franchises.store': { paramsTuple?: []; params?: {} }
    'franchises.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'franchises.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'franchises.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'frontends.index': { paramsTuple?: []; params?: {} }
    'frontends.store': { paramsTuple?: []; params?: {} }
    'frontends.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'frontends.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'frontends.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'games.index': { paramsTuple?: []; params?: {} }
    'games.store': { paramsTuple?: []; params?: {} }
    'games.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'games.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'games.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'genres.index': { paramsTuple?: []; params?: {} }
    'genres.store': { paramsTuple?: []; params?: {} }
    'genres.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'genres.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'genres.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'images.index': { paramsTuple?: []; params?: {} }
    'images.store': { paramsTuple?: []; params?: {} }
    'images.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'images.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'images.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'languages.index': { paramsTuple?: []; params?: {} }
    'languages.store': { paramsTuple?: []; params?: {} }
    'languages.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'languages.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'languages.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'operating_systems.index': { paramsTuple?: []; params?: {} }
    'operating_systems.store': { paramsTuple?: []; params?: {} }
    'operating_systems.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'operating_systems.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'operating_systems.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'platforms.index': { paramsTuple?: []; params?: {} }
    'platforms.store': { paramsTuple?: []; params?: {} }
    'platforms.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'platforms.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'platforms.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'regions.index': { paramsTuple?: []; params?: {} }
    'regions.store': { paramsTuple?: []; params?: {} }
    'regions.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'regions.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'regions.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'titles.index': { paramsTuple?: []; params?: {} }
    'titles.store': { paramsTuple?: []; params?: {} }
    'titles.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'titles.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'titles.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'users.index': { paramsTuple?: []; params?: {} }
    'users.store': { paramsTuple?: []; params?: {} }
    'users.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'users.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'users.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'franchises.translations.index': { paramsTuple: [ParamValue]; params: {'franchise_id': ParamValue} }
    'franchises.translations.store': { paramsTuple: [ParamValue]; params: {'franchise_id': ParamValue} }
    'franchises.translations.show': { paramsTuple: [ParamValue,ParamValue]; params: {'franchise_id': ParamValue,'id': ParamValue} }
    'franchises.translations.update': { paramsTuple: [ParamValue,ParamValue]; params: {'franchise_id': ParamValue,'id': ParamValue} }
    'franchises.translations.destroy': { paramsTuple: [ParamValue,ParamValue]; params: {'franchise_id': ParamValue,'id': ParamValue} }
    'games.translations.index': { paramsTuple: [ParamValue]; params: {'game_id': ParamValue} }
    'games.translations.store': { paramsTuple: [ParamValue]; params: {'game_id': ParamValue} }
    'games.translations.show': { paramsTuple: [ParamValue,ParamValue]; params: {'game_id': ParamValue,'id': ParamValue} }
    'games.translations.update': { paramsTuple: [ParamValue,ParamValue]; params: {'game_id': ParamValue,'id': ParamValue} }
    'games.translations.destroy': { paramsTuple: [ParamValue,ParamValue]; params: {'game_id': ParamValue,'id': ParamValue} }
    'genres.translations.index': { paramsTuple: [ParamValue]; params: {'genre_id': ParamValue} }
    'genres.translations.store': { paramsTuple: [ParamValue]; params: {'genre_id': ParamValue} }
    'genres.translations.show': { paramsTuple: [ParamValue,ParamValue]; params: {'genre_id': ParamValue,'id': ParamValue} }
    'genres.translations.update': { paramsTuple: [ParamValue,ParamValue]; params: {'genre_id': ParamValue,'id': ParamValue} }
    'genres.translations.destroy': { paramsTuple: [ParamValue,ParamValue]; params: {'genre_id': ParamValue,'id': ParamValue} }
    'titles.translations.index': { paramsTuple: [ParamValue]; params: {'title_id': ParamValue} }
    'titles.translations.store': { paramsTuple: [ParamValue]; params: {'title_id': ParamValue} }
    'titles.translations.show': { paramsTuple: [ParamValue,ParamValue]; params: {'title_id': ParamValue,'id': ParamValue} }
    'titles.translations.update': { paramsTuple: [ParamValue,ParamValue]; params: {'title_id': ParamValue,'id': ParamValue} }
    'titles.translations.destroy': { paramsTuple: [ParamValue,ParamValue]; params: {'title_id': ParamValue,'id': ParamValue} }
    'games.favorites.index': { paramsTuple: [ParamValue]; params: {'game_id': ParamValue} }
    'games.favorites.store': { paramsTuple: [ParamValue]; params: {'game_id': ParamValue} }
    'games.favorites.show': { paramsTuple: [ParamValue,ParamValue]; params: {'game_id': ParamValue,'id': ParamValue} }
    'games.favorites.update': { paramsTuple: [ParamValue,ParamValue]; params: {'game_id': ParamValue,'id': ParamValue} }
    'games.favorites.destroy': { paramsTuple: [ParamValue,ParamValue]; params: {'game_id': ParamValue,'id': ParamValue} }
    'emulators.favorites.index': { paramsTuple: [ParamValue]; params: {'emulator_id': ParamValue} }
    'emulators.favorites.store': { paramsTuple: [ParamValue]; params: {'emulator_id': ParamValue} }
    'emulators.favorites.show': { paramsTuple: [ParamValue,ParamValue]; params: {'emulator_id': ParamValue,'id': ParamValue} }
    'emulators.favorites.update': { paramsTuple: [ParamValue,ParamValue]; params: {'emulator_id': ParamValue,'id': ParamValue} }
    'emulators.favorites.destroy': { paramsTuple: [ParamValue,ParamValue]; params: {'emulator_id': ParamValue,'id': ParamValue} }
    'frontends.favorites.index': { paramsTuple: [ParamValue]; params: {'frontend_id': ParamValue} }
    'frontends.favorites.store': { paramsTuple: [ParamValue]; params: {'frontend_id': ParamValue} }
    'frontends.favorites.show': { paramsTuple: [ParamValue,ParamValue]; params: {'frontend_id': ParamValue,'id': ParamValue} }
    'frontends.favorites.update': { paramsTuple: [ParamValue,ParamValue]; params: {'frontend_id': ParamValue,'id': ParamValue} }
    'frontends.favorites.destroy': { paramsTuple: [ParamValue,ParamValue]; params: {'frontend_id': ParamValue,'id': ParamValue} }
    'titles.favorites.index': { paramsTuple: [ParamValue]; params: {'title_id': ParamValue} }
    'titles.favorites.store': { paramsTuple: [ParamValue]; params: {'title_id': ParamValue} }
    'titles.favorites.show': { paramsTuple: [ParamValue,ParamValue]; params: {'title_id': ParamValue,'id': ParamValue} }
    'titles.favorites.update': { paramsTuple: [ParamValue,ParamValue]; params: {'title_id': ParamValue,'id': ParamValue} }
    'titles.favorites.destroy': { paramsTuple: [ParamValue,ParamValue]; params: {'title_id': ParamValue,'id': ParamValue} }
    'auth.register': { paramsTuple?: []; params?: {} }
    'auth.login': { paramsTuple?: []; params?: {} }
    'auth.logout': { paramsTuple?: []; params?: {} }
    'profile.show': { paramsTuple?: []; params?: {} }
    'profile.update': { paramsTuple?: []; params?: {} }
  }
  GET: {
    'drive.fs.serve': { paramsTuple: [...ParamValue[]]; params: {'*': ParamValue[]} }
    'companies.index': { paramsTuple?: []; params?: {} }
    'companies.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'emulators.index': { paramsTuple?: []; params?: {} }
    'emulators.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'franchises.index': { paramsTuple?: []; params?: {} }
    'franchises.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'frontends.index': { paramsTuple?: []; params?: {} }
    'frontends.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'games.index': { paramsTuple?: []; params?: {} }
    'games.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'genres.index': { paramsTuple?: []; params?: {} }
    'genres.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'images.index': { paramsTuple?: []; params?: {} }
    'images.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'languages.index': { paramsTuple?: []; params?: {} }
    'languages.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'operating_systems.index': { paramsTuple?: []; params?: {} }
    'operating_systems.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'platforms.index': { paramsTuple?: []; params?: {} }
    'platforms.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'regions.index': { paramsTuple?: []; params?: {} }
    'regions.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'titles.index': { paramsTuple?: []; params?: {} }
    'titles.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'users.index': { paramsTuple?: []; params?: {} }
    'users.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'franchises.translations.index': { paramsTuple: [ParamValue]; params: {'franchise_id': ParamValue} }
    'franchises.translations.show': { paramsTuple: [ParamValue,ParamValue]; params: {'franchise_id': ParamValue,'id': ParamValue} }
    'games.translations.index': { paramsTuple: [ParamValue]; params: {'game_id': ParamValue} }
    'games.translations.show': { paramsTuple: [ParamValue,ParamValue]; params: {'game_id': ParamValue,'id': ParamValue} }
    'genres.translations.index': { paramsTuple: [ParamValue]; params: {'genre_id': ParamValue} }
    'genres.translations.show': { paramsTuple: [ParamValue,ParamValue]; params: {'genre_id': ParamValue,'id': ParamValue} }
    'titles.translations.index': { paramsTuple: [ParamValue]; params: {'title_id': ParamValue} }
    'titles.translations.show': { paramsTuple: [ParamValue,ParamValue]; params: {'title_id': ParamValue,'id': ParamValue} }
    'games.favorites.index': { paramsTuple: [ParamValue]; params: {'game_id': ParamValue} }
    'games.favorites.show': { paramsTuple: [ParamValue,ParamValue]; params: {'game_id': ParamValue,'id': ParamValue} }
    'emulators.favorites.index': { paramsTuple: [ParamValue]; params: {'emulator_id': ParamValue} }
    'emulators.favorites.show': { paramsTuple: [ParamValue,ParamValue]; params: {'emulator_id': ParamValue,'id': ParamValue} }
    'frontends.favorites.index': { paramsTuple: [ParamValue]; params: {'frontend_id': ParamValue} }
    'frontends.favorites.show': { paramsTuple: [ParamValue,ParamValue]; params: {'frontend_id': ParamValue,'id': ParamValue} }
    'titles.favorites.index': { paramsTuple: [ParamValue]; params: {'title_id': ParamValue} }
    'titles.favorites.show': { paramsTuple: [ParamValue,ParamValue]; params: {'title_id': ParamValue,'id': ParamValue} }
    'profile.show': { paramsTuple?: []; params?: {} }
  }
  HEAD: {
    'drive.fs.serve': { paramsTuple: [...ParamValue[]]; params: {'*': ParamValue[]} }
    'companies.index': { paramsTuple?: []; params?: {} }
    'companies.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'emulators.index': { paramsTuple?: []; params?: {} }
    'emulators.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'franchises.index': { paramsTuple?: []; params?: {} }
    'franchises.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'frontends.index': { paramsTuple?: []; params?: {} }
    'frontends.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'games.index': { paramsTuple?: []; params?: {} }
    'games.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'genres.index': { paramsTuple?: []; params?: {} }
    'genres.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'images.index': { paramsTuple?: []; params?: {} }
    'images.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'languages.index': { paramsTuple?: []; params?: {} }
    'languages.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'operating_systems.index': { paramsTuple?: []; params?: {} }
    'operating_systems.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'platforms.index': { paramsTuple?: []; params?: {} }
    'platforms.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'regions.index': { paramsTuple?: []; params?: {} }
    'regions.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'titles.index': { paramsTuple?: []; params?: {} }
    'titles.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'users.index': { paramsTuple?: []; params?: {} }
    'users.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'franchises.translations.index': { paramsTuple: [ParamValue]; params: {'franchise_id': ParamValue} }
    'franchises.translations.show': { paramsTuple: [ParamValue,ParamValue]; params: {'franchise_id': ParamValue,'id': ParamValue} }
    'games.translations.index': { paramsTuple: [ParamValue]; params: {'game_id': ParamValue} }
    'games.translations.show': { paramsTuple: [ParamValue,ParamValue]; params: {'game_id': ParamValue,'id': ParamValue} }
    'genres.translations.index': { paramsTuple: [ParamValue]; params: {'genre_id': ParamValue} }
    'genres.translations.show': { paramsTuple: [ParamValue,ParamValue]; params: {'genre_id': ParamValue,'id': ParamValue} }
    'titles.translations.index': { paramsTuple: [ParamValue]; params: {'title_id': ParamValue} }
    'titles.translations.show': { paramsTuple: [ParamValue,ParamValue]; params: {'title_id': ParamValue,'id': ParamValue} }
    'games.favorites.index': { paramsTuple: [ParamValue]; params: {'game_id': ParamValue} }
    'games.favorites.show': { paramsTuple: [ParamValue,ParamValue]; params: {'game_id': ParamValue,'id': ParamValue} }
    'emulators.favorites.index': { paramsTuple: [ParamValue]; params: {'emulator_id': ParamValue} }
    'emulators.favorites.show': { paramsTuple: [ParamValue,ParamValue]; params: {'emulator_id': ParamValue,'id': ParamValue} }
    'frontends.favorites.index': { paramsTuple: [ParamValue]; params: {'frontend_id': ParamValue} }
    'frontends.favorites.show': { paramsTuple: [ParamValue,ParamValue]; params: {'frontend_id': ParamValue,'id': ParamValue} }
    'titles.favorites.index': { paramsTuple: [ParamValue]; params: {'title_id': ParamValue} }
    'titles.favorites.show': { paramsTuple: [ParamValue,ParamValue]; params: {'title_id': ParamValue,'id': ParamValue} }
    'profile.show': { paramsTuple?: []; params?: {} }
  }
  POST: {
    'companies.store': { paramsTuple?: []; params?: {} }
    'companies.merge': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'emulators.store': { paramsTuple?: []; params?: {} }
    'franchises.store': { paramsTuple?: []; params?: {} }
    'frontends.store': { paramsTuple?: []; params?: {} }
    'games.store': { paramsTuple?: []; params?: {} }
    'genres.store': { paramsTuple?: []; params?: {} }
    'images.store': { paramsTuple?: []; params?: {} }
    'languages.store': { paramsTuple?: []; params?: {} }
    'operating_systems.store': { paramsTuple?: []; params?: {} }
    'platforms.store': { paramsTuple?: []; params?: {} }
    'regions.store': { paramsTuple?: []; params?: {} }
    'titles.store': { paramsTuple?: []; params?: {} }
    'users.store': { paramsTuple?: []; params?: {} }
    'franchises.translations.store': { paramsTuple: [ParamValue]; params: {'franchise_id': ParamValue} }
    'games.translations.store': { paramsTuple: [ParamValue]; params: {'game_id': ParamValue} }
    'genres.translations.store': { paramsTuple: [ParamValue]; params: {'genre_id': ParamValue} }
    'titles.translations.store': { paramsTuple: [ParamValue]; params: {'title_id': ParamValue} }
    'games.favorites.store': { paramsTuple: [ParamValue]; params: {'game_id': ParamValue} }
    'emulators.favorites.store': { paramsTuple: [ParamValue]; params: {'emulator_id': ParamValue} }
    'frontends.favorites.store': { paramsTuple: [ParamValue]; params: {'frontend_id': ParamValue} }
    'titles.favorites.store': { paramsTuple: [ParamValue]; params: {'title_id': ParamValue} }
    'auth.register': { paramsTuple?: []; params?: {} }
    'auth.login': { paramsTuple?: []; params?: {} }
    'auth.logout': { paramsTuple?: []; params?: {} }
  }
  PUT: {
    'companies.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'emulators.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'franchises.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'frontends.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'games.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'genres.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'images.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'languages.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'operating_systems.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'platforms.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'regions.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'titles.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'users.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'franchises.translations.update': { paramsTuple: [ParamValue,ParamValue]; params: {'franchise_id': ParamValue,'id': ParamValue} }
    'games.translations.update': { paramsTuple: [ParamValue,ParamValue]; params: {'game_id': ParamValue,'id': ParamValue} }
    'genres.translations.update': { paramsTuple: [ParamValue,ParamValue]; params: {'genre_id': ParamValue,'id': ParamValue} }
    'titles.translations.update': { paramsTuple: [ParamValue,ParamValue]; params: {'title_id': ParamValue,'id': ParamValue} }
    'games.favorites.update': { paramsTuple: [ParamValue,ParamValue]; params: {'game_id': ParamValue,'id': ParamValue} }
    'emulators.favorites.update': { paramsTuple: [ParamValue,ParamValue]; params: {'emulator_id': ParamValue,'id': ParamValue} }
    'frontends.favorites.update': { paramsTuple: [ParamValue,ParamValue]; params: {'frontend_id': ParamValue,'id': ParamValue} }
    'titles.favorites.update': { paramsTuple: [ParamValue,ParamValue]; params: {'title_id': ParamValue,'id': ParamValue} }
    'profile.update': { paramsTuple?: []; params?: {} }
  }
  PATCH: {
    'companies.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'emulators.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'franchises.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'frontends.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'games.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'genres.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'images.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'languages.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'operating_systems.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'platforms.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'regions.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'titles.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'users.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'franchises.translations.update': { paramsTuple: [ParamValue,ParamValue]; params: {'franchise_id': ParamValue,'id': ParamValue} }
    'games.translations.update': { paramsTuple: [ParamValue,ParamValue]; params: {'game_id': ParamValue,'id': ParamValue} }
    'genres.translations.update': { paramsTuple: [ParamValue,ParamValue]; params: {'genre_id': ParamValue,'id': ParamValue} }
    'titles.translations.update': { paramsTuple: [ParamValue,ParamValue]; params: {'title_id': ParamValue,'id': ParamValue} }
    'games.favorites.update': { paramsTuple: [ParamValue,ParamValue]; params: {'game_id': ParamValue,'id': ParamValue} }
    'emulators.favorites.update': { paramsTuple: [ParamValue,ParamValue]; params: {'emulator_id': ParamValue,'id': ParamValue} }
    'frontends.favorites.update': { paramsTuple: [ParamValue,ParamValue]; params: {'frontend_id': ParamValue,'id': ParamValue} }
    'titles.favorites.update': { paramsTuple: [ParamValue,ParamValue]; params: {'title_id': ParamValue,'id': ParamValue} }
  }
  DELETE: {
    'companies.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'emulators.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'franchises.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'frontends.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'games.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'genres.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'images.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'languages.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'operating_systems.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'platforms.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'regions.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'titles.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'users.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'franchises.translations.destroy': { paramsTuple: [ParamValue,ParamValue]; params: {'franchise_id': ParamValue,'id': ParamValue} }
    'games.translations.destroy': { paramsTuple: [ParamValue,ParamValue]; params: {'game_id': ParamValue,'id': ParamValue} }
    'genres.translations.destroy': { paramsTuple: [ParamValue,ParamValue]; params: {'genre_id': ParamValue,'id': ParamValue} }
    'titles.translations.destroy': { paramsTuple: [ParamValue,ParamValue]; params: {'title_id': ParamValue,'id': ParamValue} }
    'games.favorites.destroy': { paramsTuple: [ParamValue,ParamValue]; params: {'game_id': ParamValue,'id': ParamValue} }
    'emulators.favorites.destroy': { paramsTuple: [ParamValue,ParamValue]; params: {'emulator_id': ParamValue,'id': ParamValue} }
    'frontends.favorites.destroy': { paramsTuple: [ParamValue,ParamValue]; params: {'frontend_id': ParamValue,'id': ParamValue} }
    'titles.favorites.destroy': { paramsTuple: [ParamValue,ParamValue]; params: {'title_id': ParamValue,'id': ParamValue} }
  }
}
declare module '@adonisjs/core/types/http' {
  export interface RoutesList extends ScannedRoutes {}
}