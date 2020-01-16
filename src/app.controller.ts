import {Body, Controller, Post, Request} from '@nestjs/common';
import { AppService } from './app.service';

@Controller('/universities')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('masters')
  postMasters(@Body() body) {
    return this.appService.createNewMaster(body);
  }

  @Post('bachelors')
  postBachelors(@Body() body) {
    return this.appService.createNewBachelor(body);
  }

  @Post('bachelor-vp')
  postBachelorVP(@Request() request) {
    return this.appService.verifyBachelorVP(request);
  }

  @Post('master-vp')
  postMasterVP(@Request() request) {
    return this.appService.verifyMasterVP(request);
  }
}
