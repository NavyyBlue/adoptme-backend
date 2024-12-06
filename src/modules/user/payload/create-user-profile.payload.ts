import { ApiProperty } from '@nestjs/swagger';

export class CreateUserProfilePayload {
  @ApiProperty()
  userId: string;

  @ApiProperty()
  phoneNumber?: string;
}
