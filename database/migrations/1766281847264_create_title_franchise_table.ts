import { BaseSchema } from '@adonisjs/lucid/schema';

export default class extends BaseSchema {
  protected tableName = 'title_franchise';

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
        .integer('franchise_id')
        .notNullable()
        .unsigned()
        .references('id')
        .inTable('franchises')
        .onDelete('CASCADE');

      table.unique(['title_id', 'franchise_id']);

      table.timestamp('created_at');
      table.timestamp('updated_at');
    });
  }

  async down() {
    this.schema.dropTable(this.tableName);
  }
}
