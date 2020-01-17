import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {ApiService} from './api.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [ApiService, AppService],
})
export class AppModule {}
