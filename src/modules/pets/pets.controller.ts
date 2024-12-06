import { Controller, Get, Post, Put, Delete, Param, Body, Query, NotFoundException, Req } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiQuery, ApiBody, ApiParam, ApiBearerAuth } from '@nestjs/swagger';
import { PetsService } from './pets.service';
import { Pet } from './pet.schema';
import { CreatePetDto } from './dto/create-pet.dto';
import { Part } from 'aws-sdk/clients/s3';
import { PetResponseDto } from './dto/pet-response.dto';
import { Auth } from '@guards/auth.decorator';

@ApiBearerAuth()
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
  @ApiQuery({ name: 'breed', required: false, type: String, description: 'Breed of the pet' })
  @ApiQuery({ name: 'weight', required: false, type: String, description: 'Weight of the pet' })
  @ApiQuery({ name: 'size', required: false, type: String, description: 'Size of the pet' })
  @ApiQuery({ name: 'age', required: false, type: String, description: 'Age of the pet' })
  @ApiQuery({ name: 'color', required: false, type: String, description: 'Color of the pet' })
  @ApiQuery({ name: 'species', required: false, type: String, description: 'Species of the pet' })
  @Auth()
  async getAllPets(
    @Req() req,
    @Query('isMissing') isMissing: boolean | string,
    @Query('breed') breed?: string,
    @Query('weight') weight?: string,
    @Query('size') size?: string,
    @Query('age') age?: string,
    @Query('color') color?: string,
    @Query('species') species?: string
  ): Promise<{ data: PetResponseDto[] }> {
    const userId = req.user.uid;

    const filters = { breed, weight, size, age, color, species };
    const pets = await this.petsService.getAllPets(isMissing, userId, filters);
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