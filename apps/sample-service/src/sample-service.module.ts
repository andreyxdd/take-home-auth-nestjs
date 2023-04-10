import { Module } from '@nestjs/common';
import { SampleServiceController } from './sample-service.controller';
import { SampleServiceService } from './sample-service.service';

@Module({
  imports: [],
  controllers: [SampleServiceController],
  providers: [SampleServiceService],
})
export class SampleServiceModule {}
