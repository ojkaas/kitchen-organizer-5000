import { Migration } from '@mikro-orm/migrations';

export class Migration20230125175530 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "bin" add column "uuid" varchar(255) not null;');
    this.addSql('alter table "bin" drop constraint "bin_pkey";');
    this.addSql('alter table "bin" drop column "id";');
    this.addSql('alter table "bin" add constraint "bin_pkey" primary key ("uuid");');

    this.addSql('alter table "user" add column "uuid" varchar(255) not null;');
    this.addSql('alter table "user" drop constraint "user_pkey";');
    this.addSql('alter table "user" drop column "id";');
    this.addSql('alter table "user" add constraint "user_pkey" primary key ("uuid");');
  }

  async down(): Promise<void> {
    this.addSql('alter table "bin" add column "id" serial;');
    this.addSql('alter table "bin" drop constraint "bin_pkey";');
    this.addSql('alter table "bin" drop column "uuid";');
    this.addSql('alter table "bin" add constraint "bin_pkey" primary key ("id");');

    this.addSql('alter table "user" add column "id" serial;');
    this.addSql('alter table "user" drop constraint "user_pkey";');
    this.addSql('alter table "user" drop column "uuid";');
    this.addSql('alter table "user" add constraint "user_pkey" primary key ("id");');
  }

}
