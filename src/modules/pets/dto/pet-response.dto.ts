import { ApiProperty } from '@nestjs/swagger';
import { Pet } from '../pet.schema';

export class PetResponseDto {
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
  gender: string;

  @ApiProperty()
  age: string;

  @ApiProperty()
  location: string;

  @ApiProperty()
  description?: string;

  @ApiProperty()
  color: string;

  @ApiProperty()
  imageUrl: string;

  @ApiProperty()
  petId: string;

  static fromEntity(pet: Pet): PetResponseDto {
    const dto = new PetResponseDto();
    dto.name = pet.name;
    dto.weight = pet.weight;
    dto.size = pet.size;
    dto.species = pet.species;
    dto.breed = pet.breed;
    dto.age = pet.age;
    dto.gender = pet.gender;
    dto.location = pet.location;
    dto.description = pet.description;
    dto.color = pet.color;
    dto.imageUrl = pet.imageUrl;
    dto.petId = pet.petId;
    return dto;
  }
}