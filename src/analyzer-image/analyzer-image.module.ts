import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AnalyzerImageService } from './analyzer-image.service';
import { AnalyzerImageController } from './analyzer-image.controller';
import { R2Module } from '../r2/r2.module';

@Module({
  imports: [ConfigModule, R2Module],
  providers: [AnalyzerImageService],
  controllers: [AnalyzerImageController],
})
export class AnalyzerImageModule {}