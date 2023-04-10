import { Test, TestingModule } from '@nestjs/testing';
import { SampleAppController } from './sample-app.controller';
import { SampleAppService } from './sample-app.service';

describe('SampleAppController', () => {
  let sampleAppController: SampleAppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [SampleAppController],
      providers: [SampleAppService],
    }).compile();

    sampleAppController = app.get<SampleAppController>(SampleAppController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(sampleAppController.getHello()).toBe('Hello World!');
    });
  });
});
