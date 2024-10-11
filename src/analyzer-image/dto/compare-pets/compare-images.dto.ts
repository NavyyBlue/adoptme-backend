import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CompareImagesDto {
  @ApiProperty({
    description: 'The filename of the image to be uploaded',
    example: 'image1.jpg',
  })
  @IsNotEmpty()
  @IsString()
  readonly filename: string;

  @ApiProperty({
    description: 'The base64 string of the image to be uploaded',
    example: 'data:image/jpeg;base64,...',
  })
  @IsNotEmpty()
  @IsString()
  readonly file: string;

  @ApiProperty({
    description: 'The URL of the image to compare against',
    example: 'http://example.com/image2.jpg',
  })
  @IsNotEmpty()
  @IsString()
  readonly imageUrl: string;
}