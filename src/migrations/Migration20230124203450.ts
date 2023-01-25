import { Migration } from '@mikro-orm/migrations';

export class Migration20230124203450 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "user" ("id" varchar(255) not null, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "name" varchar(255) not null, "email" varchar(255) not null, "language" varchar(255) null, "password" varchar(255) not null, constraint "user_pkey" primary key ("id"));');
  }

}
