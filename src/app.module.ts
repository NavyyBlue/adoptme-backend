import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AnalyzerImageModule } from './analyzer-image/analyzer-image.module';
import { R2Module } from './r2/r2.module';
import { FirebaseModule } from './data/firebase/firebase.module';
import { VetsModule } from './modules/vets/vets.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AnalyzerImageModule,
    R2Module,
    FirebaseModule,
    VetsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}