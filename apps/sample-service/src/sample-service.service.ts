import { Injectable } from '@nestjs/common';

@Injectable()
export class SampleServiceService {
  getHello(): string {
    return 'Hello World!';
  }
}
