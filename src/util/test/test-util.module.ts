import { MikroORM } from '@mikro-orm/core';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Logger, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DbCleanService } from './db-clean.service';

@Module({
    imports: [MikroOrmModule.forRoot()],
    providers: [DbCleanService],
    exports: [DbCleanService]
})
export class TestUtilModule {
}
