import { Module, MiddlewareConsumer, Inject, NestModule } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as Joi from 'joi';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { PrismaModule } from '../prisma/prisma.module';
import { UsersModule } from '../users/users.module';
import { JwtStrategy } from './strategies/jwt.strategy';
import { RedisModule } from '../redis/redis.module';
import { REDIS } from '../redis/redis.constants';
import * as RedisStore from 'connect-redis';
import * as session from 'express-session';
import * as passport from 'passport';
import { createClient } from '@redis/client';

type RedisClient = ReturnType<typeof createClient>;
@Module({
  imports: [
    PrismaModule,
    UsersModule,
    PassportModule,
    RedisModule,
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        JWT_SECRET: Joi.string().required(),
        JWT_EXPIRATION: Joi.string().required(),
      }),
      envFilePath: '.env',
    }),
    JwtModule.registerAsync({
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: {
          expiresIn: `${configService.get<string | number>('JWT_EXPIRATION')}s`,
        },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
})
export class AuthModule implements NestModule {
  constructor(@Inject(REDIS) private readonly redis: RedisClient) {}
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(
        session({
          store: new (RedisStore(session))({
            client: this.redis as any,
            logErrors: true,
          }),
          saveUninitialized: false,
          secret: 'sup3rs3cr3t',
          resave: false,
          cookie: {
            sameSite: true,
            httpOnly: false,
            maxAge: 60000,
          },
        }),
        passport.initialize(),
        passport.session(),
      )
      .forRoutes('*');
  }
}
