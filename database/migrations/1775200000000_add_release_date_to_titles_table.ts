import { BaseSchema } from '@adonisjs/lucid/schema';

export default class extends BaseSchema {
  protected tableName = 'titles';

  async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.date('release_date').nullable().after('mobygames');
    });
  }

  async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('release_date');
    });
  }
}
