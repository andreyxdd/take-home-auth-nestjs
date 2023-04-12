import { Module } from '@nestjs/common';
import { AuthAppController } from './auth-app.controller';
import { AuthAppService } from './auth-app.service';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { RedisModule } from './auth/redis.module';

@Module({
  imports: [PrismaModule, UsersModule, AuthModule, RedisModule],
  controllers: [AuthAppController],
  providers: [AuthAppService],
})
export class AuthAppModule {}
