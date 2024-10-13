import { UploadFileDto } from '@modules/r2/dto/upload-file/upload-file.dto';
import { Body, Controller, Post } from '@nestjs/common';
import { AnalyzerImageService } from './analyzer-image.service';
import { CompareImagesDto } from './dto/compare-pets/compare-images.dto';
import { ComparePetsResponseDto } from './dto/compare-pets/compare-pets-response.dto';
import { GetFeaturesPetDto } from './dto/get-features-pet/get-features-pet-response.dto';

@Controller('analyzer-image')
export class AnalyzerImageController {
  constructor(private readonly analyzerImageService: AnalyzerImageService) {}

  @Post('get-features-pet')
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