import { MikroORM } from "@mikro-orm/core";
import { Injectable } from '@nestjs/common';

@Injectable()
export class DbUtilsService {
    constructor(private mikroOrm: MikroORM) { }
    cleanDb() {
        return this.mikroOrm.getSchemaGenerator().clearDatabase();
    }

    runMigrator() {
        return this.mikroOrm.getMigrator().up();
    }
}
