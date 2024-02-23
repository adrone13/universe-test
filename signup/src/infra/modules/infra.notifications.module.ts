import { Module } from '@nestjs/common';

import { NotificationsService } from '@app/services';

import { NotificationsServiceImpl } from '@infra/notifications';

import { InfraSqsModule } from './infra.sqs.module';

@Module({
    imports: [InfraSqsModule],
    providers: [
        { provide: NotificationsService, useClass: NotificationsServiceImpl },
    ],
    exports: [
        { provide: NotificationsService, useClass: NotificationsServiceImpl },
    ],
})
export class InfraNotificationsModule {}
