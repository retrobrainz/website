import { BaseSchema } from '@adonisjs/lucid/schema';

export default class extends BaseSchema {
  protected tableName = 'platform_emulator';

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id');

      table
        .integer('platform_id')
        .notNullable()
        .unsigned()
        .references('id')
        .inTable('platforms')
        .onDelete('CASCADE');

      table
        .integer('emulator_id')
        .notNullable()
        .unsigned()
        .references('id')
        .inTable('emulators')
        .onDelete('CASCADE');

      table.unique(['platform_id', 'emulator_id']);

      table.timestamp('created_at');
      table.timestamp('updated_at');
    });
  }

  async down() {
    this.schema.dropTable(this.tableName);
  }
}
