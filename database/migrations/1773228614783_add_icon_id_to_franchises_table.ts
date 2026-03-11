import { BaseSchema } from '@adonisjs/lucid/schema';

export default class extends BaseSchema {
  protected tableName = 'franchises';

  async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.integer('icon_id').unsigned().references('id').inTable('images').onDelete('SET NULL');
    });
  }

  async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('icon_id');
    });
  }
}
