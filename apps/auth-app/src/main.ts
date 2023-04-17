import { NestFactory, Reflector } from '@nestjs/core';
import { AuthAppModule } from './auth-app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Redis, { RedisOptions } from 'ioredis';
import session from 'express-session';
import RedisStore from 'connect-redis';

async function bootstrap() {
  const app = await NestFactory.create(AuthAppModule);

  const configService = app.get(ConfigService);

  // validate the request
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  // clear sensitive data in the response
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

  // Redis session store middleware
  const redisConfig: RedisOptions = {
    host: configService.get('REDIS_HOST') || 'redis',
    port: +configService.get('REDIS_PORT'),
  };
  const redis = new Redis(redisConfig);
  app.use(
    session({
      store: new (RedisStore as any)({
        client: redis,
        disableTouch: true,
      }),
      secret: configService.get('SESSION_SECRET') as string,
      resave: false,
      saveUninitialized: false,
      cookie: {
        httpOnly: true,
        sameSite: 'strict',
      },
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('Auth Microservice')
    .setDescription('The Take-home Node.js Auth Microservice')
    .setVersion('1.0.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
