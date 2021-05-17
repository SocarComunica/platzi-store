import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';

import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Request validation pipes
  app.useGlobalPipes(
    new ValidationPipe({
      // Ignores on requests noy expected parameters
      whitelist: true,
      // Forces error on request not expected parameters
      forbidNonWhitelisted: true,
      // Transform query params implicitly
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  // Swagger documentation configuration
  const config = new DocumentBuilder()
    .setTitle('Platzi Store API')
    .setDescription('Platzi Store API description')
    .setVersion('1.0')
    .addTag('platzi store')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  app.enableCors();
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
