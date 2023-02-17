import { Migration } from '@mikro-orm/migrations';

export class Migration20230216074546 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "user" add column "last_login" timestamptz(0) null;');
    this.addSql('alter table "user" alter column "language" type varchar(255) using ("language"::varchar(255));');
    this.addSql('alter table "user" alter column "language" set default \'NL\';');
  }

  async down(): Promise<void> {
    this.addSql('alter table "user" alter column "language" type varchar(255) using ("language"::varchar(255));');
    this.addSql('alter table "user" alter column "language" set default \'EN\';');
    this.addSql('alter table "user" drop column "last_login";');
  }

}
