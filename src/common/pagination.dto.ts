import { ApiProperty } from '@nestjs/swagger';

export class PaginationDto<T> {
  @ApiProperty()
  count: number;

  @ApiProperty()
  totalPages: number;

  @ApiProperty({ type: () => [Object] })
  data: T[];

  @ApiProperty()
  nextPageUrl: string | null;

  @ApiProperty()
  prevPageUrl: string | null;
}
