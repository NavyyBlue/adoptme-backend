import { Injectable } from '@nestjs/common';
import { FirebaseRepository } from 'src/data/firebase/firebase.repository';

@Injectable()
export class VetsService {
  private readonly collection = 'vets';

  constructor(private firebaseRepository: FirebaseRepository<any>) {}

  async getAllVets(page: number, limit: number, baseUrl: string) {
    const pageNumber = Number(page);
    const limitNumber = Number(limit);

    const offset = (pageNumber - 1) * limitNumber;
    const snapshot = await this.firebaseRepository.getAll(this.collection);
    const vetsArray = Object.values(snapshot || {});

    // Filtrar el campo detailed_reviews
    const filteredVetsArray = vetsArray.map((vet: any) => {
      const { detailed_reviews, ...rest } = vet;
      return rest;
    });

    const totalItems = filteredVetsArray.length;
    const totalPages = Math.ceil(totalItems / limitNumber);
    const paginatedItems = filteredVetsArray.slice(
      offset,
      offset + limitNumber,
    );

    // Calcular el número de la siguiente página
    const nextPage = pageNumber + 1;
    const prevPage = pageNumber - 1;

    // Generar las URLs para la siguiente y la anterior página
    const nextPageUrl =
      offset + limitNumber < totalItems
        ? `${baseUrl}?page=${nextPage}&limit=${limit}`
        : null;
    const prevPageUrl =
      pageNumber > 1 ? `${baseUrl}?page=${prevPage}&limit=${limit}` : null;

    return {
      count: totalItems,
      totalPages: totalPages,
      data: paginatedItems,
      nextPageUrl,
      prevPageUrl,
    };
  }

  async getVetById(id: string) {
    return this.firebaseRepository.getById(this.collection, id);
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

  async getDetailedReviews(
    vetId: string,
    page: number,
    limit: number,
    baseUrl: string,
  ) {
    const pageNumber = Number(page);
    const limitNumber = Number(limit);

    const offset = (pageNumber - 1) * limitNumber;
    const snapshot = await this.firebaseRepository.getSubCollection(
      this.collection,
      vetId,
      'detailed_reviews',
    );
    const detailedReviews = Object.values(snapshot || []);

    const totalItems = detailedReviews.length;
    const totalPages = Math.ceil(totalItems / limitNumber);
    const paginatedItems = detailedReviews.slice(offset, offset + limitNumber);

    // Calcular el número de la siguiente página
    const nextPage = pageNumber + 1;
    const prevPage = pageNumber - 1;

    // Generar las URLs para la siguiente y la anterior página
    const nextPageUrl =
      offset + limitNumber < totalItems
        ? `${baseUrl}?page=${nextPage}&limit=${limit}`
        : null;
    const prevPageUrl =
      pageNumber > 1 ? `${baseUrl}?page=${prevPage}&limit=${limit}` : null;

    return {
      count: totalItems,
      totalPages: totalPages,
      data: paginatedItems,
      nextPageUrl,
      prevPageUrl,
    };
  }
}
