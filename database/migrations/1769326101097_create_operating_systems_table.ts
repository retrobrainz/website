import { BaseSchema } from '@adonisjs/lucid/schema';

export default class extends BaseSchema {
  protected tableName = 'operating_systems';

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id');

      table.string('name', 64).notNullable();

      table.string('arch', 32).notNullable();

      table.unique(['name', 'arch']);

      table.timestamp('created_at');
      table.timestamp('updated_at');
    });
  }

  async down() {
    this.schema.dropTable(this.tableName);
  }
}
