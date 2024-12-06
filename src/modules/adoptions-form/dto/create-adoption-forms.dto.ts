import {ApiProperty} from '@nestjs/swagger';
import {IsNotEmpty, IsString, Min} from 'class-validator';

export class CreateAdoptionFormsDto {
    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    name: string;

    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    lastName: string;

    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    email: string;

    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    phone: string;

    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    address: string;

    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    dni: string;

    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    petId: string;
}