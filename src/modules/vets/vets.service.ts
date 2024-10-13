import { Injectable } from '@nestjs/common';
import { FirebaseRepository } from '@data/firebase/firebase.repository';
import { Pagination } from '@common/pagination';
import { COLLECTIONS } from 'src/constants/collection.constants';
import { Vet } from './vet.schema';
import { PaginationDto } from '@common/pagination.dto';
import { VetResponseDto } from './dto/vet.response.dto';

@Injectable()
export class VetsService {
  private readonly collection = COLLECTIONS.VETS;

  constructor(private firebaseRepository: FirebaseRepository<Vet>) {}

  async getAllVets(
    page: number,
    limit: number,
    baseUrl: string,
  ): Promise<PaginationDto<VetResponseDto>> {
    const snapshot = await this.firebaseRepository.getAll(this.collection);
    const vetsArray = Object.values(snapshot || {});

    // Filtrar el campo detailed_reviews
    const filteredVetsArray = vetsArray.map((vet: any) => {
      const { detailed_reviews, ...rest } = vet;
      return rest;
    });

    const pagination = new Pagination(filteredVetsArray, page, limit, baseUrl);
    return pagination.paginate();
  }

  async getVetById(id: string): Promise<VetResponseDto> {
    const snapshot = await this.firebaseRepository.getById(this.collection, id);
    const filteredVet = snapshot.detailed_reviews
      ? { ...snapshot, detailed_reviews: undefined }
      : snapshot;
    return filteredVet;
  }

  async createVet(id: string, vetData: any) {
    return this.firebaseRepository.create(this.collection, id, vetData);
  }

  async updateVet(id: string, vetData: any) {
    return this.firebaseRepository.update(this.collection, id, vetData);
  }

  async deleteVet(id: string) {
    return this.firebaseRepository.delete(this.collection, id);
  }

  async updateVetGeneralRating(vetId: string, rating: number) {
    try {
      rating = Vet.validateAndRoundRating(rating);

      const snapshot = await this.firebaseRepository.getById(
        this.collection,
        vetId,
      );
      const vet = snapshot;

      const reviewsCount = vet.reviews + 1;
      const totalRating = (vet.rating * vet.reviews + rating) / reviewsCount;

      const updatedVet = {
        ...vet,
        rating: parseFloat(totalRating.toFixed(1)),
        reviews: reviewsCount,
      };

      await this.firebaseRepository.update(this.collection, vetId, updatedVet);
    } catch (error) {
      throw new Error('Error al actualizar la veterinaria');
    }
  }
}
