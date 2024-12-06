import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import { R2Service } from '@modules/r2/r2.service';
import { GetFeaturesPetDto } from './dto/get-features-pet/get-features-pet-response.dto';
import { PetDataDto } from './dto/pet-data/pet-data.dto';
import { ComparePetsResponseDto } from './dto/compare-pets/compare-pets-response.dto';


@Injectable()
export class AnalyzerImageService {
  private readonly fastApiBaseUrl: string;
  private readonly getPetFeaturesEndpoint: string;
  private readonly compareImagesEndpoint: string;

  constructor(
    private readonly r2Service: R2Service,
    private readonly configService: ConfigService
  ) {
    this.fastApiBaseUrl = this.configService.get<string>('FASTAPI_BASE_URL');
    this.getPetFeaturesEndpoint = this.configService.get<string>('FASTAPI_GET_PET_FEATURES_ENDPOINT');
    this.compareImagesEndpoint = this.configService.get<string>('FASTAPI_COMPARE_IMAGES_ENDPOINT');
  }

  async analyzeImage(fileString: string, filename: string): Promise<GetFeaturesPetDto> {
    const uploadResponse = await this.r2Service.uploadFile(fileString, filename);

    const petFeatures = await this.getPetFeaturesFastAPI(uploadResponse.imageUrl);

    
    if (petFeatures.status !== 200 || !petFeatures.data) {

        await this.r2Service.deleteFile(filename);
      throw new HttpException('Invalid response from FastAPI', HttpStatus.BAD_REQUEST);
    }

    const petData: PetDataDto = {
      species: petFeatures.data.species,
      breed: petFeatures.data.breed,
      age: petFeatures.data.age,
      weight: petFeatures.data.weight,
      color: petFeatures.data.color,
      size: petFeatures.data.size,
    };

    const getFeaturesPetDto: GetFeaturesPetDto = {
      status: petFeatures.status,
      data: petData,
      imageUrl: uploadResponse.imageUrl,
    };

    return getFeaturesPetDto;
  }

  async getPetFeaturesFastAPI(imageUrl: string): Promise<any> {
    const response = await axios.post(`${this.fastApiBaseUrl}${this.getPetFeaturesEndpoint}`, {
      prompt: imageUrl,
      max_tokens: 300,
    });

    return response.data;
  }

  async compareImages(fileString: string, filename: string, imageUrl: string): Promise<ComparePetsResponseDto> {

    const uploadResponse = await this.r2Service.uploadFile(fileString, filename);

    const compareResponse = await this.compareImagesFastAPI(uploadResponse.imageUrl, imageUrl);

    if (compareResponse.status === 400) {
        await this.r2Service.deleteFile(filename);
    } else if (compareResponse.status === 422) {
        await this.r2Service.deleteFile(filename);
    }

    console.log('compareResponse', compareResponse);
    const comparePetsResponseDto: ComparePetsResponseDto = {
        status: compareResponse.status,
        message: compareResponse.message,
        imageUrl: uploadResponse.imageUrl,
    };
    
    return comparePetsResponseDto;
  }


  async compareImagesFastAPI(uploadedImageUrl: string, imageUrl: string): Promise<any> {
    const response = await axios.post(`${this.fastApiBaseUrl}${this.compareImagesEndpoint}`, {
      image_url_1: uploadedImageUrl,
      image_url_2: imageUrl,
      max_tokens: 300,
    });

    return response.data;
  }

}