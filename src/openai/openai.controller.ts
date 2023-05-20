import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
  Body,
} from '@nestjs/common';
import { OpenaiService } from './openai.service';
import { CreateOpenaiDto } from './dto/create-openai.dto';

@Controller('openai')
export class OpenaiController {
  constructor(private readonly openaiService: OpenaiService) {}

  throwError(error) {
    throw new HttpException(
      {
        status: HttpStatus.BAD_REQUEST,
        error: 'Request failed',
      },
      HttpStatus.BAD_REQUEST,
      {
        cause: error,
      },
    );
  }

  @Post()
  create(@Body() createOpenaiDto: CreateOpenaiDto) {
    try {
      return this.openaiService.createSummary(createOpenaiDto);
    } catch (error) {
      this.throwError(error);
    }
  }

  @Get('summaries')
  findAll() {
    try {
      return this.openaiService.findAll();
    } catch (error) {
      this.throwError(error);
    }
  }
}
