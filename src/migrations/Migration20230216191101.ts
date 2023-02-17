import { Migration } from '@mikro-orm/migrations';

export class Migration20230216191101 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "storage_container" add column "location_uuid" uuid null, add column "house_uuid" uuid not null;');
    this.addSql('alter table "storage_container" add constraint "storage_container_location_uuid_foreign" foreign key ("location_uuid") references "storage_location" ("uuid") on update cascade on delete set null;');
    this.addSql('alter table "storage_container" add constraint "storage_container_house_uuid_foreign" foreign key ("house_uuid") references "house" ("uuid") on update cascade;');
    this.addSql('alter table "storage_container" drop column "location";');
  }

  async down(): Promise<void> {
    this.addSql('alter table "storage_container" drop constraint "storage_container_location_uuid_foreign";');
    this.addSql('alter table "storage_container" drop constraint "storage_container_house_uuid_foreign";');

    this.addSql('alter table "storage_container" add column "location" varchar(255) not null;');
    this.addSql('alter table "storage_container" drop column "location_uuid";');
    this.addSql('alter table "storage_container" drop column "house_uuid";');
  }

}
