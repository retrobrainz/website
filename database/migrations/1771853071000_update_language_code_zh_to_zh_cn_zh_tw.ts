import { BaseSchema } from '@adonisjs/lucid/schema';

export default class extends BaseSchema {
  protected tableName = 'languages';

  async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.string('code', 8).notNullable().unique().alter();
    });

    this.defer(async (db) => {
      await db.from(this.tableName).where('code', 'zh').update({ code: 'zh-CN', name: 'Chinese (Simplified)' });

      const existingTw = await db.from(this.tableName).where('code', 'zh-TW').first();
      if (!existingTw) {
        await db.table(this.tableName).insert({ code: 'zh-TW', name: 'Chinese (Traditional)' });
      }
    });
  }

  async down() {
    this.defer(async (db) => {
      await db.from(this.tableName).where('code', 'zh-TW').delete();
      await db.from(this.tableName).where('code', 'zh-CN').update({ code: 'zh', name: 'Chinese' });
    });

    this.schema.alterTable(this.tableName, (table) => {
      table.string('code', 2).notNullable().unique().alter();
    });
  }
}
