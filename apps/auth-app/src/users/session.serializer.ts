import { Injectable } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';

import { UsersService } from './users.service';
import { UserEntity } from './entities/user.entity';

type PayloadType = Omit<
  UserEntity,
  'password' | 'updatedAt' | 'createdAt' | 'name'
>;

@Injectable()
export class SessionSerializer extends PassportSerializer {
  constructor(private readonly usersService: UsersService) {
    super();
  }

  serializeUser(
    user: UserEntity,
    done: (err: Error | null, user: PayloadType) => void,
  ) {
    done(null, { id: user.id, email: user.name });
  }

  async deserializeUser(
    payload: { id: number; email: string },
    done: (err: Error | null, user: PayloadType) => void,
  ) {
    const user = await this.usersService.findOne(payload.id);
    if (user) {
      done(null, user);
    }
  }
}
