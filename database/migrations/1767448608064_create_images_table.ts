import { BaseSchema } from '@adonisjs/lucid/schema';

export default class extends BaseSchema {
  protected tableName = 'images';

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id');

      table.string('format', 4).notNullable();
      table.smallint('width').unsigned().notNullable();
      table.smallint('height').unsigned().notNullable();
      table.integer('size').unsigned().notNullable();
      table.string('md5', 32).notNullable().unique();
      table.string('type', 16).nullable();

      table.timestamp('created_at');
      table.timestamp('updated_at');
    });
  }

  async down() {
    this.schema.dropTable(this.tableName);
  }
}
