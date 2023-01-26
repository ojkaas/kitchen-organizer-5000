import { MikroORM } from "@mikro-orm/core";
import { Injectable } from '@nestjs/common';

@Injectable()
export class DbCleanService {
    constructor(private mikroOrm: MikroORM) { }
    cleanDb() {
        this.mikroOrm.getSchemaGenerator().clearDatabase();
    }
}
