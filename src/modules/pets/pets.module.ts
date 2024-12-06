import { Module } from '@nestjs/common';
import { PetsService } from './pets.service';
import { PetsController } from './pets.controller';
import { FirebaseModule } from '@data/firebase/firebase.module';
import { AnalyzerImageModule } from '@modules/analyzer-image/analyzer-image.module';
import { UserService } from '@modules/user/user.service';
import { FirebaseAdmin } from '@data/firebase/firebase.setup';

@Module({
  imports: [FirebaseModule, AnalyzerImageModule],
  providers: [PetsService, UserService, FirebaseAdmin],
  controllers: [PetsController]
})
export class PetsModule {}
