import { ApiProperty } from '@nestjs/swagger';
import { v4 as uuidv4 } from 'uuid';

export class Pet {
  @ApiProperty()
  petId: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  weight: string;

  @ApiProperty()
  size: string;

  @ApiProperty()
  species: string;

  @ApiProperty()
  breed: string;

  @ApiProperty()
  age: string;

  @ApiProperty()
  gender: string;

  @ApiProperty()
  location: string;

  @ApiProperty()
  description?: string;

  @ApiProperty()
  color: string;

  @ApiProperty()
  imageUrl: string;

  @ApiProperty()
  reportingUserId: string;

  @ApiProperty()
  adoptingUserId?: string;

  constructor(partial: Partial<Pet>) {
    Object.assign(this, partial);
    this.petId = uuidv4();
  }
}