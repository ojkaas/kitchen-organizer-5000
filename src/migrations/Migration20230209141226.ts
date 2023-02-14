import { Migration } from '@mikro-orm/migrations';

export class Migration20230209141226 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "house" ("uuid" uuid not null default gen_random_uuid(), "created_at" timestamptz(0) not null default now(), "updated_at" timestamptz(0) not null default now(), "name" varchar(255) not null, constraint "house_pkey" primary key ("uuid"));');

    this.addSql('create table "invite" ("uuid" uuid not null default gen_random_uuid(), "created_at" timestamptz(0) not null default now(), "updated_at" timestamptz(0) not null default now(), "email" varchar(255) not null, "accepted" boolean not null, "house_uuid" uuid not null, constraint "invite_pkey" primary key ("uuid"));');

    this.addSql('alter table "invite" add constraint "invite_house_uuid_foreign" foreign key ("house_uuid") references "house" ("uuid") on update cascade;');

    this.addSql('alter table "user" add column "house_uuid" uuid not null;');
    this.addSql('alter table "user" add constraint "user_house_uuid_foreign" foreign key ("house_uuid") references "house" ("uuid") on update cascade;');
  }

  async down(): Promise<void> {
    this.addSql('alter table "invite" drop constraint "invite_house_uuid_foreign";');

    this.addSql('alter table "user" drop constraint "user_house_uuid_foreign";');

    this.addSql('drop table if exists "house" cascade;');

    this.addSql('drop table if exists "invite" cascade;');

    this.addSql('alter table "user" drop column "house_uuid";');
  }

}
