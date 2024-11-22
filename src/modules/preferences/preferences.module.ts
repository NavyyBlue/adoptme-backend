import { Module } from '@nestjs/common';
import { PreferencesService } from './preferences.service';
import { PreferencesController } from './preferences.controller';
import { FirebaseModule } from '@data/firebase/firebase.module';
import { FirebaseAdmin } from '@data/firebase/firebase.setup';

@Module({
  imports: [FirebaseModule],
  providers: [PreferencesService, FirebaseAdmin],
  controllers: [PreferencesController],
})
export class PreferencesModule {}
