import { Migration } from '@mikro-orm/migrations';

export class Migration20230131140814 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "pantry_category" add constraint "pantry_category_name_unique" unique ("name");');

    this.addSql('alter table "product" add constraint "product_bar_code_unique" unique ("bar_code");');
  }

  async down(): Promise<void> {
    this.addSql('alter table "pantry_category" drop constraint "pantry_category_name_unique";');

    this.addSql('alter table "product" drop constraint "product_bar_code_unique";');
  }

}
