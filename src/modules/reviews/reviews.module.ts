import { Module } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { ReviewsController } from './reviews.controller';
import { FirebaseModule } from '@data/firebase/firebase.module';
import { HttpModule } from '@nestjs/axios';
import { VetsModule } from '@modules/vets/vets.module';
import { VetsService } from '@modules/vets/vets.service';

@Module({
  imports: [FirebaseModule, HttpModule, VetsModule],
  providers: [ReviewsService, VetsService],
  controllers: [ReviewsController]
})                       
export class ReviewsModule {}
