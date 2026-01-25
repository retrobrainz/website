import { BaseSchema } from '@adonisjs/lucid/schema';

export default class extends BaseSchema {
  protected tableName = 'emulator_operating_system';

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id');

      table
        .integer('emulator_id')
        .notNullable()
        .unsigned()
        .references('id')
        .inTable('emulators')
        .onDelete('CASCADE');

      table
        .integer('operating_system_id')
        .notNullable()
        .unsigned()
        .references('id')
        .inTable('operating_systems')
        .onDelete('CASCADE');

      table.unique(['emulator_id', 'operating_system_id']);

      table.timestamp('created_at');
      table.timestamp('updated_at');
    });
  }

  async down() {
    this.schema.dropTable(this.tableName);
  }
}
