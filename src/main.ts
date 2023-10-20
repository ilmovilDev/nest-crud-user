import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { CORS, getEnvironment } from './common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.setGlobalPrefix('api');
  app.enableCors(CORS);

  const config = new DocumentBuilder()
    .setTitle('CRUD of users in nest JS')
    .setDescription('This project is a basic User CRUD (Create, Read, Update, Delete) application built using Nest.js. It provides a foundation for managing user data with a RESTful API. You can create, retrieve, update, and delete user records, making it a great starting point for building user management features in your applications.')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);
  const DEFAULT_PORT = 3000;
  const { PORT } = getEnvironment();
  await app.listen(PORT || DEFAULT_PORT);
  console.log(`Application running on Port: ${PORT || DEFAULT_PORT}`);
}
bootstrap();
