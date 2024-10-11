import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { PetDataDto } from '../pet-data/pet-data.dto'; // Importa el DTO PetDataDto

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
  })
  @IsNotEmpty()
  readonly data: PetDataDto; // Usa PetDataDto como tipo para data
}