import { ApiProperty } from '@nestjs/swagger';
import { PetAge, PetColor, PetType } from 'src/enums/pet.enum';
import { WeightRange } from '../preferences.schema';

export class PreferencesRequestDto {
  @ApiProperty()
  petType?: PetType[];

  @ApiProperty()
  size?: WeightRange[];

  @ApiProperty()
  age?: PetAge[];

  @ApiProperty()
  color?: PetColor[];
}
