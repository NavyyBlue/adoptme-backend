import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  MaxLength,
  MinLength,
  Matches,
  IsEnum,
  IsAlpha,
  IsNumber,
  IsPhoneNumber,
} from 'class-validator';

enum Permissions {
  ADMIN = 'ADMIN',
  USER = 'USER',
}

export class UserDto {
  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(20)
  @Matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,20}$/, {
    message: 'password too weak',
  })
  password: string;

  @ApiProperty()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(20)
  @IsAlpha()
  firstName: string;

  @ApiProperty()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(20)
  @IsAlpha()
  lastName: string;

  @ApiProperty()
  @IsNotEmpty()
  @MaxLength(8)    
  studentCode: string;

  @ApiProperty()    
  @IsPhoneNumber('PE')
  phone: string;

  @ApiProperty({ enum: Permissions, enumName: 'Permissions', default: [Permissions.USER] })
  @IsNotEmpty()
  @IsEnum(Permissions, { each: true })  
  permissions: Permissions[] = [Permissions.USER];
}
