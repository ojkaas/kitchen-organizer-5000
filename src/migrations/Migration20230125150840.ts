import { Migration } from '@mikro-orm/migrations';

export class Migration20230125150840 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "user" alter column "language" type varchar(255) using ("language"::varchar(255));');
    this.addSql('alter table "user" alter column "language" set default \'EN\';');
  }

  async down(): Promise<void> {
    this.addSql('alter table "user" alter column "language" drop default;');
    this.addSql('alter table "user" alter column "language" type varchar(255) using ("language"::varchar(255));');
  }

}
