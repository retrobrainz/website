import { BaseSchema } from '@adonisjs/lucid/schema';

export default class extends BaseSchema {
  protected tableName = 'companies';

  async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.date('founding_date').nullable().after('wikipedia');
      table.date('defunct_date').nullable().after('founding_date');
    });
  }

  async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('founding_date');
      table.dropColumn('defunct_date');
    });
  }
}
