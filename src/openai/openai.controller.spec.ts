import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { OpenaiController } from './openai.controller';
import { OpenaiService } from './openai.service';
import { Model } from 'mongoose';
import { Summary } from './schemas/summary.schema';

describe('OpenaiController', () => {
  let controller: OpenaiController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OpenaiController],
      providers: [
        { provide: getModelToken(Summary.name), useValue: Model },
        OpenaiService,
      ],
    }).compile();

    controller = module.get<OpenaiController>(OpenaiController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
