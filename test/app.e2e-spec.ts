import { ClassSerializerInterceptor, INestApplication, ValidationPipe } from '@nestjs/common';
import { HttpAdapterHost, Reflector } from '@nestjs/core';
import { Test } from '@nestjs/testing';
import * as pactum from 'pactum';
import { AppModule } from '../src/app.module';
import { MikroOrmSerializerInterceptor } from '../src/decorators/interceptors/mikro-orm-serializer.interceptor';
import { DbUtilsService } from '../src/util/test/db-util.service';
import { TestUtilModule } from '../src/util/test/test-util.module';
import { house, lostpw, signin, signup, storageLocation, user } from './tests';
import { MailhogClientService } from './tests/helpers/mail-client';
import { DatabaseSeeder } from './tests/seeders/database.seeder';
import { storageContainer } from './tests/storage-container-e2e';

describe('App e2e', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef =
      await Test.createTestingModule({
        imports: [AppModule, TestUtilModule],
      }).compile();

    app = moduleRef.createNestApplication();
    const { httpAdapter } = app.get(HttpAdapterHost);

    // Starts listening for shutdown hooks
    app.enableShutdownHooks();

    app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)), new MikroOrmSerializerInterceptor())

    // Enable global validation
    app.useGlobalPipes(new ValidationPipe({
      whitelist: true,
      transform: true,
    }));

    await app.init();
    await app.listen(3333);
    const dbUtils = app.get<DbUtilsService>(DbUtilsService);
    await dbUtils.cleanDb();
    const seeder = dbUtils.getSeeder();
    // Seed using a seeder defined by you
    await seeder.seed(DatabaseSeeder);

    MailhogClientService.getInstance();

    pactum.request.setBaseUrl(
      'http://localhost:3333',
    );
  });

  afterAll(() => {
    app.close();
  });

  describe('Signup', signup);

  describe('Signin', signin);

  describe('Lost password', lostpw);

  describe('User', user);

  describe('House', house);

  describe('StorageLocation', storageLocation);

  describe('StorageContainer', storageContainer);

});