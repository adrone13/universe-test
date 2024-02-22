import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { Signup } from '@app/signup';

import {
    AppController,
    SignupController,
    MetricsController,
} from '@infra/controllers';

import { InfraRepositoriesModule } from './infra.repositories.module';
import { InfraNotificationsModule } from './infra.notifications.module';
import { InfraMetricsModule } from './infra.metrics.module';

@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true }),
        InfraRepositoriesModule,
        InfraNotificationsModule,
        InfraMetricsModule,
    ],
    controllers: [AppController, SignupController, MetricsController],
    providers: [Signup],
})
export class AppModule {}
