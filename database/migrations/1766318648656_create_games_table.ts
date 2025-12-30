import { BaseSchema } from '@adonisjs/lucid/schema';

export default class extends BaseSchema {
  protected tableName = 'games';

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id');

      table.string('platform').notNullable();
      table.string('name').notNullable();
      table.string('region', 32).nullable();
      table.date('release_date').nullable();

      table.timestamp('created_at');
      table.timestamp('updated_at');

      table.unique(['platform', 'name']);
    });
  }

  async down() {
    this.schema.dropTable(this.tableName);
  }
}
