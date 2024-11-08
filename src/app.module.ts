import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FirebaseModule } from './data/firebase/firebase.module';
import { VetsModule } from './modules/vets/vets.module';
import { ReviewsModule } from './modules/reviews/reviews.module';
import { AnalyzerImageModule } from './modules/analyzer-image/analyzer-image.module';
import { R2Module } from './modules/r2/r2.module';
import { PetsModule } from './modules/pets/pets.module';

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
    PetsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
