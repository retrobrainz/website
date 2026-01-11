import { BaseSchema } from '@adonisjs/lucid/schema';

export default class extends BaseSchema {
  protected tableName = 'companies';

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id');

      table.string('name', 64).notNullable().unique();

      table
        .integer('duplicate_id')
        .unsigned()
        .nullable()
        .references('id')
        .inTable('companies')
        .onDelete('SET NULL');

      table.timestamp('created_at');
      table.timestamp('updated_at');
    });
  }

  async down() {
    this.schema.dropTable(this.tableName);
  }
}
