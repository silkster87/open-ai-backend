import { Test, TestingModule } from '@nestjs/testing';
import { OpenaiController } from '../openai.controller';
import * as request from 'supertest';
import { OpenaiService } from '../openai.service';
import { DatabaseService } from '../../database/database.service';
import { Connection } from 'mongoose';
import { AppModule } from '../../app.module';

describe('OpenaiController integration tests', () => {
  let controller: OpenaiController;
  let openaiService: OpenaiService;
  let dbConnection: Connection;
  let httpServer: any;
  let app: any;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    controller = module.get<OpenaiController>(OpenaiController);
    openaiService = module.get<OpenaiService>(OpenaiService);
    jest.clearAllMocks();

    app = module.createNestApplication();
    await app.init();
    dbConnection = module.get<DatabaseService>(DatabaseService).getDbHandle();
    httpServer = app.getHttpServer();
  });

  afterAll(async () => {
    await dbConnection.collection('summaries').deleteMany({});
    await app.close();
  });

  beforeEach(async () => {
    await dbConnection.collection('summaries').deleteMany({});
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('get summaries', () => {
    it('should get summaries', async () => {
      const mockData = { text: 'test', created: 1684508502 };
      await dbConnection.collection('summaries').insertOne(mockData);
      const response = await request(httpServer).get('/openai/summaries');
      expect(response.status).toBe(200);
      expect(response.body[0].text).toBe(mockData.text);
      expect(response.body[0].created).toBe(mockData.created);
    });
  });

  describe('create summary', () => {
    it('should create summary', async () => {
      const result = { text: 'test', created: 1684569125 };
      const mockBody = { text: 'test' };
      jest
        .spyOn(openaiService, 'createSummary')
        .mockImplementation(() => Promise.resolve(result));

      const response = await request(httpServer)
        .post('/openai')
        .send(mockBody)
        .set('Accept', 'application/json');

      expect(response.status).toBe(201);
      expect(response.body).toEqual(result);
    });
  });

  describe('remove summary', () => {
    
    it('should remove summary', async () => {
      const mockBody = { id: '1' }
      const resultObj = { acknowledged: true, deletedCount: 1 };
      jest.spyOn(openaiService, 'remove')
        .mockImplementation(() => Promise.resolve(resultObj));
      
      
      const response = await request(httpServer)
        .delete('/openai')
        .send(mockBody)
        .set('Accept', 'application/json');

      expect(response.status).toBe(200);
      expect(response.body).toEqual(resultObj);
    })

    
  });
});
