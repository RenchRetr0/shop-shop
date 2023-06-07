import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import * as express from 'express';
import { TransformResponseInterceptor } from '@common/interceprot/transform-response.interceptor';
import { join } from 'path';
import * as cors from 'cors';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = app.get(ConfigService);
  const port = config.get<number>('APP_PORT');

  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(new TransformResponseInterceptor());

  app.use('/uploads', express.static(join(__dirname, '..', 'uploads')));
  app.use(cors({origin: 'http://localhost:5173'}));

  await app.listen(port || 3000);
}
bootstrap();
