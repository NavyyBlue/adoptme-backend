import { ApiProperty } from '@nestjs/swagger';
import { Review } from '@modules/reviews/reviews.schema';

export class Vet {
  @ApiProperty()
  place_id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  rating: number;

  @ApiProperty()
  reviews: number;

  @ApiProperty()
  main_category: string;

  @ApiProperty()
  address: string;

  @ApiProperty()
  link: string;

  @ApiProperty({ type: [Review] })
  detailed_reviews: Review[];

  static validateAndRoundRating(rating: number): number {
    if (rating < 1 || rating > 5) {
      throw new Error('El rating debe estar entre 1 y 5');
    }
    return parseFloat(rating.toFixed(1));
  }
}
