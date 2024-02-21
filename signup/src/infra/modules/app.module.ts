import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppController } from '@infra/controllers';

@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
