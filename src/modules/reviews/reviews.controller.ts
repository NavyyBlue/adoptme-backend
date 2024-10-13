import { Body, Controller, Get, Param, Post, Query, Req } from '@nestjs/common';
import { ApiBody, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { ReviewsPaginationResponseDto } from './dto/reviews.pagination.response.dto';
import { ReviewsRequestDto } from './dto/reviews.request.dto';
import { ReviewsService } from './reviews.service';
import { ReviewsResponseDto } from './dto/reviews.response.dto';

@ApiTags('reviews')
@Controller('reviews')
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @Get('vet/:vetId')
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @ApiResponse({
    status: 200,
    description: 'Lista de reseñas de la veterinaria',
    type: ReviewsPaginationResponseDto,
    isArray: true,
  })
  async getReviewsByVet(
    @Param('vetId') vetId: string,
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
    @Req() request: Request,
  ) {
    const baseUrl = `${request.protocol}://${request.get('host')}${request.path}`;
    return this.reviewsService.getReviewsByVet(vetId, page, limit, baseUrl);
  }

  @Post('vet/:vetId')
  @ApiBody({ type: ReviewsRequestDto })
  @ApiResponse({
    status: 201,
    description: 'La reseña ha sido creada',
    type: ReviewsResponseDto,
  })
  async createReview(
    @Param('vetId') vetId: string,
    @Body() reviewData: Partial<ReviewsRequestDto>,
  ) {
    return this.reviewsService.createReview(vetId, reviewData);
  }
}
