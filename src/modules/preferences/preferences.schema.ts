import { ApiProperty } from '@nestjs/swagger';
import { PetAge, PetColor, PetType } from 'src/enums/pet.enum';

export class WeightRange {
  @ApiProperty()
  min: number;

  @ApiProperty()
  max: number;
}

export class PetPreference {
  @ApiProperty()
  petType?: PetType[];

  @ApiProperty()
  size?: WeightRange[];

  @ApiProperty()
  age?: PetAge[];

  @ApiProperty()
  color?: PetColor[];  
}
