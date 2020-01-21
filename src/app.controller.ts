import {Body, Controller, Headers, Post, Res} from '@nestjs/common';

import {AppService} from './app.service';
import {DIDBody, ServiceEndpointBody} from './validation';
import {ApiBearerAuth} from "@nestjs/swagger";

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

  @ApiBearerAuth()
  @Post('bachelor-vp')
  async postBachelorVP(@Headers() headers, @Body() serviceEnpointBody: ServiceEndpointBody, @Res() rs) {
    try {
      return await this.appService.verifyBachelorVP(headers, serviceEnpointBody);
    } catch(ex) {
      let status = 500;
      let data = '';
      if (ex.response && ex.response.status && ex.response.data) {
        data = ex.response.data;
        status = ex.response.status;
      }
      rs.status(status).send(data);
    }
  }

  @ApiBearerAuth()
  @Post('master-vp')
  async postMasterVP(@Headers() headers, @Body() serviceEnpointBody: ServiceEndpointBody, @Res() rs) {
    try {
      return await this.appService.verifyMasterVP(headers, serviceEnpointBody);
    } catch(ex) {
      let status = 500;
      let data = '';
      if (ex.response && ex.response.status && ex.response.data) {
        data = ex.response.data;
        status = ex.response.status;
      }
      rs.status(status).send(data);
    }
  }
}
