import { Module } from '@nestjs/common';
import { AuthAppController } from './auth-app.controller';
import { AuthAppService } from './auth-app.service';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [PrismaModule, UsersModule],
  controllers: [AuthAppController],
  providers: [AuthAppService],
})
export class AuthAppModule {}
