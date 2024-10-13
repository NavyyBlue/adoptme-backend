import { ApiProperty } from '@nestjs/swagger';
import { PaginationDto } from '@common/pagination.dto';
import { VetResponseDto } from './vet.response.dto';

export class VetPaginationResponseDto extends PaginationDto<VetResponseDto> {
  @ApiProperty({ type: [VetResponseDto] })
  data: VetResponseDto[];
}