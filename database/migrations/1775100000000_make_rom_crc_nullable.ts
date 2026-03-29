import { BaseSchema } from '@adonisjs/lucid/schema';

export default class extends BaseSchema {
  protected tableName = 'roms';

  async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.bigint('size').unsigned().nullable().alter();
      table.string('crc', 8).nullable().alter();
    });
  }

  async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.bigint('size').unsigned().notNullable().alter();
      table.string('crc', 8).notNullable().alter();
    });
  }
}
