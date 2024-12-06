import { Injectable, NotFoundException } from '@nestjs/common';
import { Pet } from './pet.schema';
import { FirebaseRepository } from '@data/firebase/firebase.repository';
import { COLLECTIONS } from 'src/constants/collection.constants';
import { CreatePetDto } from './dto/create-pet.dto';
import { PetResponseDto } from './dto/pet-response.dto';
import { UserService } from '@modules/user/user.service';
import { getPetAgeType, getPetColorType, getPetType } from 'src/utils/pet.util';

@Injectable()
export class PetsService {
  private adoptionCollection = COLLECTIONS.ADOPTION_PETS;
  private missingCollection = COLLECTIONS.MISSING_PETS;

  constructor(
    private firebaseRepository: FirebaseRepository<Pet>,
    private userProfileService: UserService,
  ) {}

  async createPet(petData: Partial<CreatePetDto>, isMissing: boolean | string) {
    const isMissingBoolean = isMissing === true || isMissing === 'true';
    const collection = isMissingBoolean
      ? this.missingCollection
      : this.adoptionCollection;
    const pet = new Pet(petData);
    return this.firebaseRepository.create(collection, pet.petId, pet);
  }

  async getAllPets(
    isMissing: boolean | string,
    userId: string,
  ): Promise<Pet[]> {
    const profile = await this.userProfileService.getUserProfile(userId);
    const petPreferences = profile.petPreferences;
    const isMissingBoolean = isMissing === true || isMissing === 'true';
    const collection = isMissingBoolean
      ? this.missingCollection
      : this.adoptionCollection;
    const pets = await this.firebaseRepository.getAll(collection);
    const petsArray = Object.values(pets);

    if (petPreferences) {
      const { petType, age, color } = petPreferences;

      petsArray.sort((a, b) => {
        let scoreA = 0;
        let scoreB = 0;

        // Comparar tipo de mascota
        if (petType) {
          if (petType.includes(getPetType(a.species))) scoreA++;
          if (petType.includes(getPetType(b.species))) scoreB++;
        }

        // Comparar edad de mascota
        if (age) {
          if (age.includes(getPetAgeType(Number(a.age)))) scoreA++;
          if (age.includes(getPetAgeType(Number(b.age)))) scoreB++;
        }

        // Comparar color de mascota
        if (color) {
          if (color.includes(getPetColorType(a.color))) scoreA++;
          if (color.includes(getPetColorType(b.color))) scoreB++;
        }

        return scoreB - scoreA; // Ordenar de mayor a menor puntuación
      });
    }

    return petsArray;
  }

  async getPetById(id: string, isMissing: boolean | string): Promise<Pet> {
    const isMissingBoolean = isMissing === true || isMissing === 'true';
    const collection = isMissingBoolean
      ? this.missingCollection
      : this.adoptionCollection;
    const pet = await this.firebaseRepository.getById(collection, id);
    console.log(`Fetching pet with ID ${id} from collection: ${collection}`);
    if (!pet) {
      throw new NotFoundException(`Pet with ID ${id} not found`);
    }
    return pet;
  }
}
