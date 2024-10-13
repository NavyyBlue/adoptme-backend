
import { ApiProperty } from '@nestjs/swagger';
import { ReviewsResponseDto } from './reviews.response.dto';
import { PaginationDto } from '@common/pagination.dto';

export class ReviewsPaginationResponseDto extends PaginationDto<ReviewsResponseDto> {
  @ApiProperty({ type: [ReviewsResponseDto] })
  data: ReviewsResponseDto[];
}