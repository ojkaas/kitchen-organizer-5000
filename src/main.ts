import { ValidationPipe } from '@nestjs/common';
import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { UniqueConstraintFilter } from './core/filters/unique-constraint.filter';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const { httpAdapter } = app.get(HttpAdapterHost);

  // Starts listening for shutdown hooks
  app.enableShutdownHooks();

  // Add unique constraint filter
  app.useGlobalFilters(new UniqueConstraintFilter(httpAdapter));

  // Enable global validation
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    transform: true
  }));
  await app.listen(3000);
}
bootstrap();
