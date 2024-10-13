import { ApiProperty } from "@nestjs/swagger";

export class ReviewsResponseDto {
  @ApiProperty()
  review_id: string;

  @ApiProperty()
  rating: number;

  @ApiProperty()
  review_translated_text: string;

  @ApiProperty()
  published_at_date: string;

  @ApiProperty()
  sentiment: string;
}