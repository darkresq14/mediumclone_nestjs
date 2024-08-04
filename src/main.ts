if (process.env.IS_TS_NODE) {
  require('module-alias/register');
}

import { NestFactory } from '@nestjs/core';
import { AppModule } from '@app/app.module';
import { ContentTypeInterceptor } from '@app/interceptors/content-type.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalInterceptors(new ContentTypeInterceptor());
  await app.listen(3000);
}
bootstrap();
