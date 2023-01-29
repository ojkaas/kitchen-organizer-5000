import { Migration } from '@mikro-orm/migrations';

export class Migration20230126181533 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "storage_container" add column "location" varchar(255) not null;');

    this.addSql('alter table "pantry_item" add column "quantity" int not null default 1, add column "category" varchar(255) null, add column "storage_container_uuid" varchar(255) null;');
    this.addSql('alter table "pantry_item" add constraint "pantry_item_storage_container_uuid_foreign" foreign key ("storage_container_uuid") references "storage_container" ("uuid") on update cascade on delete set null;');
  }

  async down(): Promise<void> {
    this.addSql('alter table "pantry_item" drop constraint "pantry_item_storage_container_uuid_foreign";');

    this.addSql('alter table "pantry_item" drop column "quantity";');
    this.addSql('alter table "pantry_item" drop column "category";');
    this.addSql('alter table "pantry_item" drop column "storage_container_uuid";');

    this.addSql('alter table "storage_container" drop column "location";');
  }

}
