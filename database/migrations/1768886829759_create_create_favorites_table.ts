import { BaseSchema } from '@adonisjs/lucid/schema';

export default class extends BaseSchema {
  protected tableName = 'favorites';

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id');

      table
        .integer('user_id')
        .notNullable()
        .unsigned()
        .references('id')
        .inTable('users')
        .onDelete('CASCADE');

      table
        .integer('game_id')
        .notNullable()
        .unsigned()
        .references('id')
        .inTable('games')
        .onDelete('CASCADE');

      table.unique(['user_id', 'game_id']);

      table.timestamp('created_at');
      table.timestamp('updated_at');
    });
  }

  async down() {
    this.schema.dropTable(this.tableName);
  }
}
