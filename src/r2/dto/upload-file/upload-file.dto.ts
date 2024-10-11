import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UploadFileDto {
  @ApiProperty({
    description: 'El nombre del archivo que se va a guardar',
    example: 'example.jpg',
  })
  @IsNotEmpty()
  @IsString()
  readonly filename: string;

  @ApiProperty({
    description: 'Los datos del archivo en forma de bytes',
    type: 'string',
    format: 'binary',
  })
  @IsNotEmpty()
  readonly file: string; 
}
