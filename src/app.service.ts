import { Injectable } from "@nestjs/common";
import * as jwt from "jsonwebtoken";
import { ApiService } from "./api.service";
import { DIDBody, ServiceEndpointBody } from "./validation";

import diplomaBachelorStructure from "./bachelor-diploma-structure.json";
import diplomaMasterStructure from "./master-diploma-structure.json";

@Injectable()
export class AppService {
  constructor(private apiService: ApiService) {}

  async createNewMaster(body: DIDBody): Promise<object> {
    diplomaMasterStructure.credentialSubject.id = body.did;
    const token = await this.apiService.generateTokenForSpanishUniversity();
    const decodedToken = jwt.decode(token);
    diplomaMasterStructure.issuer.id = decodedToken.did;
    return this.apiService.diploma(diplomaMasterStructure, token);
  }

  async createNewBachelor(body: DIDBody): Promise<object> {
    diplomaBachelorStructure.credentialSubject.id = body.did;
    const token = await this.apiService.generateTokenForFlemishGov();
    const decodedToken = jwt.decode(token);
    diplomaBachelorStructure.issuer.id = decodedToken.did;
    return this.apiService.diploma(diplomaBachelorStructure, token);
  }

  decodeUserToken(headers: any): string {
    if (headers.authorization) {
      const auth = headers.authorization.split("Bearer ");
      if (auth.length === 2) {
        return auth[1];
      }
    }

    return "";
  }

  async verifyMasterVP(headers: any, body: ServiceEndpointBody): Promise<void> {
    const serviceEndpoint = body.serviceEndpoint;
    const userToken = this.decodeUserToken(headers);

    const vp = await this.apiService.getVP(serviceEndpoint, userToken);
    const buff = Buffer.from(vp.data.base64, "base64");

    return await this.apiService.presentationValidation(
      JSON.parse(buff.toString()),
      userToken
    );
  }

  async verifyBachelorVP(
    headers: any,
    body: ServiceEndpointBody
  ): Promise<void> {
    const serviceEndpoint = body.serviceEndpoint;
    const userToken = this.decodeUserToken(headers);

    const vp = await this.apiService.getVP(serviceEndpoint, userToken);
    const buff = Buffer.from(vp.data.base64, "base64");

    return await this.apiService.presentationValidation(
      JSON.parse(buff.toString()),
      userToken
    );
  }
}
