import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { OpenaiService } from './openai.service';
import { OpenaiController } from './openai.controller';
import { Summary, SummarySchema } from './schemas/summary.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Summary.name, schema: SummarySchema }]),
  ],
  controllers: [OpenaiController],
  providers: [OpenaiService],
})
export class OpenaiModule {}
