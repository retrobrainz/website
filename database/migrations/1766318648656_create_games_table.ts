import { BaseSchema } from '@adonisjs/lucid/schema';

export default class extends BaseSchema {
  protected tableName = 'games';

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id');

      table.string('platform').notNullable();
      table.string('title').notNullable();
      table.date('release_date').nullable();

      table.timestamp('created_at');
      table.timestamp('updated_at');

      table.unique(['platform', 'title']);
    });
  }

  async down() {
    this.schema.dropTable(this.tableName);
  }
}
