import { Injectable } from '@nestjs/common';

@Injectable()
export class SampleAppService {
  getHello(): string {
    return 'Hello World!';
  }
}
