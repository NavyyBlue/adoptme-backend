import { Test, TestingModule } from '@nestjs/testing';
import { AnalyzerImageController } from './analyzer-image.controller';

describe('AnalyzerImageController', () => {
  let controller: AnalyzerImageController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AnalyzerImageController],
    }).compile();

    controller = module.get<AnalyzerImageController>(AnalyzerImageController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
