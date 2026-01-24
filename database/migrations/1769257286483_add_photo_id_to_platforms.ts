import { BaseSchema } from '@adonisjs/lucid/schema';

export default class extends BaseSchema {
  protected tableName = 'platforms';

  async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table
        .integer('photo_id')
        .unsigned()
        .nullable()
        .references('id')
        .inTable('images')
        .onDelete('SET NULL');
    });
  }

  async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('photo_id');
    });
  }
}
