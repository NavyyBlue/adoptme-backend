import { Module } from '@nestjs/common';
import { PetsService } from './pets.service';
import { PetsController } from './pets.controller';
import { FirebaseModule } from '@data/firebase/firebase.module';
import { AnalyzerImageModule } from '@modules/analyzer-image/analyzer-image.module';

@Module({
  imports: [FirebaseModule, AnalyzerImageModule],
  providers: [PetsService],
  controllers: [PetsController]
})
export class PetsModule {}
