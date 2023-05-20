import { Test, TestingModule } from '@nestjs/testing';
import { OpenaiController } from '../openai.controller';
import * as request from 'supertest';

import { DatabaseService } from '../../database/database.service';
import { Connection } from 'mongoose';
import { AppModule } from '../../app.module';

describe('OpenaiController integration tests', () => {
  let controller: OpenaiController;
  let dbConnection: Connection;
  let httpServer: any;
  let app: any;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    controller = module.get<OpenaiController>(OpenaiController);
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
});
