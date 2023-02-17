import { Migration } from '@mikro-orm/migrations';

export class Migration20230215135136 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "storage_location" ("uuid" uuid not null default gen_random_uuid(), "created_at" timestamptz(0) not null default now(), "updated_at" timestamptz(0) not null default now(), "name" varchar(255) not null, constraint "storage_location_pkey" primary key ("uuid"));');
    this.addSql('alter table "storage_location" add constraint "storage_location_name_unique" unique ("name");');
  }

  async down(): Promise<void> {
    this.addSql('drop table if exists "storage_location" cascade;');
  }

}
