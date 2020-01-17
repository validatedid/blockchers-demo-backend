import {Body, Controller, Headers, Post} from '@nestjs/common';

import {AppService} from './app.service';
import {DIDBody, ServiceEndpointBody} from './validation';

@Controller('/universities')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('masters')
  postMasters(@Body() body: DIDBody) {
    return this.appService.createNewMaster(body);
  }

  @Post('bachelors')
  postBachelors(@Body() body: DIDBody) {
    return this.appService.createNewBachelor(body);
  }

  @Post('bachelor-vp')
  postBachelorVP(@Headers() headers, @Body() serviceEnpointBody: ServiceEndpointBody) {
    return this.appService.verifyBachelorVP(headers, serviceEnpointBody);
  }

  @Post('master-vp')
  postMasterVP(@Headers() headers, @Body() serviceEnpointBody: ServiceEndpointBody) {
    return this.appService.verifyMasterVP(headers, serviceEnpointBody);
  }
}
