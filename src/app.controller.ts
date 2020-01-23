import {Body, Controller, Get, Headers, Post, Res} from '@nestjs/common';
import {ApiBearerAuth} from '@nestjs/swagger';

import {AppService} from './app.service';
import {DIDBody, ServiceEndpointBody} from './validation';

@Controller('/universities')
export class AppController {
  constructor(private readonly appService: AppService) {}


    @Post('masters')
    async postMasters(@Body() body: DIDBody, @Res() rs) {
        try {
            return rs.send(await this.appService.createNewMaster(body));
        } catch (ex) {
            let status = 500;
            let data = '';
            if (ex.response && ex.response.status && ex.response.data) {
                data = ex.response.data;
                status = ex.response.status;
            }
            rs.status(status).send(data);
        }
    }

    @Post('bachelors')
    async postBachelors(@Body() body: DIDBody, @Res() rs) {
        try {
          return rs.send(await this.appService.createNewBachelor(body));
        } catch (ex) {
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
    @Post('bachelor-vp')
    async postBachelorVP(@Headers() headers, @Body() serviceEnpointBody: ServiceEndpointBody, @Res() rs) {
        try {
            return rs.send(await this.appService.verifyBachelorVP(headers, serviceEnpointBody));
        } catch (ex) {
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
            return rs.send(await this.appService.verifyMasterVP(headers, serviceEnpointBody));
        } catch (ex) {
            let status = 500;
            let data = '';
            if (ex.response && ex.response.status && ex.response.data) {
                data = ex.response.data;
                status = ex.response.status;
            }
            rs.status(status).send(data);
        }
    }

    @Get('/swagger.json')
    async getSwagger(@Res() response) {
        return response.redirect('/universities/api-docs-json');
    }
}
