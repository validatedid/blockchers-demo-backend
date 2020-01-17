import * as dotenv from 'dotenv';
import {NestFactory} from '@nestjs/core';
import {SwaggerModule, DocumentBuilder} from '@nestjs/swagger';
import {ValidationPipe} from '@nestjs/common';

import { AppModule } from './app.module';

dotenv.config();


async function bootstrap() {
  const options = new DocumentBuilder()
      .addBearerAuth()
      .setTitle('Universities')
      .setDescription('')
      .setVersion('1.0')
      .build();

  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('universities/api-docs', app, document);
  await app.listen(process.env.APP_PORT || 3000);
}
bootstrap();
