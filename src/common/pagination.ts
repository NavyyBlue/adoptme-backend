import { PaginationDto } from './pagination.dto';

export class Pagination<T> {
  constructor(
    private readonly items: T[],
    private readonly page: number,
    private readonly limit: number,
    private readonly baseUrl: string,
  ) {}

  paginate(): PaginationDto<T> {
    const pageNumber = Number(this.page);
    const limitNumber = Number(this.limit);

    const offset = (pageNumber - 1) * limitNumber;
    const totalItems = this.items.length;
    const totalPages = Math.ceil(totalItems / limitNumber);
    const paginatedItems = this.items.slice(offset, offset + limitNumber);

    const nextPage = pageNumber + 1;
    const prevPage = pageNumber - 1;

    const nextPageUrl =
      offset + limitNumber < totalItems
        ? `${this.baseUrl}?page=${nextPage}&limit=${limitNumber}`
        : null;
    const prevPageUrl =
      pageNumber > 1
        ? `${this.baseUrl}?page=${prevPage}&limit=${limitNumber}`
        : null;

    return {
      count: totalItems,
      totalPages,
      data: paginatedItems,
      nextPageUrl,
      prevPageUrl,
    };
  }
}
