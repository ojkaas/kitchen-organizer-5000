import { Migration } from '@mikro-orm/migrations';

export class Migration20230201085859 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "product" alter column "created_at" type timestamptz(0) using ("created_at"::timestamptz(0));');
    this.addSql('alter table "product" alter column "created_at" set default now();');
    this.addSql('alter table "product" alter column "updated_at" type timestamptz(0) using ("updated_at"::timestamptz(0));');
    this.addSql('alter table "product" alter column "updated_at" set default now();');

    this.addSql('alter table "product_category" alter column "created_at" type timestamptz(0) using ("created_at"::timestamptz(0));');
    this.addSql('alter table "product_category" alter column "created_at" set default now();');
    this.addSql('alter table "product_category" alter column "updated_at" type timestamptz(0) using ("updated_at"::timestamptz(0));');
    this.addSql('alter table "product_category" alter column "updated_at" set default now();');

    this.addSql('alter table "storage_container" alter column "created_at" type timestamptz(0) using ("created_at"::timestamptz(0));');
    this.addSql('alter table "storage_container" alter column "created_at" set default now();');
    this.addSql('alter table "storage_container" alter column "updated_at" type timestamptz(0) using ("updated_at"::timestamptz(0));');
    this.addSql('alter table "storage_container" alter column "updated_at" set default now();');

    this.addSql('alter table "pantry_item" alter column "created_at" type timestamptz(0) using ("created_at"::timestamptz(0));');
    this.addSql('alter table "pantry_item" alter column "created_at" set default now();');
    this.addSql('alter table "pantry_item" alter column "updated_at" type timestamptz(0) using ("updated_at"::timestamptz(0));');
    this.addSql('alter table "pantry_item" alter column "updated_at" set default now();');

    this.addSql('alter table "user" alter column "created_at" type timestamptz(0) using ("created_at"::timestamptz(0));');
    this.addSql('alter table "user" alter column "created_at" set default now();');
    this.addSql('alter table "user" alter column "updated_at" type timestamptz(0) using ("updated_at"::timestamptz(0));');
    this.addSql('alter table "user" alter column "updated_at" set default now();');
  }

  async down(): Promise<void> {
    this.addSql('alter table "product" alter column "created_at" drop default;');
    this.addSql('alter table "product" alter column "created_at" type timestamptz(0) using ("created_at"::timestamptz(0));');
    this.addSql('alter table "product" alter column "updated_at" drop default;');
    this.addSql('alter table "product" alter column "updated_at" type timestamptz(0) using ("updated_at"::timestamptz(0));');

    this.addSql('alter table "product_category" alter column "created_at" drop default;');
    this.addSql('alter table "product_category" alter column "created_at" type timestamptz(0) using ("created_at"::timestamptz(0));');
    this.addSql('alter table "product_category" alter column "updated_at" drop default;');
    this.addSql('alter table "product_category" alter column "updated_at" type timestamptz(0) using ("updated_at"::timestamptz(0));');

    this.addSql('alter table "storage_container" alter column "created_at" drop default;');
    this.addSql('alter table "storage_container" alter column "created_at" type timestamptz(0) using ("created_at"::timestamptz(0));');
    this.addSql('alter table "storage_container" alter column "updated_at" drop default;');
    this.addSql('alter table "storage_container" alter column "updated_at" type timestamptz(0) using ("updated_at"::timestamptz(0));');

    this.addSql('alter table "pantry_item" alter column "created_at" drop default;');
    this.addSql('alter table "pantry_item" alter column "created_at" type timestamptz(0) using ("created_at"::timestamptz(0));');
    this.addSql('alter table "pantry_item" alter column "updated_at" drop default;');
    this.addSql('alter table "pantry_item" alter column "updated_at" type timestamptz(0) using ("updated_at"::timestamptz(0));');

    this.addSql('alter table "user" alter column "created_at" drop default;');
    this.addSql('alter table "user" alter column "created_at" type timestamptz(0) using ("created_at"::timestamptz(0));');
    this.addSql('alter table "user" alter column "updated_at" drop default;');
    this.addSql('alter table "user" alter column "updated_at" type timestamptz(0) using ("updated_at"::timestamptz(0));');
  }

}
