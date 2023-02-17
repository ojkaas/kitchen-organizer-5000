import { Migration } from '@mikro-orm/migrations';

export class Migration20230215140758 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "storage_location" add column "house_uuid" uuid not null;');
    this.addSql('alter table "storage_location" add constraint "storage_location_house_uuid_foreign" foreign key ("house_uuid") references "house" ("uuid") on update cascade;');
  }

  async down(): Promise<void> {
    this.addSql('alter table "storage_location" drop constraint "storage_location_house_uuid_foreign";');

    this.addSql('alter table "storage_location" drop column "house_uuid";');
  }

}
