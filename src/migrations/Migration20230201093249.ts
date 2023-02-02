import { Migration } from '@mikro-orm/migrations';

export class Migration20230201093249 extends Migration {

  async up(): Promise<void> {
    this.addSql('drop table if exists "pantry_item_categories" cascade;');
  }

  async down(): Promise<void> {
    this.addSql('create table "pantry_item_categories" ("pantry_item_uuid" uuid not null, "product_category_uuid" uuid not null, constraint "pantry_item_categories_pkey" primary key ("pantry_item_uuid", "product_category_uuid"));');

    this.addSql('alter table "pantry_item_categories" add constraint "pantry_item_categories_pantry_item_uuid_foreign" foreign key ("pantry_item_uuid") references "pantry_item" ("uuid") on update cascade on delete cascade;');
    this.addSql('alter table "pantry_item_categories" add constraint "pantry_item_categories_product_category_uuid_foreign" foreign key ("product_category_uuid") references "product_category" ("uuid") on update cascade on delete cascade;');
  }

}
