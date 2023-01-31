import { Migration } from '@mikro-orm/migrations';

export class Migration20230131084437 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "pantry_category" ("uuid" varchar(255) not null, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "name" varchar(255) not null, constraint "pantry_category_pkey" primary key ("uuid"));');

    this.addSql('create table "pantry_item_categories" ("pantry_item_uuid" varchar(255) not null, "pantry_category_uuid" varchar(255) not null, constraint "pantry_item_categories_pkey" primary key ("pantry_item_uuid", "pantry_category_uuid"));');

    this.addSql('alter table "pantry_item_categories" add constraint "pantry_item_categories_pantry_item_uuid_foreign" foreign key ("pantry_item_uuid") references "pantry_item" ("uuid") on update cascade on delete cascade;');
    this.addSql('alter table "pantry_item_categories" add constraint "pantry_item_categories_pantry_category_uuid_foreign" foreign key ("pantry_category_uuid") references "pantry_category" ("uuid") on update cascade on delete cascade;');

    this.addSql('alter table "pantry_item" alter column "expiry_date" type timestamptz(0) using ("expiry_date"::timestamptz(0));');
    this.addSql('alter table "pantry_item" alter column "expiry_date" drop not null;');
    this.addSql('alter table "pantry_item" alter column "bar_code" type varchar(255) using ("bar_code"::varchar(255));');
    this.addSql('alter table "pantry_item" alter column "bar_code" drop not null;');
    this.addSql('alter table "pantry_item" alter column "cooking_instruction" type varchar(255) using ("cooking_instruction"::varchar(255));');
    this.addSql('alter table "pantry_item" alter column "cooking_instruction" drop not null;');
    this.addSql('alter table "pantry_item" drop column "category";');
  }

  async down(): Promise<void> {
    this.addSql('alter table "pantry_item_categories" drop constraint "pantry_item_categories_pantry_category_uuid_foreign";');

    this.addSql('drop table if exists "pantry_category" cascade;');

    this.addSql('drop table if exists "pantry_item_categories" cascade;');

    this.addSql('alter table "pantry_item" add column "category" varchar(255) null;');
    this.addSql('alter table "pantry_item" alter column "expiry_date" type timestamptz(0) using ("expiry_date"::timestamptz(0));');
    this.addSql('alter table "pantry_item" alter column "expiry_date" set not null;');
    this.addSql('alter table "pantry_item" alter column "bar_code" type timestamptz(0) using ("bar_code"::timestamptz(0));');
    this.addSql('alter table "pantry_item" alter column "bar_code" set not null;');
    this.addSql('alter table "pantry_item" alter column "cooking_instruction" type varchar(255) using ("cooking_instruction"::varchar(255));');
    this.addSql('alter table "pantry_item" alter column "cooking_instruction" set not null;');
  }

}
