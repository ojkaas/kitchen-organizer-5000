import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { HttpAdapterHost, NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { MikroOrmSerializerInterceptor } from './decorators/interceptors/mikro-orm-serializer.interceptor';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const { httpAdapter } = app.get(HttpAdapterHost);

  // Starts listening for shutdown hooks
  app.enableShutdownHooks();

  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)), new MikroOrmSerializerInterceptor())


  // Enable global validation
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    transform: true
  }));
  await app.listen(3000);
}
bootstrap();

