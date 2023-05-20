import { Controller, Get, Post, Body } from '@nestjs/common';
import { OpenaiService } from './openai.service';
import { CreateOpenaiDto } from './dto/create-openai.dto';

@Controller('openai')
export class OpenaiController {
  constructor(private readonly openaiService: OpenaiService) {}

  // TODO: posting text to OpenAI to summarize
  @Post()
  create(@Body() createOpenaiDto: CreateOpenaiDto) {
    return this.openaiService.createSummary(createOpenaiDto);
  }

  // TODO: get all the summaries in a MongoDB database
  @Get('summaries')
  findAll() {
    return this.openaiService.findAll();
  }
}
