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
    @IsUrl()
    @IsNotEmpty()
    @IsDefined()
    @ApiProperty()
    serviceEndpoint: string;
}
