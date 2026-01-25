import { BaseSchema } from '@adonisjs/lucid/schema';

export default class extends BaseSchema {
  protected tableName = 'frontend_operating_system';

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id');

      table
        .integer('frontend_id')
        .notNullable()
        .unsigned()
        .references('id')
        .inTable('frontends')
        .onDelete('CASCADE');

      table
        .integer('operating_system_id')
        .notNullable()
        .unsigned()
        .references('id')
        .inTable('operating_systems')
        .onDelete('CASCADE');

      table.unique(['frontend_id', 'operating_system_id']);

      table.timestamp('created_at');
      table.timestamp('updated_at');
    });
  }

  async down() {
    this.schema.dropTable(this.tableName);
  }
}
