import { BaseSchema } from '@adonisjs/lucid/schema';

export default class extends BaseSchema {
  protected tableName = 'roms';

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id');

      table
        .integer('game_id')
        .notNullable()
        .unsigned()
        .references('id')
        .inTable('games')
        .onDelete('CASCADE');

      table.string('name', 256).notNullable();
      table.bigInteger('size').nullable();
      table.string('crc', 8).nullable();
      table.string('md5', 32).nullable();
      table.string('sha1', 40).nullable();
      table.string('serial', 32).nullable();
      table.tinyint('disc').unsigned().nullable();

      table.timestamp('created_at');
      table.timestamp('updated_at');
    });
  }

  async down() {
    this.schema.dropTable(this.tableName);
  }
}
