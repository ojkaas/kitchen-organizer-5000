import { Migration } from '@mikro-orm/migrations';

export class Migration20230215154027 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "storage_location" drop constraint "storage_location_name_unique";');
    this.addSql('alter table "storage_location" add constraint "storage_location_name_house_uuid_unique" unique ("name", "house_uuid");');
  }

  async down(): Promise<void> {
    this.addSql('alter table "storage_location" drop constraint "storage_location_name_house_uuid_unique";');
    this.addSql('alter table "storage_location" add constraint "storage_location_name_unique" unique ("name");');
  }

}
