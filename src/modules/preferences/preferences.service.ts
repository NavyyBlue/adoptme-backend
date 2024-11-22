import { FirebaseRepository } from '@data/firebase/firebase.repository';
import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { PetPreference } from './preferences.schema';
import { COLLECTIONS } from 'src/constants/collection.constants';
import { PreferencesRequestDto } from './dto/preferences.request.dto';

@Injectable()
export class PreferencesService {
  private userProfileCollection = COLLECTIONS.USER_PROFILE;
  private preferencesCollection = COLLECTIONS.PREFERENCES;
  constructor(private firebaseRepository: FirebaseRepository<PetPreference>) {}

  async createPreferences(
    userId: string,
    preferencesData: Partial<PreferencesRequestDto>,
  ) {
    //Validate if the user already has preferences, if so, return an error
    const userPreferences = await this.getPreferences(userId);

    if (userPreferences) {
      throw new BadRequestException('User already has preferences');
    }

    //Create the preferences collection in the user profile collection    
    await this.firebaseRepository.createSubCollectionWithoutId(
      this.userProfileCollection,
      userId,
      this.preferencesCollection,
      preferencesData,
    );

    return preferencesData;
  }

  async updatePreferences(
    userId: string,
    preferencesData: Partial<PreferencesRequestDto>,
  ) {    
    await this.firebaseRepository.updateEntireSubCollection(
      this.userProfileCollection,
      userId,
      this.preferencesCollection,
      preferencesData,
    );

    // Retrieve the updated object from the database
    const updatedPreferences = await this.getPreferences(userId);

    return updatedPreferences;
  }

  async getPreferences(userId: string) {
    return await this.firebaseRepository.getSubCollection(
      this.userProfileCollection,
      userId,
      this.preferencesCollection,
    );
  }

  async removePreferences(userId: string) {
    await this.firebaseRepository.removeEntireSubCollection(
      this.userProfileCollection,
      userId,
      this.preferencesCollection,
    );
  }
}
