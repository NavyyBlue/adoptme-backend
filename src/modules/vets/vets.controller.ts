import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  Query,
  Req,
} from '@nestjs/common';
import { Request } from 'express';
import { ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { VetsService } from './vets.service';
import { VetPaginationResponseDto } from './dto/vet.pagination.response.dto';

@ApiTags('vets')
@Controller('vets')
export class VetsController {
  constructor(private readonly vetsService: VetsService) {}

  @Get()
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @ApiResponse({
    status: 200,
    description: 'Lista de reseñas de la veterinaria',
    type: VetPaginationResponseDto,
    isArray: true,
  })
  async getAllVets(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
    @Req() request: Request,
  ) {
    const baseUrl = `${request.protocol}://${request.get('host')}${request.path}`;
    return this.vetsService.getAllVets(page, limit, baseUrl);
  }

  @Get(':id')
  async getVetById(@Param('id') id: string) {
    return this.vetsService.getVetById(id);
  }

  @Post()
  async createVet(@Body() vetData: any) {
    const id = this.generateId(); // Implementa tu lógica para generar un ID único
    return this.vetsService.createVet(id, vetData);
  }

  @Put(':id')
  async updateVet(@Param('id') id: string, @Body() vetData: any) {
    return this.vetsService.updateVet(id, vetData);
  }

  @Delete(':id')
  async deleteVet(@Param('id') id: string) {
    return this.vetsService.deleteVet(id);
  }

  private generateId(): string {
    // Implementa tu lógica para generar un ID único
    return Math.random().toString(36).substr(2, 9);
  }
}
