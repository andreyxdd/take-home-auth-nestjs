import { Injectable } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';

import { UsersService } from './users.service';

@Injectable()
export class SessionSerializer extends PassportSerializer {
  constructor(private readonly usersService: UsersService) {
    super();
  }

  serializeUser(user: any, done: (err: Error | null, user: any) => void) {
    done(null, user);
  }

  deserializeUser(
    payload: any,
    done: (err: Error | null, payload: string) => void,
  ) {
    done(null, payload);
  }
}
