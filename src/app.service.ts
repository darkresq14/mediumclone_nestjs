import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Go to `/docs` to see the SwaggerSpec';
  }
}
