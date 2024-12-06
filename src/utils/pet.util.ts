import { PetAge, PetColor, PetType } from 'src/enums/pet.enum';

export const getPetType = (type: string): PetType => {
  switch (type) {
    case 'Perro':
      return PetType.Dog;
    case 'Gato':
      return PetType.Cat;
    case 'Pájaro':
      return PetType.Bird;
    default:
      return PetType.Other;
  }
};

export const getPetAgeType = (age: number): PetAge => {
  if (age >= 0 && age <= 6) {
    return PetAge.Puppy;
  } else if (age >= 7 && age <= 60) {
    return PetAge.Adult;
  } else if (age >= 61) {
    return PetAge.Senior;
  }
};

export const getPetColorType = (color: string): PetColor => {
  switch (color) {
    case 'Blanco':
      return PetColor.White;
    case 'Negro':
      return PetColor.Black;
    case 'Marrón':
      return PetColor.Brown;
    case 'Gris':
      return PetColor.Gray;
    case 'Tricolor':
      return PetColor.Mixed;
  }
};
