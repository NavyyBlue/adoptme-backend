import { ApiProperty } from '@nestjs/swagger';
import { PetPreference } from '../user-profile.schema';

export class CreateUserProfilePayload {
  @ApiProperty()
  userId: string;

  @ApiProperty()
  phoneNumber?: string;
}
