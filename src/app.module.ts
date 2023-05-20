import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OpenaiModule } from './openai/openai.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    ConfigModule.forRoot(),
    OpenaiModule,
    MongooseModule.forRoot('mongodb://localhost/openai'),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
