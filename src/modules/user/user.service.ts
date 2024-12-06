import { FirebaseRepository } from '@data/firebase/firebase.repository';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { COLLECTIONS } from 'src/constants/collection.constants';
import { CreateUserProfilePayload } from './payload/create-user-profile.payload';
import { UpdateUserProfilePayload } from './payload/update-user-profile.payload';
import { UserProfile } from './user-profile.schema';
import { UserCodeScrape } from './scrape/user-code.scrape';
import { UserEmailScrape } from './scrape/user-email.scrape';
import { Student } from './dto/student.dto';

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
    userProfile.phoneNumber = this.setPhoneNumber(userProfile.phoneNumber);
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

    userProfile.phoneNumber = this.setPhoneNumber(userProfile.phoneNumber);
    await this.setStudentData(userProfile);

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

  async studentDataByCode(codigo: string) {
    const extractedStudentData = await UserCodeScrape.scrapeAlumno(codigo);

    if (!extractedStudentData) {
      throw new NotFoundException('No student data found');
    }

    return extractedStudentData;
  }

  async validateStudentEmail(email: string) {
    const extractedStudentData = await UserEmailScrape.scrapeAlumno(email);

    if (!extractedStudentData) {
      throw new NotFoundException('invalid-email');
    }

    return extractedStudentData;
  }

  private setPhoneNumber(phoneNumber: string): string {
    const peruPhoneNumberRegex = /^\+51\d{9}$/;

    if (!phoneNumber) {
      return phoneNumber;
    }

    if (peruPhoneNumberRegex.test(phoneNumber)) {
      return phoneNumber;
    }

    const formattedPhoneNumber = `+51${phoneNumber}`;
    if (peruPhoneNumberRegex.test(formattedPhoneNumber)) {
      return formattedPhoneNumber;
    }

    throw new Error('Invalid phone number format for Peru');
  }

  private async setStudentData(user: UserProfile): Promise<UserProfile> {
    if (user.studentCode) {
      const studentData = await this.studentDataByCode(user.studentCode);

      user.faculty = studentData.faculty;
      user.career = studentData.major;
      user.photoUrl = studentData.userPhoto;
    }

    return user;
  }
}
