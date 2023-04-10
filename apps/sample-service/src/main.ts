import { NestFactory } from '@nestjs/core';
import { SampleServiceModule } from './sample-service.module';

async function bootstrap() {
  const app = await NestFactory.create(SampleServiceModule);
  await app.listen(3000);
}
bootstrap();
