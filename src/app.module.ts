import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AnalyzerImageModule } from './analyzer-image/analyzer-image.module';
import { R2Module } from './r2/r2.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AnalyzerImageModule,
    R2Module,
  ],
})
export class AppModule {}