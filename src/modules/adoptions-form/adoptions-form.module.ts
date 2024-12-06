import { Module } from '@nestjs/common';
import { AdoptionsFormService } from './adoptions-form.service';
import { AdoptionsFormController } from './adoptions-form.controller';
import { FirebaseModule } from '@data/firebase/firebase.module';

@Module({
  imports: [FirebaseModule],
  providers: [AdoptionsFormService],
  controllers: [AdoptionsFormController]
})
export class AdoptionsFormModule {}
