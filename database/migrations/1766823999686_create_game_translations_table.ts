import { BaseSchema } from '@adonisjs/lucid/schema';

export default class extends BaseSchema {
  protected tableName = 'game_translations';

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id');

      table.foreign('game_id').references('games.id').onDelete('CASCADE');
      table.string('locale', 5).notNullable();

      table.string('title').notNullable();

      table.timestamp('created_at');
      table.timestamp('updated_at');
    });
  }

  async down() {
    this.schema.dropTable(this.tableName);
  }
}
