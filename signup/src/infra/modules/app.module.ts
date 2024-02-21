import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { Signup } from '@app/signup';

import { AppController, SignupController } from '@infra/controllers';

import { InfraRepositoriesModule } from './infra.repositories.module';
import { InfraNotificationsModule } from './infra.notifications.module';

@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true }),
        InfraRepositoriesModule,
        InfraNotificationsModule,
    ],
    controllers: [AppController, SignupController],
    providers: [Signup],
})
export class AppModule {}
