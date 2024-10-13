import { Pagination } from '@common/pagination';
import { FirebaseRepository } from '@data/firebase/firebase.repository';
import { BadRequestException, Injectable } from '@nestjs/common';
import { COLLECTIONS } from 'src/constants/collection.constants';
import { ReviewsResponseDto } from './dto/reviews.response.dto';
import { Review } from './reviews.schema';
import { PaginationDto } from '@common/pagination.dto';
import { ReviewsRequestDto } from './dto/reviews.request.dto';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { ConfigService } from '@nestjs/config';
import { VetsService } from '@modules/vets/vets.service';

@Injectable()
export class ReviewsService {
  private readonly vetCollection = COLLECTIONS.VETS;
  private readonly reviewCollection = COLLECTIONS.REVIEWS;
  private readonly fastApiBaseUrl: string;
  private readonly fastApiSentimentEndpoint: string =
    '/reviews/get_sentiment_review/';

  constructor(
    private firebaseRepository: FirebaseRepository<Review>,
    private readonly httpService: HttpService,
    private configService: ConfigService,
    private vetService: VetsService,
  ) {
    this.fastApiBaseUrl = this.configService.get<string>('FASTAPI_BASE_URL');
  }

  async getReviewsByVet(
    vetId: string,
    page: number,
    limit: number,
    baseUrl: string,
  ): Promise<PaginationDto<ReviewsResponseDto>> {
    const snapshot = await this.firebaseRepository.getSubCollection(
      this.vetCollection,
      vetId,
      this.reviewCollection,
    );
    const reviewsArray = Object.values(snapshot || {});

    // Ordenar las reseñas por published_at_date de manera descendente
    reviewsArray.sort((a: Review, b: Review) => {
      return (
        new Date(b.published_at_date).getTime() -
        new Date(a.published_at_date).getTime()
      );
    });

    // Mapear los datos para extraer solo los campos necesarios
    const filteredReviewsArray = reviewsArray.map((review: Review) => {
      const {
        review_id,
        rating,
        review_translated_text,
        published_at_date,
        sentiment,
      } = review;
      return {
        review_id,
        rating,
        review_translated_text,
        published_at_date,
        sentiment: sentiment?.Sentiment ?? null,
      } as ReviewsResponseDto;
    });

    const pagination = new Pagination(
      filteredReviewsArray,
      page,
      limit,
      baseUrl,
    );
    return pagination.paginate();
  }

  async createReview(
    vetId: string,
    reviewData: Partial<ReviewsRequestDto>,
  ): Promise<ReviewsResponseDto> {
    let reviewResponse: ReviewsResponseDto;

    try {
      if (reviewData?.review_translated_text?.length > 0) {
        const review = new Review(reviewData);

        // Obtener el sentimiento de la reseña
        const sentiment = await this.getSentimentReview(
          review.review_translated_text,
        );
        review.sentiment = sentiment;

        // Agregar la nueva reseña al veterinario
        await this.firebaseRepository.createSubCollection(
          this.vetCollection,
          vetId,
          this.reviewCollection,
          review,
        );

        reviewResponse = {
          review_id: review.review_id,
          rating: review.rating,
          review_translated_text: review.review_translated_text,
          published_at_date: review.published_at_date,
          sentiment: sentiment?.Sentiment ?? null,
        } as ReviewsResponseDto;
      }

      // Actualizar el rating general del veterinario
      await this.vetService.updateVetGeneralRating(vetId, reviewData.rating);
    } catch (error) {
      throw new BadRequestException(error.message);
    }

    return reviewResponse;
  }

  async getSentimentReview(text: string): Promise<any> {
    try {
      const url = `${this.fastApiBaseUrl}${this.fastApiSentimentEndpoint}`;
      const body = {
        text: text,
      };

      const response = await firstValueFrom(this.httpService.post(url, body));
      return response.data;
    } catch (error) {
      throw new Error('Error al obtener el sentimiento de la reseña');
    }
  }
}
