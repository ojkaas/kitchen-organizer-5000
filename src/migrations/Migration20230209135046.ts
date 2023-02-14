import { Migration } from '@mikro-orm/migrations';

export class Migration20230209135046 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "product" ("uuid" uuid not null default gen_random_uuid(), "created_at" timestamptz(0) not null default now(), "updated_at" timestamptz(0) not null default now(), "name" varchar(255) not null, "bar_code" varchar(255) not null, "cooking_instruction" varchar(255) null, constraint "product_pkey" primary key ("uuid"));');
    this.addSql('create index "product_bar_code_index" on "product" ("bar_code");');
    this.addSql('alter table "product" add constraint "product_bar_code_unique" unique ("bar_code");');

    this.addSql('create table "product_category" ("uuid" uuid not null default gen_random_uuid(), "created_at" timestamptz(0) not null default now(), "updated_at" timestamptz(0) not null default now(), "name" varchar(255) not null, constraint "product_category_pkey" primary key ("uuid"));');
    this.addSql('alter table "product_category" add constraint "product_category_name_unique" unique ("name");');

    this.addSql('create table "product_categories" ("product_uuid" uuid not null, "product_category_uuid" uuid not null, constraint "product_categories_pkey" primary key ("product_uuid", "product_category_uuid"));');

    this.addSql('create table "storage_container" ("uuid" uuid not null default gen_random_uuid(), "created_at" timestamptz(0) not null default now(), "updated_at" timestamptz(0) not null default now(), "name" varchar(255) not null, "location" varchar(255) not null, constraint "storage_container_pkey" primary key ("uuid"));');

    this.addSql('create table "pantry_item" ("uuid" uuid not null default gen_random_uuid(), "created_at" timestamptz(0) not null default now(), "updated_at" timestamptz(0) not null default now(), "product_uuid" uuid not null, "expiry_date" timestamptz(0) null, "quantity" int not null default 1, "storage_container_uuid" uuid null, constraint "pantry_item_pkey" primary key ("uuid"));');

    this.addSql('create table "user" ("uuid" uuid not null default gen_random_uuid(), "created_at" timestamptz(0) not null default now(), "updated_at" timestamptz(0) not null default now(), "name" varchar(255) null, "email" varchar(255) not null, "language" varchar(255) null default \'EN\', "password" varchar(255) not null, constraint "user_pkey" primary key ("uuid"));');
    this.addSql('alter table "user" add constraint "user_email_unique" unique ("email");');

    this.addSql('alter table "product_categories" add constraint "product_categories_product_uuid_foreign" foreign key ("product_uuid") references "product" ("uuid") on update cascade on delete cascade;');
    this.addSql('alter table "product_categories" add constraint "product_categories_product_category_uuid_foreign" foreign key ("product_category_uuid") references "product_category" ("uuid") on update cascade on delete cascade;');

    this.addSql('alter table "pantry_item" add constraint "pantry_item_product_uuid_foreign" foreign key ("product_uuid") references "product" ("uuid") on update cascade;');
    this.addSql('alter table "pantry_item" add constraint "pantry_item_storage_container_uuid_foreign" foreign key ("storage_container_uuid") references "storage_container" ("uuid") on update cascade on delete set null;');
  }

  async down(): Promise<void> {
    this.addSql('alter table "product_categories" drop constraint "product_categories_product_uuid_foreign";');

    this.addSql('alter table "pantry_item" drop constraint "pantry_item_product_uuid_foreign";');

    this.addSql('alter table "product_categories" drop constraint "product_categories_product_category_uuid_foreign";');

    this.addSql('alter table "pantry_item" drop constraint "pantry_item_storage_container_uuid_foreign";');

    this.addSql('drop table if exists "product" cascade;');

    this.addSql('drop table if exists "product_category" cascade;');

    this.addSql('drop table if exists "product_categories" cascade;');

    this.addSql('drop table if exists "storage_container" cascade;');

    this.addSql('drop table if exists "pantry_item" cascade;');

    this.addSql('drop table if exists "user" cascade;');
  }

}
