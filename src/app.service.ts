import {Injectable} from '@nestjs/common';
import * as jwt from 'jsonwebtoken'
import {ApiService} from './api.service';

import diplomaStructure from './diploma-structure.json';

@Injectable()
export class AppService {
  constructor(private apiService: ApiService) {

  }

  async createNewMaster(body: any) {
    diplomaStructure.credentialSubject.id = body.did;
    const token = await this.apiService.generateTokenForSpanishUniversity();
    const decodedToken = jwt.decode(token);
    diplomaStructure.issuer.id = decodedToken.did;
    return this.apiService.diploma(diplomaStructure, token);
  }

  async createNewBachelor(body: any) {
    diplomaStructure.credentialSubject.id = body.did;
    const token = await this.apiService.generateTokenForFlemishGov();
    const decodedToken = jwt.decode(token);
    diplomaStructure.issuer.id = decodedToken.did;
    return this.apiService.diploma(diplomaStructure, token);
  }

  decodeUserToken(request: any) {
    if (request.headers.authorization) {
      const auth = request.headers.authorization.split('Bearer ');
      if (auth.length === 2) {
        return auth[1];
      }
    }
  }

  async verifyMasterVP(request: any) {
    const serviceEndpoint = request.body.serviceEndpoint;
    const userToken = this.decodeUserToken(request);

    const vp = await this.apiService.getVP(serviceEndpoint, userToken);
    let buff = Buffer.from(vp.data.base64, 'base64');

    return await this.apiService.presentationValidation(JSON.parse(buff.toString()), userToken);
  }

  async verifyBachelorVP(request: any) {
    const serviceEndpoint = request.body.serviceEndpoint;
    const userToken = this.decodeUserToken(request);

    const vp = await this.apiService.getVP(serviceEndpoint, userToken);
    let buff = Buffer.from(vp.data.base64, 'base64');

    return await this.apiService.presentationValidation(JSON.parse(buff.toString()), userToken);
  }
}
