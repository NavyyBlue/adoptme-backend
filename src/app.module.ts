import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FirebaseModule } from './data/firebase/firebase.module';
import { AnalyzerImageModule } from './modules/analyzer-image/analyzer-image.module';
import { R2Module } from './modules/r2/r2.module';
import { ReviewsModule } from './modules/reviews/reviews.module';
import { VetsModule } from './modules/vets/vets.module';
import { UserModule } from './modules/user/user.module';
import { FirebaseAdmin } from '@data/firebase/firebase.setup';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AnalyzerImageModule,
    R2Module,
    FirebaseModule,
    VetsModule,
    ReviewsModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
