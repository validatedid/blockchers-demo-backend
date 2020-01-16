import * as dotenv from 'dotenv';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

import { AppModule } from './app.module';

dotenv.config();




async function bootstrap() {
  const options = new DocumentBuilder()
      .setTitle('Universities')
      .setDescription('')
      .setVersion('1.0')
      .addTag('universities')
      .build();

  const app = await NestFactory.create(AppModule);
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('universities/api-docs', app, document);
  await app.listen(process.env.APP_PORT || 3000);
}
bootstrap();
