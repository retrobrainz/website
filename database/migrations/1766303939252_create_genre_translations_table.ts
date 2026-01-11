import { BaseSchema } from '@adonisjs/lucid/schema';

export default class extends BaseSchema {
  protected tableName = 'genre_translations';

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id');

      table
        .integer('genre_id')
        .notNullable()
        .unsigned()
        .references('id')
        .inTable('genres')
        .onDelete('CASCADE');

      table.string('locale', 5).notNullable();

      table.string('name', 256).notNullable();

      table.timestamp('created_at');
      table.timestamp('updated_at');

      table.unique(['genre_id', 'locale']);
    });
  }

  async down() {
    this.schema.dropTable(this.tableName);
  }
}
