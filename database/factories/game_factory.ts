import factory from '@adonisjs/lucid/factories'
import Game from '#models/game'

export const GameFactory = factory
  .define(Game, async ({ faker }) => {
    return {}
  })
  .build()