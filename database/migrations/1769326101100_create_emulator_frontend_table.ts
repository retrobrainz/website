import { BaseSchema } from '@adonisjs/lucid/schema';

export default class extends BaseSchema {
  protected tableName = 'frontend_emulator';

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
        .integer('frontend_id')
        .notNullable()
        .unsigned()
        .references('id')
        .inTable('frontends')
        .onDelete('CASCADE');

      table.unique(['emulator_id', 'frontend_id']);

      table.timestamp('created_at');
      table.timestamp('updated_at');
    });
  }

  async down() {
    this.schema.dropTable(this.tableName);
  }
}
