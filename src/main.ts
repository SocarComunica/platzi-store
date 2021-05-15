import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      // Ignores on requests noy expected parameters
      whitelist: true,
      // Forces error on request not expected parameters
      forbidNonWhitelisted: true,
    }),
  );
  await app.listen(3000);
}
bootstrap();
