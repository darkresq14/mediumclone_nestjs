if (process.env.IS_TS_NODE) {
  require('module-alias/register');
}

import { NestFactory } from '@nestjs/core';
import { AppModule } from '@app/app.module';
import { ContentTypeInterceptor } from '@app/interceptors/content-type.interceptor';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import metadata from './metadata';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalInterceptors(new ContentTypeInterceptor());

  const config = new DocumentBuilder()
    .setTitle('Real World - Medium Clone - NestJS')
    .setDescription(
      'The real world application - Medium Clone - API description. Written in NodeJS',
    )
    .setVersion('1.0')
    .addTag('default')
    .addTag('Auth')
    .addTag('Tag')
    .build();

  await SwaggerModule.loadPluginMetadata(metadata);
  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
