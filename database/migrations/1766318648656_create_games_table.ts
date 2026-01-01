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

      table.string('name').notNullable();
      table.string('region', 32).nullable();
      table.string('serial', 32).nullable();
      table.string('developer').nullable();
      table.string('publisher').nullable();
      table.date('release_date').nullable();

      table.timestamp('created_at');
      table.timestamp('updated_at');

      table.unique(['platform_id', 'name']);
    });
  }

  async down() {
    this.schema.dropTable(this.tableName);
  }
}
