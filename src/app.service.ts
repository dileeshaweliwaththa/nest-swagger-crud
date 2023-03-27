import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    console.log("S2");
    console.log("S3");
    return 'Hello World! Samitha';
  }
}
