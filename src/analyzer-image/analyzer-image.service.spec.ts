import { Test, TestingModule } from '@nestjs/testing';
import { AnalyzerImageService } from './analyzer-image.service';

describe('AnalyzerImageService', () => {
  let service: AnalyzerImageService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AnalyzerImageService],
    }).compile();

    service = module.get<AnalyzerImageService>(AnalyzerImageService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
