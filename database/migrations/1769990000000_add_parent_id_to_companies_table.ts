import { BaseSchema } from '@adonisjs/lucid/schema';

export default class extends BaseSchema {
  protected tableName = 'companies';

  async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table
        .integer('parent_id')
        .unsigned()
        .nullable()
        .references('id')
        .inTable('companies')
        .onDelete('SET NULL');
    });
  }

  async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropForeign('parent_id');
      table.dropColumn('parent_id');
    });
  }
}
