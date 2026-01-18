import { BaseSchema } from '@adonisjs/lucid/schema';

export default class extends BaseSchema {
  protected tableName = 'games';

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id');

      table
        .integer('platform_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('platforms')
        .onDelete('CASCADE');

      table.string('name', 256).notNullable();
      table.date('release_date').nullable();

      table.string('esrb_rating', 4).nullable();
      table.string('pegi_rating', 2).nullable();

      table
        .integer('duplicate_id')
        .unsigned()
        .nullable()
        .references('id')
        .inTable('games')
        .onDelete('SET NULL');

      table
        .integer('boxart_id')
        .unsigned()
        .nullable()
        .references('id')
        .inTable('images')
        .onDelete('SET NULL');

      table
        .integer('logo_id')
        .unsigned()
        .nullable()
        .references('id')
        .inTable('images')
        .onDelete('SET NULL');

      table
        .integer('snap_id')
        .unsigned()
        .nullable()
        .references('id')
        .inTable('images')
        .onDelete('SET NULL');

      table
        .integer('title_id')
        .unsigned()
        .nullable()
        .references('id')
        .inTable('images')
        .onDelete('SET NULL');

      table.timestamp('created_at');
      table.timestamp('updated_at');

      table.unique(['platform_id', 'name']);
    });
  }

  async down() {
    this.schema.dropTable(this.tableName);
  }
}
