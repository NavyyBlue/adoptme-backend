import { Controller, Get, Post, Put, Delete, Param, Body, Query, NotFoundException } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiQuery, ApiBody, ApiParam } from '@nestjs/swagger';
import { PetsService } from './pets.service';
import { Pet } from './pet.schema';
import { CreatePetDto } from './dto/create-pet.dto';
import { Part } from 'aws-sdk/clients/s3';
import { PetResponseDto } from './dto/pet-response.dto';

@ApiTags('pets')
@Controller('pets')
export class PetsController {
  constructor(private readonly petsService: PetsService) {}

  @Post("create")
  @ApiOperation({ summary: 'Create a new pet' })
  @ApiBody({ type: CreatePetDto })
  @ApiQuery({ name: 'isMissing', required: true, type: Boolean, description: 'Indicates if the pet is missing' })
  async createPet(
    @Body() pet: Partial<CreatePetDto>, 
  @Query('isMissing') isMissing: boolean
  ) {
    return this.petsService.createPet(pet, isMissing);
  }

  @Get("all")
  @ApiOperation({ summary: 'Get all pets' })
  @ApiQuery({ name: 'isMissing', required: true, type: Boolean, description: 'Indicates if the pets are missing' })
  async getAllPets(
    @Query('isMissing') isMissing: boolean | string
  ): Promise<{ data: PetResponseDto[] }> {
    const pets = await this.petsService.getAllPets(isMissing);
    const petResponseDtos = pets.map(pet => PetResponseDto.fromEntity(pet));
    return { data: petResponseDtos };
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a pet by ID' })
  @ApiParam({ name: 'id', required: true, description: 'The ID of the pet' })
  @ApiQuery({ name: 'isMissing', required: true, type: Boolean, description: 'Indicates if the pet is missing' })
  async getPetById(
    @Param('id') id: string,
    @Query('isMissing') isMissing: boolean | string
  ): Promise<PetResponseDto> {
    const pet = await this.petsService.getPetById(id, isMissing);
    return PetResponseDto.fromEntity(pet);
  }

}