import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'This is an OpenAI backend server for Chrome Extension';
  }
}
