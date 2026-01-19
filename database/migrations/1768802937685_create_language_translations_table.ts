import { BaseSchema } from '@adonisjs/lucid/schema';

export default class extends BaseSchema {
  protected tableName = 'language_translations';

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id');

      table
        .integer('language_id')
        .notNullable()
        .unsigned()
        .references('id')
        .inTable('languages')
        .onDelete('CASCADE');

      table.string('locale', 5).notNullable();

      table.string('name', 32).notNullable();

      table.timestamp('created_at');
      table.timestamp('updated_at');

      table.unique(['language_id', 'locale']);
    });
  }

  async down() {
    this.schema.dropTable(this.tableName);
  }
}
