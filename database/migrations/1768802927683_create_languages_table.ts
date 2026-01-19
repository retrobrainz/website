import { BaseSchema } from '@adonisjs/lucid/schema';

export default class extends BaseSchema {
  protected tableName = 'languages';

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id');

      table.string('code', 10).notNullable().unique();
      table.string('name', 100).notNullable();

      table.timestamp('created_at');
      table.timestamp('updated_at');
    });
  }

  async down() {
    this.schema.dropTable(this.tableName);
  }
}
