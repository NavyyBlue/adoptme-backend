import { ApiProperty } from '@nestjs/swagger';
import { IsEmpty, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class ComparePetsResponseDto {
  @ApiProperty({
    description: 'The status of the comparison response',
    example: 200,
  })
  @IsNotEmpty()
  @IsNumber()
  readonly status: number;

  @ApiProperty({
    description: 'The message of the comparison response',
    example: 'Images are similar',
  })
  @IsNotEmpty()
  @IsString()
  readonly message: string;

  @ApiProperty({
    description: 'Image url',
    example: 'https://example.com/image.jpg',
  })
  @IsEmpty()
  readonly imageUrl?: string;

}