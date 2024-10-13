import { ApiProperty } from '@nestjs/swagger';
import { v4 as uuidv4 } from 'uuid';

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

export class Sentiment {
  @ApiProperty()
  Sentiment: string;

  @ApiProperty({ type: SentimentScore })
  SentimentScore: SentimentScore;
}

export class Review {  
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

  constructor(partial: Partial<Review>) {
    Object.assign(this, partial);
    this.review_id = uuidv4();
    this.published_at_date = new Date().toISOString();
  }
}
