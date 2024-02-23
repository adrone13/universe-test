import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { HandleUserCreatedEvent } from '@app/handle-user-created-event';

import { AppController, SqsController } from '@infra/controllers';

import { InfraPushModule } from './infra.push.module';

@Module({
    imports: [ConfigModule.forRoot(), InfraPushModule],
    controllers: [AppController, SqsController],
    providers: [HandleUserCreatedEvent],
})
export class AppModule {}
