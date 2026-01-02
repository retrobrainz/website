import { BaseSchema } from '@adonisjs/lucid/schema';

export default class extends BaseSchema {
  protected tableName = 'games';

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id');

      table
        .integer('platform_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('platforms')
        .onDelete('SET NULL');

      table
        .integer('title_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('titles')
        .onDelete('SET NULL');

      table.string('name', 256).notNullable();
      table.string('languages', 32).nullable();
      table.date('release_date').nullable();

      table.timestamp('created_at');
      table.timestamp('updated_at');

      table.unique(['platform_id', 'title_id', 'name']);
    });
  }

  async down() {
    this.schema.dropTable(this.tableName);
  }
}
