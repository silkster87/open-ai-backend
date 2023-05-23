import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateOpenaiDto } from './dto/create-openai.dto';
import { Summary } from './schemas/summary.schema';
import { Configuration, OpenAIApi } from 'openai';
import { summary } from './mockdata/summary-response';
import mongodb from 'mongodb';

@Injectable()
export class OpenaiService {
  constructor(
    @InjectModel(Summary.name) private summaryModel: Model<Summary>,
  ) {}
  async createSummary(createOpenaiDto: CreateOpenaiDto): Promise<Summary> {
    return new Promise((resolve) => {
      const { text } = summary.choices[0];
      const { created } = summary;
      resolve({ text, created });
    });
    // const configuration = new Configuration({
    //   apiKey: process.env.OPENAI_API_KEY,
    // });

    // const openai = new OpenAIApi(configuration);

    // const response = await openai.createCompletion({
    //   model: 'text-davinci-003',
    //   prompt: `Summarize this for a second-grade student:\n\n${createOpenaiDto.text}`,
    //   temperature: 0.7,
    //   max_tokens: 64,
    //   top_p: 1.0,
    //   frequency_penalty: 0.0,
    //   presence_penalty: 0.0,
    // });

    // const { text } = response.data.choices[0];
    // const { created } = response.data;
    // //const { text } = summary.choices[0];
    // //const { created } = summary;
    // const createSummaryDto = { text, created };

    // const createdSummary = new this.summaryModel(createSummaryDto);

    // return createdSummary.save();
  }

  async findAll(): Promise<Summary[]> {
    return this.summaryModel.find().exec();
  }

  async remove(id: string) {
    return this.summaryModel.deleteOne({ _id: new mongodb.ObjectId(id)});
  }
}
