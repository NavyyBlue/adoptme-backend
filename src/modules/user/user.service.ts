import { FirebaseRepository } from '@data/firebase/firebase.repository';
import { BadRequestException, Injectable } from '@nestjs/common';
import { COLLECTIONS } from 'src/constants/collection.constants';
import { CreateUserProfilePayload } from './payload/create-user-profile.payload';
import { UpdateUserProfilePayload } from './payload/update-user-profile.payload';
import { UserProfile } from './user-profile.schema';

@Injectable()
export class UserService {
  private userProfileCollection = COLLECTIONS.USER_PROFILE;

  constructor(private firebaseRepository: FirebaseRepository<UserProfile>) {}

  async createUserProfile(payload: Partial<CreateUserProfilePayload>) {
    // Check if the user already has a profile
    const profile = await this.firebaseRepository.getById(
      this.userProfileCollection,
      payload.userId,
    );

    if (profile) {
      throw new BadRequestException('User already has a profile');
    }

    // Create the user profile and save it in the database
    const userProfile = new UserProfile(payload);
    await this.firebaseRepository.create(
      this.userProfileCollection,
      payload.userId,
      userProfile,
    );

    return userProfile;
  }

  async updateUserProfile(
    userId: string,
    payload: Partial<UpdateUserProfilePayload>,
  ) {
    const userProfile = new UserProfile(payload);
    await this.firebaseRepository.update(
      this.userProfileCollection,
      userId,
      userProfile,
    );
    const updatedUserProfile = await this.firebaseRepository.getById(
      this.userProfileCollection,
      userId,
    );
    return updatedUserProfile;
  }

  async getUserProfile(userId: string) {
    return this.firebaseRepository.getById(this.userProfileCollection, userId);
  }

  async deleteUserProfile(userId: string) {
    await this.firebaseRepository.delete(this.userProfileCollection, userId);
  }
}
