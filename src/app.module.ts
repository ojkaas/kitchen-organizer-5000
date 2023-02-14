import { MikroOrmModule } from '@mikro-orm/nestjs';
import { ApolloDriverConfig } from '@nestjs/apollo';
import { ApolloDriver } from '@nestjs/apollo/dist/drivers';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { AuthModule } from './modules/auth/auth.module';
import { PantryItemModule } from './modules/pantry-item/pantry-item.module';
import { StorageContainerModule } from './modules/storage-container/storage-container.module';
import { UserModule } from './modules/user/user.module';
import { UserController } from './modules/user/user.controller';
import { AutoUpgradeModule } from './util/migrate/auto-upgrade.module';
import { TestUtilModule } from './util/test/test-util.module';
import { HouseModule } from './modules/house/house.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    AuthModule,
    UserModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      debug: true,
      playground: true,
      autoSchemaFile: true,
      driver: ApolloDriver
    }),
    MikroOrmModule.forRoot(),
    StorageContainerModule,
    PantryItemModule,
    AutoUpgradeModule,
    TestUtilModule,
    HouseModule
  ],

  controllers: [UserController]
})
export class AppModule { }

