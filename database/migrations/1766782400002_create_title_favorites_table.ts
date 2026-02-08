import { BaseSchema } from '@adonisjs/lucid/schema';

export default class extends BaseSchema {
  protected tableName = 'title_favorites';

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id');

      table
        .integer('user_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('users')
        .onDelete('CASCADE');

      table
        .integer('title_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('titles')
        .onDelete('CASCADE');

      table.timestamp('created_at');
      table.timestamp('updated_at');

      table.unique(['user_id', 'title_id']);
    });
  }

  async down() {
    this.schema.dropTable(this.tableName);
  }
}
