import {Injectable} from '@nestjs/common';
import * as jwt from 'jsonwebtoken'
import {ApiService} from './api.service';
import {DIDBody, ServiceEndpointBody} from './validation';

let diplomaStructure = require('./diploma-structure.json');

@Injectable()
export class AppService {
  constructor(private apiService: ApiService) {

  }

  async createNewMaster(body: DIDBody) {
    diplomaStructure.credentialSubject.id = body.did;
    const token = await this.apiService.generateTokenForSpanishUniversity();
    const decodedToken = jwt.decode(token);
    diplomaStructure.issuer.id = decodedToken.did;
    return this.apiService.diploma(diplomaStructure, token);
  }

  async createNewBachelor(body: DIDBody) {
    diplomaStructure.credentialSubject.id = body.did;
    const token = await this.apiService.generateTokenForFlemishGov();
    const decodedToken = jwt.decode(token);
    diplomaStructure.issuer.id = decodedToken.did;
    return this.apiService.diploma(diplomaStructure, token);
  }

  decodeUserToken(headers: any) {
    if (headers.authorization) {
      const auth = headers.authorization.split('Bearer ');
      if (auth.length === 2) {
        return auth[1];
      }
    }
  }

  async verifyMasterVP(headers: any, body: ServiceEndpointBody) {
    const serviceEndpoint = body.serviceEndpoint;
    const userToken = this.decodeUserToken(headers);

    const vp = await this.apiService.getVP(serviceEndpoint, userToken);
    let buff = Buffer.from(vp.data.base64, 'base64');

    return await this.apiService.presentationValidation(JSON.parse(buff.toString()), userToken);
  }

  async verifyBachelorVP(headers: any, body: ServiceEndpointBody) {
    const serviceEndpoint = body.serviceEndpoint;
    const userToken = this.decodeUserToken(headers);

    const vp = await this.apiService.getVP(serviceEndpoint, userToken);
    let buff = Buffer.from(vp.data.base64, 'base64');

    return await this.apiService.presentationValidation(JSON.parse(buff.toString()), userToken);
  }
}
