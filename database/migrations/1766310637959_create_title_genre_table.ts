import { BaseSchema } from '@adonisjs/lucid/schema';

export default class extends BaseSchema {
  protected tableName = 'title_genre';

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id');

      table
        .integer('title_id')
        .notNullable()
        .unsigned()
        .references('id')
        .inTable('titles')
        .onDelete('CASCADE');

      table
        .integer('genre_id')
        .notNullable()
        .unsigned()
        .references('id')
        .inTable('genres')
        .onDelete('CASCADE');

      table.unique(['title_id', 'genre_id']);

      table.timestamp('created_at');
      table.timestamp('updated_at');
    });
  }

  async down() {
    this.schema.dropTable(this.tableName);
  }
}
