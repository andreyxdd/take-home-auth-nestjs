import { Controller, Get } from '@nestjs/common';
import { SampleAppService } from './sample-app.service';

@Controller()
export class SampleAppController {
  constructor(private readonly sampleAppService: SampleAppService) {}

  @Get()
  getHello(): string {
    return this.sampleAppService.getHello();
  }
}
