import { ApiProperty } from '@nestjs/swagger';

export class VetResponseDto {
  @ApiProperty()
  place_id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  address: string;

  @ApiProperty()
  link: string;

  @ApiProperty()
  main_category: string;

  @ApiProperty()
  rating: number;

  @ApiProperty()
  reviews: number;
}
