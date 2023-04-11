import { Module } from '@nestjs/common';
import { createClient } from '@redis/client';

import { REDIS } from './redis.constants';

export const redisClient = createClient({ url: 'redis://localhost:6379' });

@Module({
  providers: [
    {
      provide: REDIS,
      useValue: redisClient,
    },
  ],
  exports: [REDIS],
})
export class RedisModule {}
