import { BaseSchema } from '@adonisjs/lucid/schema';

export default class extends BaseSchema {
  protected tableName = 'genres';

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id');

      table.string('name').notNullable().unique();
      table.string('code').notNullable().unique();

      table
        .integer('parent_id')
        .unsigned()
        .nullable()
        .references('id')
        .inTable('genres')
        .onDelete('SET NULL');

      table
        .integer('duplicate_id')
        .unsigned()
        .nullable()
        .references('id')
        .inTable('genres')
        .onDelete('SET NULL');

      table.timestamp('created_at');
      table.timestamp('updated_at');
    });
  }

  async down() {
    this.schema.dropTable(this.tableName);
  }
}
