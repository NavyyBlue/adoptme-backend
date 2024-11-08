import {ApiProperty} from '@nestjs/swagger';
import {IsNotEmpty, IsString, Min} from 'class-validator';

export class CreatePetDto {
    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    name: string;

    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    weight: string;

    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    size: string;
  
    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    species: string;

    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    breed: string;

    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    age: string;

    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    gender: string;

    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    description: string;

    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    location: string;

    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    color: string;

    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    imageUrl: string;

    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    reportingUserId: string;

}