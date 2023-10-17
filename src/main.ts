import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { CORS, getEnvironment } from './common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.setGlobalPrefix('api');
  app.enableCors(CORS);

  const DEFAULT_PORT = 3000;
  const { PORT } = getEnvironment();
  await app.listen(PORT || DEFAULT_PORT);
  console.log(`Application running on Port: ${PORT || DEFAULT_PORT}`);
}
bootstrap();
