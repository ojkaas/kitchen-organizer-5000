import { EntityManager, MikroORM } from "@mikro-orm/core";
import { Injectable } from '@nestjs/common';

@Injectable()
export class DbUtilsService {
    constructor(private mikroOrm: MikroORM) { }
    cleanDb() {
        return this.mikroOrm.getSchemaGenerator().clearDatabase();
    }

    getSeeder() {
        return this.mikroOrm.getSeeder()
    }

    runMigrator() {
        return this.mikroOrm.getMigrator().up();
    }
}
