import { ApiProperty } from '@nestjs/swagger';
import { PetAge, PetColor, PetType } from 'src/enums/pet.enum';

class WeightRange {
  @ApiProperty()
  min: number;

  @ApiProperty()
  max: number;
}

export class PetPreference {
  @ApiProperty()
  petType: PetType[];

  @ApiProperty()
  size: WeightRange;

  @ApiProperty()
  age: PetAge[];

  @ApiProperty()
  color: PetColor[];
}

export class UserProfile {
  @ApiProperty()
  userId: string;

  @ApiProperty({ type: PetPreference })
  petPreferences?: PetPreference;

  @ApiProperty()
  phoneNumber: string;

  @ApiProperty()
  studentCode?: string;

  @ApiProperty()
  faculty?: string;

  @ApiProperty()
  career?: string;

  @ApiProperty()
  photoUrl?: string;

  constructor(partial: Partial<UserProfile>) {
    Object.assign(this, partial);
  }
}
