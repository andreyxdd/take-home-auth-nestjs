import { Controller, Get } from '@nestjs/common';
import { SampleServiceService } from './sample-service.service';

@Controller()
export class SampleServiceController {
  constructor(private readonly sampleServiceService: SampleServiceService) {}

  @Get()
  getHello(): string {
    return this.sampleServiceService.getHello();
  }
}
