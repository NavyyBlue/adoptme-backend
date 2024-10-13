import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class PetDataDto {
  @ApiProperty({
    description: 'The species of the pet',
    example: 'Duck',
  })
  @IsNotEmpty()
  @IsString()
  readonly species: string;

  @ApiProperty({
    description: 'The breed of the pet',
    example: 'Domestic Duck (Pekin)',
  })
  @IsNotEmpty()
  @IsString()
  readonly breed: string;

  @ApiProperty({
    description: 'The approximate age of the pet',
    example: 2,
  })
  @IsNotEmpty()
  @IsNumber()
  readonly age: number;

  @ApiProperty({
    description: 'The weight of the pet in kilograms',
    example: 4,
  })
  @IsNotEmpty()
  @IsNumber()
  readonly weight: number;

  @ApiProperty({
    description: 'The color of the pet',
    example: 'White',
  })
  @IsNotEmpty()
  @IsString()
  readonly color: string;

  @ApiProperty({
    description: 'The size of the pet',
    example: 'Medium',
  })
  @IsNotEmpty()
  @IsString()
  readonly size: string;
}