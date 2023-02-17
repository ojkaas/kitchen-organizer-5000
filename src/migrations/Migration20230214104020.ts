import { Migration } from '@mikro-orm/migrations';

export class Migration20230214104020 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "user" alter column "roles" type text[] using ("roles"::text[]);');
    this.addSql('alter table "user" alter column "roles" drop not null;');
  }

  async down(): Promise<void> {
    this.addSql('alter table "user" alter column "roles" type text[] using ("roles"::text[]);');
    this.addSql('alter table "user" alter column "roles" set not null;');
  }

}
