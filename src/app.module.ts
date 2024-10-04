import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { R2Module } from './r2/r2.module';

@Module({
  imports: [R2Module],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
