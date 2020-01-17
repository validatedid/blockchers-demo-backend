import {Injectable} from '@nestjs/common';
import axios from 'axios';

import config from './config';

@Injectable()
export class ApiService {
    async generateTokenForSpanishUniversity() {
        const response = await axios.post(`${config.ebsiServicesApis.wallet}/wallet/token`, {
            'enterpriseName': 'Spanish University 16-01',
            'nonce': '10' //rand
        });

        const jwt = response.data.jwt;

        return axios.get(`${config.ebsiServicesApis.wallet}/wallet/login`, {
            headers: {
                'Authorization': 'Bearer ' + jwt
            }
        }).then((response) => {
            return response.data.jwt;
        });
    }

    async generateTokenForFlemishGov() {
        const response = await axios.post(`${config.ebsiServicesApis.wallet}/wallet/token`, {
            'enterpriseName': 'Flemish Government 16-01',
            'nonce': '10' //rand
        });

        const jwt = response.data.jwt;

        return axios.get(`${config.ebsiServicesApis.wallet}/wallet/login`, {
            headers: {
                Authorization: 'Bearer ' + jwt.trim()
            }
        }).then((response) => {
            return response.data.jwt
        });
    }

    getVP(serviceEndpoint: string, token: string) {
        return axios.get(serviceEndpoint, {
            headers: {
                Authorization: 'Bearer ' + token
            }
        }).then((res) => {
            return res.data;
        });
    }

    presentationValidation(data, token) {
        return axios.post(`${config.ebsiServicesApis.diplomaWallet}/diploma/presentation/validation`, JSON.parse(JSON.stringify(data)), {
            headers: {
                Authorization: 'Bearer ' + token
            }
        }).then((response) => {
            return response.data;
        });
    }

    diploma(data, token) {
        return axios.post(`${config.ebsiServicesApis.diplomaWallet}/diploma`, data, {
            headers: {
                Authorization: 'Bearer ' + token
            }
        }).then((res) => {
            return res.data;
        });
    }
}
