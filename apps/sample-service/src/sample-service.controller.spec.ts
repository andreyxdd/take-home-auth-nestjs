import { Test, TestingModule } from '@nestjs/testing';
import { SampleServiceController } from './sample-service.controller';
import { SampleServiceService } from './sample-service.service';

describe('SampleServiceController', () => {
  let sampleServiceController: SampleServiceController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [SampleServiceController],
      providers: [SampleServiceService],
    }).compile();

    sampleServiceController = app.get<SampleServiceController>(SampleServiceController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(sampleServiceController.getHello()).toBe('Hello World!');
    });
  });
});
