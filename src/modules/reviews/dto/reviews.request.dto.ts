import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  Max,
  Min
} from 'class-validator';

export class ReviewsRequestDto {
  @IsNotEmpty()
  @Min(1)
  @Max(5)
  @ApiProperty()
  rating: number;

  @IsString()
  @ApiProperty()
  review_translated_text?: string;
}
