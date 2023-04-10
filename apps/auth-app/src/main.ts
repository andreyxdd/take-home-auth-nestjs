import { NestFactory, Reflector } from '@nestjs/core';
import { AuthAppModule } from './auth-app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AuthAppModule);

  // validate the request
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  // clear sensitive data in the response
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

  const config = new DocumentBuilder()
    .setTitle('Auth Microservcie')
    .setDescription('The Take-home Node.js Auth Microservice')
    .setVersion('1.0.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
