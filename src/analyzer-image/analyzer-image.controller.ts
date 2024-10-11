import { Controller, Post, Body, HttpStatus, HttpException } from '@nestjs/common';
import { AnalyzerImageService } from './analyzer-image.service';
import { UploadFileDto } from '../r2/dto/upload-file/upload-file.dto';
import { GetFeaturesPetDto } from '../analyzer-image/dto/get-features-pet/get-features-pet-response.dto';
import { CompareImagesDto } from './dto/compare-pets/compare-images.dto';
import { ComparePetsResponseDto } from './dto/compare-pets/compare-pets-response.dto';

@Controller('analyzer-image')
export class AnalyzerImageController {
  constructor(private readonly analyzerImageService: AnalyzerImageService) {}

  @Post('get-peatures-pet')
  async getFeaturesPet(@Body() uploadFileDto: UploadFileDto): Promise<GetFeaturesPetDto> {
    const { filename, file } = uploadFileDto;
    return this.analyzerImageService.analyzeImage(file, filename);
  }

  @Post('compare-pets')
  async compareImages(@Body() compareImagesDto: CompareImagesDto): Promise<ComparePetsResponseDto> {
    const { filename, file, imageUrl } = compareImagesDto;
    return await this.analyzerImageService.compareImages(file, filename, imageUrl);

  }
}