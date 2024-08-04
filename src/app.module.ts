import { Module } from '@nestjs/common';
import { AppService } from '@app/app.service';
import { AppController } from '@app/app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import config from '@app/ormconfig';
import { TagModule } from '@app/tag/tag.module';
import { UserModule } from '@app/user/user.module';

@Module({
  imports: [TypeOrmModule.forRoot(config), TagModule, UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
