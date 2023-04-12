import { Module } from '@nestjs/common';
import { createClient } from 'redis';
@Module({
  providers: [
    {
      provide: 'REDIS_OPTIONS',
      useValue: {
        url: 'redis://localhost:6379',
      },
    },
    {
      inject: ['REDIS_OPTIONS'],
      provide: 'REDIS_CLIENT',
      useFactory: async (options: { url: string }) => {
        const client = createClient(options);
        await client.connect().catch(console.error);
        return client;
      },
    },
  ],
  exports: ['REDIS_CLIENT'],
})
export class RedisModule {}
