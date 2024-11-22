import { FirebaseAdmin } from '@data/firebase/firebase.setup';
import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { FirebaseModule } from '@data/firebase/firebase.module';

@Module({
  imports: [FirebaseModule],
  providers: [UserService, FirebaseAdmin],
  controllers: [UserController],
})
export class UserModule {}
