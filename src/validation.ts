import {IsDefined, IsNotEmpty, IsString, IsUrl} from 'class-validator';
import {ApiProperty} from '@nestjs/swagger';

export class DIDBody {
    @IsString()
    @IsNotEmpty()
    @IsDefined()
    @ApiProperty()
    did: string;
}

export class ServiceEndpointBody {
    @IsUrl({ require_tld: false})
    @IsNotEmpty()
    @IsDefined()
    @ApiProperty()
    serviceEndpoint: string;
}
