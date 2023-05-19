import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OpenaiModule } from './openai/openai.module';

@Module({
  imports: [ConfigModule.forRoot(), OpenaiModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
