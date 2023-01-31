import { Migration } from '@mikro-orm/migrations';

export class Migration20230131125536 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "product" ("uuid" varchar(255) not null, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "name" varchar(255) not null, "bar_code" varchar(255) null, "cooking_instruction" varchar(255) null, constraint "product_pkey" primary key ("uuid"));');

    this.addSql('create table "product_categories" ("product_uuid" varchar(255) not null, "pantry_category_uuid" varchar(255) not null, constraint "product_categories_pkey" primary key ("product_uuid", "pantry_category_uuid"));');

    this.addSql('alter table "product_categories" add constraint "product_categories_product_uuid_foreign" foreign key ("product_uuid") references "product" ("uuid") on update cascade on delete cascade;');
    this.addSql('alter table "product_categories" add constraint "product_categories_pantry_category_uuid_foreign" foreign key ("pantry_category_uuid") references "pantry_category" ("uuid") on update cascade on delete cascade;');

    this.addSql('drop table if exists "pantry_item_categories" cascade;');

    this.addSql('alter table "pantry_item" drop column "bar_code";');
    this.addSql('alter table "pantry_item" drop column "cooking_instruction";');
    this.addSql('alter table "pantry_item" rename column "name" to "product_uuid";');
    this.addSql('alter table "pantry_item" add constraint "pantry_item_product_uuid_foreign" foreign key ("product_uuid") references "product" ("uuid") on update cascade;');
  }

  async down(): Promise<void> {
    this.addSql('alter table "product_categories" drop constraint "product_categories_product_uuid_foreign";');

    this.addSql('alter table "pantry_item" drop constraint "pantry_item_product_uuid_foreign";');

    this.addSql('create table "pantry_item_categories" ("pantry_item_uuid" varchar(255) not null, "pantry_category_uuid" varchar(255) not null, constraint "pantry_item_categories_pkey" primary key ("pantry_item_uuid", "pantry_category_uuid"));');

    this.addSql('alter table "pantry_item_categories" add constraint "pantry_item_categories_pantry_item_uuid_foreign" foreign key ("pantry_item_uuid") references "pantry_item" ("uuid") on update cascade on delete cascade;');
    this.addSql('alter table "pantry_item_categories" add constraint "pantry_item_categories_pantry_category_uuid_foreign" foreign key ("pantry_category_uuid") references "pantry_category" ("uuid") on update cascade on delete cascade;');

    this.addSql('drop table if exists "product" cascade;');

    this.addSql('drop table if exists "product_categories" cascade;');

    this.addSql('alter table "pantry_item" add column "bar_code" varchar(255) null, add column "cooking_instruction" varchar(255) null;');
    this.addSql('alter table "pantry_item" rename column "product_uuid" to "name";');
  }

}
