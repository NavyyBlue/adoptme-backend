import { Injectable, NotFoundException } from '@nestjs/common';
import { Pet } from './pet.schema';
import { FirebaseRepository } from '@data/firebase/firebase.repository';
import { COLLECTIONS } from 'src/constants/collection.constants';
import { CreatePetDto } from './dto/create-pet.dto';
import { PetResponseDto } from './dto/pet-response.dto';

@Injectable()
export class PetsService {
  private adoptionCollection = COLLECTIONS.ADOPTION_PETS;
  private missingCollection = COLLECTIONS.MISSING_PETS;

  constructor(
    private firebaseRepository: FirebaseRepository<Pet>
  ) {}

  async createPet(petData: Partial<CreatePetDto>, isMissing: boolean | string) {
    const isMissingBoolean = isMissing === true || isMissing === 'true';
    const collection = isMissingBoolean ? this.missingCollection : this.adoptionCollection;
    const pet = new Pet(petData);
    return this.firebaseRepository.create(collection, pet.petId, pet);
  }

  async getAllPets(isMissing: boolean | string): Promise<Pet[]> {
    const isMissingBoolean = isMissing === true || isMissing === 'true';
    const collection = isMissingBoolean ? this.missingCollection : this.adoptionCollection;
    console.log(`Fetching pets from collection: ${collection}`);
    const pets = await this.firebaseRepository.getAll(collection);
    return Object.values(pets); 
  }

  async getPetById(id: string, isMissing: boolean | string): Promise<Pet> {
    const isMissingBoolean = isMissing === true || isMissing === 'true';
    const collection = isMissingBoolean ? this.missingCollection : this.adoptionCollection;
    const pet = await this.firebaseRepository.getById(collection, id);
    console.log(`Fetching pet with ID ${id} from collection: ${collection}`);
    if (!pet) {
      throw new NotFoundException(`Pet with ID ${id} not found`);
    }
    return pet;
  }

}