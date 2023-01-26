import { MikroORM } from '@mikro-orm/core';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Logger, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DbUtilsService } from './db-util.service';

@Module({
    imports: [MikroOrmModule.forRoot()],
    providers: [DbUtilsService],
    exports: [DbUtilsService]
})
export class TestUtilModule {
}
