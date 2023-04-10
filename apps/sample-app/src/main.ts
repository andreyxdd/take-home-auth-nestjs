import { NestFactory } from '@nestjs/core';
import { SampleAppModule } from './sample-app.module';

async function bootstrap() {
  const app = await NestFactory.create(SampleAppModule);
  await app.listen(3000);
}
bootstrap();
