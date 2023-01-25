import { MikroOrmModule } from '@mikro-orm/nestjs';
import { ApolloDriverConfig } from '@nestjs/apollo';
import { ApolloDriver } from '@nestjs/apollo/dist/drivers';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { AuthModule } from './auth/auth.module';
import { StorageContainerModule } from './storage-container/storage-container.module';
import { PantryItemModule } from './pantry-item/pantry-item.module';
import { UserModule } from './user/user.module';
import { AutoUpgradeModule } from './util/migrate/auto-upgrade.module';


@Module({

  imports: [
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
    AutoUpgradeModule
  ]
})
export class AppModule { }

