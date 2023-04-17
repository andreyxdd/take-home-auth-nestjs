import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from './../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { AuthEntity } from './entities/auth.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService, private jwtService: JwtService) {}

  async validateUser(email: string, password: string) {
    const user = await this.prisma.user.findUnique({ where: { email: email } });
    if (!user) {
      throw new NotFoundException(`No user found for email: ${email}`);
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid password');
    }

    return user;
  }

  generateJWT(userId: number): AuthEntity {
    return {
      accessToken: this.jwtService.sign({ userId }),
    };
  }

  async loginLocal(email: string, password: string) {
    const user = await this.validateUser(email, password);

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: omitted, ...rest } = user;
    return rest;
  }
}
