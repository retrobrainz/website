import '@adonisjs/core/types/http'

type ParamValue = string | number | bigint | boolean

export type ScannedRoutes = {
  ALL: {
    'drive.fs.serve': { paramsTuple: [...ParamValue[]]; params: {'*': ParamValue[]} }
    'api.companies.index': { paramsTuple?: []; params?: {} }
    'api.companies.store': { paramsTuple?: []; params?: {} }
    'api.companies.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'api.companies.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'api.companies.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'api.companies.names.index': { paramsTuple: [ParamValue]; params: {'company_id': ParamValue} }
    'api.companies.names.store': { paramsTuple: [ParamValue]; params: {'company_id': ParamValue} }
    'api.companies.names.show': { paramsTuple: [ParamValue,ParamValue]; params: {'company_id': ParamValue,'id': ParamValue} }
    'api.companies.names.update': { paramsTuple: [ParamValue,ParamValue]; params: {'company_id': ParamValue,'id': ParamValue} }
    'api.companies.names.destroy': { paramsTuple: [ParamValue,ParamValue]; params: {'company_id': ParamValue,'id': ParamValue} }
    'api.companies.merge': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'api.emulators.index': { paramsTuple?: []; params?: {} }
    'api.emulators.store': { paramsTuple?: []; params?: {} }
    'api.emulators.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'api.emulators.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'api.emulators.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'api.franchises.index': { paramsTuple?: []; params?: {} }
    'api.franchises.store': { paramsTuple?: []; params?: {} }
    'api.franchises.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'api.franchises.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'api.franchises.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'api.franchises.merge': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'api.frontends.index': { paramsTuple?: []; params?: {} }
    'api.frontends.store': { paramsTuple?: []; params?: {} }
    'api.frontends.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'api.frontends.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'api.frontends.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'api.games.index': { paramsTuple?: []; params?: {} }
    'api.games.store': { paramsTuple?: []; params?: {} }
    'api.games.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'api.games.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'api.games.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'api.games.merge': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'api.genres.index': { paramsTuple?: []; params?: {} }
    'api.genres.store': { paramsTuple?: []; params?: {} }
    'api.genres.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'api.genres.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'api.genres.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'api.genres.merge': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'api.images.index': { paramsTuple?: []; params?: {} }
    'api.images.store': { paramsTuple?: []; params?: {} }
    'api.images.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'api.images.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'api.images.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'api.languages.index': { paramsTuple?: []; params?: {} }
    'api.languages.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'api.operating_systems.index': { paramsTuple?: []; params?: {} }
    'api.operating_systems.store': { paramsTuple?: []; params?: {} }
    'api.operating_systems.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'api.operating_systems.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'api.operating_systems.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'api.platforms.index': { paramsTuple?: []; params?: {} }
    'api.platforms.store': { paramsTuple?: []; params?: {} }
    'api.platforms.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'api.platforms.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'api.platforms.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'api.regions.index': { paramsTuple?: []; params?: {} }
    'api.regions.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'api.titles.index': { paramsTuple?: []; params?: {} }
    'api.titles.store': { paramsTuple?: []; params?: {} }
    'api.titles.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'api.titles.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'api.titles.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'api.titles.merge': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'api.users.index': { paramsTuple?: []; params?: {} }
    'api.users.store': { paramsTuple?: []; params?: {} }
    'api.users.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'api.users.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'api.users.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'api.franchises.translations.index': { paramsTuple: [ParamValue]; params: {'franchise_id': ParamValue} }
    'api.franchises.translations.store': { paramsTuple: [ParamValue]; params: {'franchise_id': ParamValue} }
    'api.franchises.translations.show': { paramsTuple: [ParamValue,ParamValue]; params: {'franchise_id': ParamValue,'id': ParamValue} }
    'api.franchises.translations.update': { paramsTuple: [ParamValue,ParamValue]; params: {'franchise_id': ParamValue,'id': ParamValue} }
    'api.franchises.translations.destroy': { paramsTuple: [ParamValue,ParamValue]; params: {'franchise_id': ParamValue,'id': ParamValue} }
    'api.games.translations.index': { paramsTuple: [ParamValue]; params: {'game_id': ParamValue} }
    'api.games.translations.store': { paramsTuple: [ParamValue]; params: {'game_id': ParamValue} }
    'api.games.translations.show': { paramsTuple: [ParamValue,ParamValue]; params: {'game_id': ParamValue,'id': ParamValue} }
    'api.games.translations.update': { paramsTuple: [ParamValue,ParamValue]; params: {'game_id': ParamValue,'id': ParamValue} }
    'api.games.translations.destroy': { paramsTuple: [ParamValue,ParamValue]; params: {'game_id': ParamValue,'id': ParamValue} }
    'api.genres.translations.index': { paramsTuple: [ParamValue]; params: {'genre_id': ParamValue} }
    'api.genres.translations.store': { paramsTuple: [ParamValue]; params: {'genre_id': ParamValue} }
    'api.genres.translations.show': { paramsTuple: [ParamValue,ParamValue]; params: {'genre_id': ParamValue,'id': ParamValue} }
    'api.genres.translations.update': { paramsTuple: [ParamValue,ParamValue]; params: {'genre_id': ParamValue,'id': ParamValue} }
    'api.genres.translations.destroy': { paramsTuple: [ParamValue,ParamValue]; params: {'genre_id': ParamValue,'id': ParamValue} }
    'api.languages.translations.index': { paramsTuple: [ParamValue]; params: {'language_id': ParamValue} }
    'api.languages.translations.store': { paramsTuple: [ParamValue]; params: {'language_id': ParamValue} }
    'api.languages.translations.show': { paramsTuple: [ParamValue,ParamValue]; params: {'language_id': ParamValue,'id': ParamValue} }
    'api.languages.translations.update': { paramsTuple: [ParamValue,ParamValue]; params: {'language_id': ParamValue,'id': ParamValue} }
    'api.languages.translations.destroy': { paramsTuple: [ParamValue,ParamValue]; params: {'language_id': ParamValue,'id': ParamValue} }
    'api.regions.translations.index': { paramsTuple: [ParamValue]; params: {'region_id': ParamValue} }
    'api.regions.translations.store': { paramsTuple: [ParamValue]; params: {'region_id': ParamValue} }
    'api.regions.translations.show': { paramsTuple: [ParamValue,ParamValue]; params: {'region_id': ParamValue,'id': ParamValue} }
    'api.regions.translations.update': { paramsTuple: [ParamValue,ParamValue]; params: {'region_id': ParamValue,'id': ParamValue} }
    'api.regions.translations.destroy': { paramsTuple: [ParamValue,ParamValue]; params: {'region_id': ParamValue,'id': ParamValue} }
    'api.titles.translations.index': { paramsTuple: [ParamValue]; params: {'title_id': ParamValue} }
    'api.titles.translations.store': { paramsTuple: [ParamValue]; params: {'title_id': ParamValue} }
    'api.titles.translations.show': { paramsTuple: [ParamValue,ParamValue]; params: {'title_id': ParamValue,'id': ParamValue} }
    'api.titles.translations.update': { paramsTuple: [ParamValue,ParamValue]; params: {'title_id': ParamValue,'id': ParamValue} }
    'api.titles.translations.destroy': { paramsTuple: [ParamValue,ParamValue]; params: {'title_id': ParamValue,'id': ParamValue} }
    'api.games.favorites.index': { paramsTuple: [ParamValue]; params: {'game_id': ParamValue} }
    'api.games.favorites.store': { paramsTuple: [ParamValue]; params: {'game_id': ParamValue} }
    'api.games.favorites.show': { paramsTuple: [ParamValue,ParamValue]; params: {'game_id': ParamValue,'id': ParamValue} }
    'api.games.favorites.update': { paramsTuple: [ParamValue,ParamValue]; params: {'game_id': ParamValue,'id': ParamValue} }
    'api.games.favorites.destroy': { paramsTuple: [ParamValue,ParamValue]; params: {'game_id': ParamValue,'id': ParamValue} }
    'api.emulators.favorites.index': { paramsTuple: [ParamValue]; params: {'emulator_id': ParamValue} }
    'api.emulators.favorites.store': { paramsTuple: [ParamValue]; params: {'emulator_id': ParamValue} }
    'api.emulators.favorites.show': { paramsTuple: [ParamValue,ParamValue]; params: {'emulator_id': ParamValue,'id': ParamValue} }
    'api.emulators.favorites.update': { paramsTuple: [ParamValue,ParamValue]; params: {'emulator_id': ParamValue,'id': ParamValue} }
    'api.emulators.favorites.destroy': { paramsTuple: [ParamValue,ParamValue]; params: {'emulator_id': ParamValue,'id': ParamValue} }
    'api.frontends.favorites.index': { paramsTuple: [ParamValue]; params: {'frontend_id': ParamValue} }
    'api.frontends.favorites.store': { paramsTuple: [ParamValue]; params: {'frontend_id': ParamValue} }
    'api.frontends.favorites.show': { paramsTuple: [ParamValue,ParamValue]; params: {'frontend_id': ParamValue,'id': ParamValue} }
    'api.frontends.favorites.update': { paramsTuple: [ParamValue,ParamValue]; params: {'frontend_id': ParamValue,'id': ParamValue} }
    'api.frontends.favorites.destroy': { paramsTuple: [ParamValue,ParamValue]; params: {'frontend_id': ParamValue,'id': ParamValue} }
    'api.titles.favorites.index': { paramsTuple: [ParamValue]; params: {'title_id': ParamValue} }
    'api.titles.favorites.store': { paramsTuple: [ParamValue]; params: {'title_id': ParamValue} }
    'api.titles.favorites.show': { paramsTuple: [ParamValue,ParamValue]; params: {'title_id': ParamValue,'id': ParamValue} }
    'api.titles.favorites.update': { paramsTuple: [ParamValue,ParamValue]; params: {'title_id': ParamValue,'id': ParamValue} }
    'api.titles.favorites.destroy': { paramsTuple: [ParamValue,ParamValue]; params: {'title_id': ParamValue,'id': ParamValue} }
    'api.auth.register': { paramsTuple?: []; params?: {} }
    'api.auth.login': { paramsTuple?: []; params?: {} }
    'api.auth.logout': { paramsTuple?: []; params?: {} }
    'api.profile.show': { paramsTuple?: []; params?: {} }
    'api.profile.update': { paramsTuple?: []; params?: {} }
    'api.admin.languages.index': { paramsTuple?: []; params?: {} }
    'api.admin.languages.store': { paramsTuple?: []; params?: {} }
    'api.admin.languages.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'api.admin.languages.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'api.admin.languages.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'api.admin.languages.translations.index': { paramsTuple: [ParamValue]; params: {'language_id': ParamValue} }
    'api.admin.languages.translations.store': { paramsTuple: [ParamValue]; params: {'language_id': ParamValue} }
    'api.admin.languages.translations.show': { paramsTuple: [ParamValue,ParamValue]; params: {'language_id': ParamValue,'id': ParamValue} }
    'api.admin.languages.translations.update': { paramsTuple: [ParamValue,ParamValue]; params: {'language_id': ParamValue,'id': ParamValue} }
    'api.admin.languages.translations.destroy': { paramsTuple: [ParamValue,ParamValue]; params: {'language_id': ParamValue,'id': ParamValue} }
    'api.admin.regions.index': { paramsTuple?: []; params?: {} }
    'api.admin.regions.store': { paramsTuple?: []; params?: {} }
    'api.admin.regions.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'api.admin.regions.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'api.admin.regions.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'api.admin.regions.translations.index': { paramsTuple: [ParamValue]; params: {'region_id': ParamValue} }
    'api.admin.regions.translations.store': { paramsTuple: [ParamValue]; params: {'region_id': ParamValue} }
    'api.admin.regions.translations.show': { paramsTuple: [ParamValue,ParamValue]; params: {'region_id': ParamValue,'id': ParamValue} }
    'api.admin.regions.translations.update': { paramsTuple: [ParamValue,ParamValue]; params: {'region_id': ParamValue,'id': ParamValue} }
    'api.admin.regions.translations.destroy': { paramsTuple: [ParamValue,ParamValue]; params: {'region_id': ParamValue,'id': ParamValue} }
  }
  GET: {
    'drive.fs.serve': { paramsTuple: [...ParamValue[]]; params: {'*': ParamValue[]} }
    'api.companies.index': { paramsTuple?: []; params?: {} }
    'api.companies.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'api.companies.names.index': { paramsTuple: [ParamValue]; params: {'company_id': ParamValue} }
    'api.companies.names.show': { paramsTuple: [ParamValue,ParamValue]; params: {'company_id': ParamValue,'id': ParamValue} }
    'api.emulators.index': { paramsTuple?: []; params?: {} }
    'api.emulators.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'api.franchises.index': { paramsTuple?: []; params?: {} }
    'api.franchises.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'api.frontends.index': { paramsTuple?: []; params?: {} }
    'api.frontends.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'api.games.index': { paramsTuple?: []; params?: {} }
    'api.games.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'api.genres.index': { paramsTuple?: []; params?: {} }
    'api.genres.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'api.images.index': { paramsTuple?: []; params?: {} }
    'api.images.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'api.languages.index': { paramsTuple?: []; params?: {} }
    'api.languages.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'api.operating_systems.index': { paramsTuple?: []; params?: {} }
    'api.operating_systems.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'api.platforms.index': { paramsTuple?: []; params?: {} }
    'api.platforms.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'api.regions.index': { paramsTuple?: []; params?: {} }
    'api.regions.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'api.titles.index': { paramsTuple?: []; params?: {} }
    'api.titles.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'api.users.index': { paramsTuple?: []; params?: {} }
    'api.users.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'api.franchises.translations.index': { paramsTuple: [ParamValue]; params: {'franchise_id': ParamValue} }
    'api.franchises.translations.show': { paramsTuple: [ParamValue,ParamValue]; params: {'franchise_id': ParamValue,'id': ParamValue} }
    'api.games.translations.index': { paramsTuple: [ParamValue]; params: {'game_id': ParamValue} }
    'api.games.translations.show': { paramsTuple: [ParamValue,ParamValue]; params: {'game_id': ParamValue,'id': ParamValue} }
    'api.genres.translations.index': { paramsTuple: [ParamValue]; params: {'genre_id': ParamValue} }
    'api.genres.translations.show': { paramsTuple: [ParamValue,ParamValue]; params: {'genre_id': ParamValue,'id': ParamValue} }
    'api.languages.translations.index': { paramsTuple: [ParamValue]; params: {'language_id': ParamValue} }
    'api.languages.translations.show': { paramsTuple: [ParamValue,ParamValue]; params: {'language_id': ParamValue,'id': ParamValue} }
    'api.regions.translations.index': { paramsTuple: [ParamValue]; params: {'region_id': ParamValue} }
    'api.regions.translations.show': { paramsTuple: [ParamValue,ParamValue]; params: {'region_id': ParamValue,'id': ParamValue} }
    'api.titles.translations.index': { paramsTuple: [ParamValue]; params: {'title_id': ParamValue} }
    'api.titles.translations.show': { paramsTuple: [ParamValue,ParamValue]; params: {'title_id': ParamValue,'id': ParamValue} }
    'api.games.favorites.index': { paramsTuple: [ParamValue]; params: {'game_id': ParamValue} }
    'api.games.favorites.show': { paramsTuple: [ParamValue,ParamValue]; params: {'game_id': ParamValue,'id': ParamValue} }
    'api.emulators.favorites.index': { paramsTuple: [ParamValue]; params: {'emulator_id': ParamValue} }
    'api.emulators.favorites.show': { paramsTuple: [ParamValue,ParamValue]; params: {'emulator_id': ParamValue,'id': ParamValue} }
    'api.frontends.favorites.index': { paramsTuple: [ParamValue]; params: {'frontend_id': ParamValue} }
    'api.frontends.favorites.show': { paramsTuple: [ParamValue,ParamValue]; params: {'frontend_id': ParamValue,'id': ParamValue} }
    'api.titles.favorites.index': { paramsTuple: [ParamValue]; params: {'title_id': ParamValue} }
    'api.titles.favorites.show': { paramsTuple: [ParamValue,ParamValue]; params: {'title_id': ParamValue,'id': ParamValue} }
    'api.profile.show': { paramsTuple?: []; params?: {} }
    'api.admin.languages.index': { paramsTuple?: []; params?: {} }
    'api.admin.languages.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'api.admin.languages.translations.index': { paramsTuple: [ParamValue]; params: {'language_id': ParamValue} }
    'api.admin.languages.translations.show': { paramsTuple: [ParamValue,ParamValue]; params: {'language_id': ParamValue,'id': ParamValue} }
    'api.admin.regions.index': { paramsTuple?: []; params?: {} }
    'api.admin.regions.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'api.admin.regions.translations.index': { paramsTuple: [ParamValue]; params: {'region_id': ParamValue} }
    'api.admin.regions.translations.show': { paramsTuple: [ParamValue,ParamValue]; params: {'region_id': ParamValue,'id': ParamValue} }
  }
  HEAD: {
    'drive.fs.serve': { paramsTuple: [...ParamValue[]]; params: {'*': ParamValue[]} }
    'api.companies.index': { paramsTuple?: []; params?: {} }
    'api.companies.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'api.companies.names.index': { paramsTuple: [ParamValue]; params: {'company_id': ParamValue} }
    'api.companies.names.show': { paramsTuple: [ParamValue,ParamValue]; params: {'company_id': ParamValue,'id': ParamValue} }
    'api.emulators.index': { paramsTuple?: []; params?: {} }
    'api.emulators.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'api.franchises.index': { paramsTuple?: []; params?: {} }
    'api.franchises.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'api.frontends.index': { paramsTuple?: []; params?: {} }
    'api.frontends.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'api.games.index': { paramsTuple?: []; params?: {} }
    'api.games.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'api.genres.index': { paramsTuple?: []; params?: {} }
    'api.genres.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'api.images.index': { paramsTuple?: []; params?: {} }
    'api.images.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'api.languages.index': { paramsTuple?: []; params?: {} }
    'api.languages.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'api.operating_systems.index': { paramsTuple?: []; params?: {} }
    'api.operating_systems.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'api.platforms.index': { paramsTuple?: []; params?: {} }
    'api.platforms.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'api.regions.index': { paramsTuple?: []; params?: {} }
    'api.regions.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'api.titles.index': { paramsTuple?: []; params?: {} }
    'api.titles.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'api.users.index': { paramsTuple?: []; params?: {} }
    'api.users.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'api.franchises.translations.index': { paramsTuple: [ParamValue]; params: {'franchise_id': ParamValue} }
    'api.franchises.translations.show': { paramsTuple: [ParamValue,ParamValue]; params: {'franchise_id': ParamValue,'id': ParamValue} }
    'api.games.translations.index': { paramsTuple: [ParamValue]; params: {'game_id': ParamValue} }
    'api.games.translations.show': { paramsTuple: [ParamValue,ParamValue]; params: {'game_id': ParamValue,'id': ParamValue} }
    'api.genres.translations.index': { paramsTuple: [ParamValue]; params: {'genre_id': ParamValue} }
    'api.genres.translations.show': { paramsTuple: [ParamValue,ParamValue]; params: {'genre_id': ParamValue,'id': ParamValue} }
    'api.languages.translations.index': { paramsTuple: [ParamValue]; params: {'language_id': ParamValue} }
    'api.languages.translations.show': { paramsTuple: [ParamValue,ParamValue]; params: {'language_id': ParamValue,'id': ParamValue} }
    'api.regions.translations.index': { paramsTuple: [ParamValue]; params: {'region_id': ParamValue} }
    'api.regions.translations.show': { paramsTuple: [ParamValue,ParamValue]; params: {'region_id': ParamValue,'id': ParamValue} }
    'api.titles.translations.index': { paramsTuple: [ParamValue]; params: {'title_id': ParamValue} }
    'api.titles.translations.show': { paramsTuple: [ParamValue,ParamValue]; params: {'title_id': ParamValue,'id': ParamValue} }
    'api.games.favorites.index': { paramsTuple: [ParamValue]; params: {'game_id': ParamValue} }
    'api.games.favorites.show': { paramsTuple: [ParamValue,ParamValue]; params: {'game_id': ParamValue,'id': ParamValue} }
    'api.emulators.favorites.index': { paramsTuple: [ParamValue]; params: {'emulator_id': ParamValue} }
    'api.emulators.favorites.show': { paramsTuple: [ParamValue,ParamValue]; params: {'emulator_id': ParamValue,'id': ParamValue} }
    'api.frontends.favorites.index': { paramsTuple: [ParamValue]; params: {'frontend_id': ParamValue} }
    'api.frontends.favorites.show': { paramsTuple: [ParamValue,ParamValue]; params: {'frontend_id': ParamValue,'id': ParamValue} }
    'api.titles.favorites.index': { paramsTuple: [ParamValue]; params: {'title_id': ParamValue} }
    'api.titles.favorites.show': { paramsTuple: [ParamValue,ParamValue]; params: {'title_id': ParamValue,'id': ParamValue} }
    'api.profile.show': { paramsTuple?: []; params?: {} }
    'api.admin.languages.index': { paramsTuple?: []; params?: {} }
    'api.admin.languages.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'api.admin.languages.translations.index': { paramsTuple: [ParamValue]; params: {'language_id': ParamValue} }
    'api.admin.languages.translations.show': { paramsTuple: [ParamValue,ParamValue]; params: {'language_id': ParamValue,'id': ParamValue} }
    'api.admin.regions.index': { paramsTuple?: []; params?: {} }
    'api.admin.regions.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'api.admin.regions.translations.index': { paramsTuple: [ParamValue]; params: {'region_id': ParamValue} }
    'api.admin.regions.translations.show': { paramsTuple: [ParamValue,ParamValue]; params: {'region_id': ParamValue,'id': ParamValue} }
  }
  POST: {
    'api.companies.store': { paramsTuple?: []; params?: {} }
    'api.companies.names.store': { paramsTuple: [ParamValue]; params: {'company_id': ParamValue} }
    'api.companies.merge': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'api.emulators.store': { paramsTuple?: []; params?: {} }
    'api.franchises.store': { paramsTuple?: []; params?: {} }
    'api.franchises.merge': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'api.frontends.store': { paramsTuple?: []; params?: {} }
    'api.games.store': { paramsTuple?: []; params?: {} }
    'api.games.merge': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'api.genres.store': { paramsTuple?: []; params?: {} }
    'api.genres.merge': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'api.images.store': { paramsTuple?: []; params?: {} }
    'api.operating_systems.store': { paramsTuple?: []; params?: {} }
    'api.platforms.store': { paramsTuple?: []; params?: {} }
    'api.titles.store': { paramsTuple?: []; params?: {} }
    'api.titles.merge': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'api.users.store': { paramsTuple?: []; params?: {} }
    'api.franchises.translations.store': { paramsTuple: [ParamValue]; params: {'franchise_id': ParamValue} }
    'api.games.translations.store': { paramsTuple: [ParamValue]; params: {'game_id': ParamValue} }
    'api.genres.translations.store': { paramsTuple: [ParamValue]; params: {'genre_id': ParamValue} }
    'api.languages.translations.store': { paramsTuple: [ParamValue]; params: {'language_id': ParamValue} }
    'api.regions.translations.store': { paramsTuple: [ParamValue]; params: {'region_id': ParamValue} }
    'api.titles.translations.store': { paramsTuple: [ParamValue]; params: {'title_id': ParamValue} }
    'api.games.favorites.store': { paramsTuple: [ParamValue]; params: {'game_id': ParamValue} }
    'api.emulators.favorites.store': { paramsTuple: [ParamValue]; params: {'emulator_id': ParamValue} }
    'api.frontends.favorites.store': { paramsTuple: [ParamValue]; params: {'frontend_id': ParamValue} }
    'api.titles.favorites.store': { paramsTuple: [ParamValue]; params: {'title_id': ParamValue} }
    'api.auth.register': { paramsTuple?: []; params?: {} }
    'api.auth.login': { paramsTuple?: []; params?: {} }
    'api.auth.logout': { paramsTuple?: []; params?: {} }
    'api.admin.languages.store': { paramsTuple?: []; params?: {} }
    'api.admin.languages.translations.store': { paramsTuple: [ParamValue]; params: {'language_id': ParamValue} }
    'api.admin.regions.store': { paramsTuple?: []; params?: {} }
    'api.admin.regions.translations.store': { paramsTuple: [ParamValue]; params: {'region_id': ParamValue} }
  }
  PUT: {
    'api.companies.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'api.companies.names.update': { paramsTuple: [ParamValue,ParamValue]; params: {'company_id': ParamValue,'id': ParamValue} }
    'api.emulators.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'api.franchises.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'api.frontends.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'api.games.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'api.genres.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'api.images.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'api.operating_systems.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'api.platforms.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'api.titles.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'api.users.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'api.franchises.translations.update': { paramsTuple: [ParamValue,ParamValue]; params: {'franchise_id': ParamValue,'id': ParamValue} }
    'api.games.translations.update': { paramsTuple: [ParamValue,ParamValue]; params: {'game_id': ParamValue,'id': ParamValue} }
    'api.genres.translations.update': { paramsTuple: [ParamValue,ParamValue]; params: {'genre_id': ParamValue,'id': ParamValue} }
    'api.languages.translations.update': { paramsTuple: [ParamValue,ParamValue]; params: {'language_id': ParamValue,'id': ParamValue} }
    'api.regions.translations.update': { paramsTuple: [ParamValue,ParamValue]; params: {'region_id': ParamValue,'id': ParamValue} }
    'api.titles.translations.update': { paramsTuple: [ParamValue,ParamValue]; params: {'title_id': ParamValue,'id': ParamValue} }
    'api.games.favorites.update': { paramsTuple: [ParamValue,ParamValue]; params: {'game_id': ParamValue,'id': ParamValue} }
    'api.emulators.favorites.update': { paramsTuple: [ParamValue,ParamValue]; params: {'emulator_id': ParamValue,'id': ParamValue} }
    'api.frontends.favorites.update': { paramsTuple: [ParamValue,ParamValue]; params: {'frontend_id': ParamValue,'id': ParamValue} }
    'api.titles.favorites.update': { paramsTuple: [ParamValue,ParamValue]; params: {'title_id': ParamValue,'id': ParamValue} }
    'api.profile.update': { paramsTuple?: []; params?: {} }
    'api.admin.languages.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'api.admin.languages.translations.update': { paramsTuple: [ParamValue,ParamValue]; params: {'language_id': ParamValue,'id': ParamValue} }
    'api.admin.regions.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'api.admin.regions.translations.update': { paramsTuple: [ParamValue,ParamValue]; params: {'region_id': ParamValue,'id': ParamValue} }
  }
  PATCH: {
    'api.companies.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'api.companies.names.update': { paramsTuple: [ParamValue,ParamValue]; params: {'company_id': ParamValue,'id': ParamValue} }
    'api.emulators.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'api.franchises.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'api.frontends.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'api.games.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'api.genres.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'api.images.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'api.operating_systems.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'api.platforms.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'api.titles.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'api.users.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'api.franchises.translations.update': { paramsTuple: [ParamValue,ParamValue]; params: {'franchise_id': ParamValue,'id': ParamValue} }
    'api.games.translations.update': { paramsTuple: [ParamValue,ParamValue]; params: {'game_id': ParamValue,'id': ParamValue} }
    'api.genres.translations.update': { paramsTuple: [ParamValue,ParamValue]; params: {'genre_id': ParamValue,'id': ParamValue} }
    'api.languages.translations.update': { paramsTuple: [ParamValue,ParamValue]; params: {'language_id': ParamValue,'id': ParamValue} }
    'api.regions.translations.update': { paramsTuple: [ParamValue,ParamValue]; params: {'region_id': ParamValue,'id': ParamValue} }
    'api.titles.translations.update': { paramsTuple: [ParamValue,ParamValue]; params: {'title_id': ParamValue,'id': ParamValue} }
    'api.games.favorites.update': { paramsTuple: [ParamValue,ParamValue]; params: {'game_id': ParamValue,'id': ParamValue} }
    'api.emulators.favorites.update': { paramsTuple: [ParamValue,ParamValue]; params: {'emulator_id': ParamValue,'id': ParamValue} }
    'api.frontends.favorites.update': { paramsTuple: [ParamValue,ParamValue]; params: {'frontend_id': ParamValue,'id': ParamValue} }
    'api.titles.favorites.update': { paramsTuple: [ParamValue,ParamValue]; params: {'title_id': ParamValue,'id': ParamValue} }
    'api.admin.languages.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'api.admin.languages.translations.update': { paramsTuple: [ParamValue,ParamValue]; params: {'language_id': ParamValue,'id': ParamValue} }
    'api.admin.regions.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'api.admin.regions.translations.update': { paramsTuple: [ParamValue,ParamValue]; params: {'region_id': ParamValue,'id': ParamValue} }
  }
  DELETE: {
    'api.companies.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'api.companies.names.destroy': { paramsTuple: [ParamValue,ParamValue]; params: {'company_id': ParamValue,'id': ParamValue} }
    'api.emulators.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'api.franchises.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'api.frontends.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'api.games.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'api.genres.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'api.images.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'api.operating_systems.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'api.platforms.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'api.titles.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'api.users.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'api.franchises.translations.destroy': { paramsTuple: [ParamValue,ParamValue]; params: {'franchise_id': ParamValue,'id': ParamValue} }
    'api.games.translations.destroy': { paramsTuple: [ParamValue,ParamValue]; params: {'game_id': ParamValue,'id': ParamValue} }
    'api.genres.translations.destroy': { paramsTuple: [ParamValue,ParamValue]; params: {'genre_id': ParamValue,'id': ParamValue} }
    'api.languages.translations.destroy': { paramsTuple: [ParamValue,ParamValue]; params: {'language_id': ParamValue,'id': ParamValue} }
    'api.regions.translations.destroy': { paramsTuple: [ParamValue,ParamValue]; params: {'region_id': ParamValue,'id': ParamValue} }
    'api.titles.translations.destroy': { paramsTuple: [ParamValue,ParamValue]; params: {'title_id': ParamValue,'id': ParamValue} }
    'api.games.favorites.destroy': { paramsTuple: [ParamValue,ParamValue]; params: {'game_id': ParamValue,'id': ParamValue} }
    'api.emulators.favorites.destroy': { paramsTuple: [ParamValue,ParamValue]; params: {'emulator_id': ParamValue,'id': ParamValue} }
    'api.frontends.favorites.destroy': { paramsTuple: [ParamValue,ParamValue]; params: {'frontend_id': ParamValue,'id': ParamValue} }
    'api.titles.favorites.destroy': { paramsTuple: [ParamValue,ParamValue]; params: {'title_id': ParamValue,'id': ParamValue} }
    'api.admin.languages.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'api.admin.languages.translations.destroy': { paramsTuple: [ParamValue,ParamValue]; params: {'language_id': ParamValue,'id': ParamValue} }
    'api.admin.regions.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'api.admin.regions.translations.destroy': { paramsTuple: [ParamValue,ParamValue]; params: {'region_id': ParamValue,'id': ParamValue} }
  }
}
declare module '@adonisjs/core/types/http' {
  export interface RoutesList extends ScannedRoutes {}
}