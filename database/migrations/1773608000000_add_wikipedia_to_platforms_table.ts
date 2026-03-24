import { BaseSchema } from '@adonisjs/lucid/schema';

export default class extends BaseSchema {
  protected tableName = 'platforms';

  async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.string('wikipedia').nullable();
    });
  }

  async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('wikipedia');
    });
  }
}
