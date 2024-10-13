import { Module } from '@nestjs/common';
import { VetsService } from './vets.service';
import { VetsController } from './vets.controller';
import { FirebaseModule } from '@data/firebase/firebase.module';

@Module({
  imports: [FirebaseModule],
  providers: [VetsService],
  controllers: [VetsController],
})
export class VetsModule {}
