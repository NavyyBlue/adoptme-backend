import { ApiProperty } from '@nestjs/swagger';
import { PetPreference } from '../user-profile.schema';

export class UpdateUserProfilePayload {
  @ApiProperty()
  userId: string;

  @ApiProperty({ type: PetPreference })
  petPreferences?: PetPreference;

  @ApiProperty()
  phoneNumber?: string;

  @ApiProperty()
  studentCode?: string;

  @ApiProperty()
  faculty?: string;

  @ApiProperty()
  career?: string;

  @ApiProperty()
  photoUrl?: string;
}
