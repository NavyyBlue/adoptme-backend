import { ApiProperty } from '@nestjs/swagger';

class SentimentScore {
  @ApiProperty()
  Mixed: number;

  @ApiProperty()
  Negative: number;

  @ApiProperty()
  Neutral: number;

  @ApiProperty()
  Positive: number;
}

class Sentiment {
  @ApiProperty()
  Sentiment: string;

  @ApiProperty({ type: SentimentScore })
  SentimentScore: SentimentScore;
}

class Review {
  @ApiProperty()
  review_id: string;

  @ApiProperty()
  rating: number;

  @ApiProperty()
  review_translated_text: string;

  @ApiProperty()
  published_at_date: string;

  @ApiProperty({ type: Sentiment })
  sentiment: Sentiment;
}

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
}
