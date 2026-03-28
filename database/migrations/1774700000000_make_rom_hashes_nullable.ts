import { BaseSchema } from '@adonisjs/lucid/schema';

export default class extends BaseSchema {
  protected tableName = 'roms';

  async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.string('md5', 32).nullable().alter();
      table.string('sha1', 40).nullable().alter();
    });
  }

  async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.string('md5', 32).notNullable().alter();
      table.string('sha1', 40).notNullable().alter();
    });
  }
}
