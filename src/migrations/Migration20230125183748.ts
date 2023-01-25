import { Migration } from '@mikro-orm/migrations';

export class Migration20230125183748 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "pantry_item" ("uuid" varchar(255) not null, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "name" varchar(255) not null, "expiry_date" timestamptz(0) not null, "bar_code" timestamptz(0) not null, "cooking_instruction" varchar(255) not null, constraint "pantry_item_pkey" primary key ("uuid"));');

    this.addSql('create table "storage_container" ("uuid" varchar(255) not null, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "name" varchar(255) not null, constraint "storage_container_pkey" primary key ("uuid"));');

    this.addSql('drop table if exists "bin" cascade;');
  }

  async down(): Promise<void> {
    this.addSql('create table "bin" ("uuid" varchar(255) not null, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "name" varchar(255) not null, constraint "bin_pkey" primary key ("uuid"));');

    this.addSql('drop table if exists "pantry_item" cascade;');

    this.addSql('drop table if exists "storage_container" cascade;');
  }

}
