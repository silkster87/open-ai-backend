import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { OpenaiController } from './openai.controller';
import { OpenaiService } from './openai.service';
import { Model } from 'mongoose';
import { Summary } from './schemas/summary.schema';
import { CreateOpenaiDto } from './dto/create-openai.dto';

describe('OpenaiController', () => {
  let controller: OpenaiController;
  let openaiService: OpenaiService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OpenaiController],
      providers: [
        { provide: getModelToken(Summary.name), useValue: Model },
        OpenaiService,
      ],
    }).compile();

    controller = module.get<OpenaiController>(OpenaiController);
    openaiService = module.get<OpenaiService>(OpenaiService);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create summary', () => {
    describe('when createSummary is called', () => {
      let summary: Summary;
      const createOpenaiDto: CreateOpenaiDto = { text: 'test' };
      const result = { text: 'test', created: 1684569125 };

      beforeEach(async () => {
        jest
          .spyOn(openaiService, 'createSummary')
          .mockImplementation(() => Promise.resolve(result));
        summary = await controller.create(createOpenaiDto);
      });

      test('should create summary', () => {
        expect(openaiService.createSummary).toBeCalled();
      });

      test('should return a summary', () => {
        expect(summary).toBe(result);
      });
    });
  });

  describe('summaries', () => {
    describe('when findAll is called', () => {
      let summaries: Summary[];

      const result = [{ text: 'test', created: 1684569125 }];

      beforeEach(async () => {
        jest
          .spyOn(openaiService, 'findAll')
          .mockImplementation(() => Promise.resolve(result));
        summaries = await controller.findAll();
      });

      test('should call findAll', () => {
        expect(openaiService.findAll).toBeCalled();
      });

      test('expect to get Summaries', () => {
        expect(summaries).toBe(result);
      });
    });
  });
});
