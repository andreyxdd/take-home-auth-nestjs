import { Module } from '@nestjs/common';
import { SampleAppController } from './sample-app.controller';
import { SampleAppService } from './sample-app.service';

@Module({
  imports: [],
  controllers: [SampleAppController],
  providers: [SampleAppService],
})
export class SampleAppModule {}
