import { Injectable } from "@nestjs/common";
import axios from "axios";

import config from "./config";

@Injectable()
export class ApiService {
  async generateTokenForFlemishGov(): Promise<string> {
    const response = await axios.post(
      `${config.ebsiServicesApis.wallet}/wallet/token`,
      {
        enterpriseName: "Flemish Government",
        nonce: "10" // rand
      }
    );

    const jwt = response.data.jwt;

    return axios
      .get(`${config.ebsiServicesApis.wallet}/wallet/login`, {
        headers: {
          Authorization: "Bearer " + jwt.trim()
        }
      })
      .then(res => {
        return res.data.jwt;
      });
  }

  async generateTokenForSpanishUniversity(): Promise<string> {
    const response = await axios.post(
      `${config.ebsiServicesApis.wallet}/wallet/token`,
      {
        enterpriseName: "Rovira i Virgili University",
        nonce: "10" // rand
      }
    );

    const jwt = response.data.jwt;

    return axios
      .get(`${config.ebsiServicesApis.wallet}/wallet/login`, {
        headers: {
          Authorization: "Bearer " + jwt
        }
      })
      .then(res => {
        return res.data.jwt;
      });
  }

  getVP(serviceEndpoint: string, token: string): Promise<any> {
    return axios
      .get(serviceEndpoint, {
        headers: {
          Authorization: "Bearer " + token
        }
      })
      .then(res => {
        return res.data;
      });
  }

  presentationValidation(data, token): Promise<any> {
    return axios
      .post(
        `${config.ebsiServicesApis.diplomaWallet}/diploma/presentation/validation`,
        JSON.parse(JSON.stringify(data)),
        {
          headers: {
            Authorization: "Bearer " + token
          }
        }
      )
      .then(res => {
        return res.data;
      });
  }

  diploma(data, token): Promise<any> {
    return axios
      .post(`${config.ebsiServicesApis.diplomaWallet}/diploma`, data, {
        headers: {
          Authorization: "Bearer " + token
        }
      })
      .then(res => {
        return res.data;
      });
  }
}
