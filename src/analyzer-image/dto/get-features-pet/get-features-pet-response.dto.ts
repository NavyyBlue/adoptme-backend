import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, IsObject } from 'class-validator';
import { PetDataDto } from '../pet-data/pet-data.dto';

export class GetFeaturesPetDto {
  @ApiProperty({
    description: 'The status of the response',
    example: 200,
  })
  @IsNotEmpty()
  @IsNumber()
  readonly status: number;

  @ApiProperty({
    description: 'The data of the pet features',
    type: PetDataDto,
  })
  @IsNotEmpty()
  @IsObject()
  readonly data: PetDataDto;

  @ApiProperty({
    description: 'The URL of the image',
    example: 'http://example.com/image.jpg',
  })
  @IsNotEmpty()
  @IsString()
  readonly imageUrl: string;
}