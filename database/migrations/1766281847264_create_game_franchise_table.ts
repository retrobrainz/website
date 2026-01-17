import { BaseSchema } from '@adonisjs/lucid/schema';

export default class extends BaseSchema {
  protected tableName = 'game_franchise';

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id');

      table
        .integer('game_id')
        .notNullable()
        .unsigned()
        .references('id')
        .inTable('games')
        .onDelete('CASCADE');

      table
        .integer('franchise_id')
        .notNullable()
        .unsigned()
        .references('id')
        .inTable('franchises')
        .onDelete('CASCADE');

      table.unique(['game_id', 'franchise_id']);

      table.timestamp('created_at');
      table.timestamp('updated_at');
    });
  }

  async down() {
    this.schema.dropTable(this.tableName);
  }
}
