import { Module } from '@nestjs/common';
import { NotificationsService } from '@app/services';
import { NotificationsServiceImpl } from '@infra/notifications';

@Module({
    providers: [
        { provide: NotificationsService, useClass: NotificationsServiceImpl },
    ],
    exports: [
        { provide: NotificationsService, useClass: NotificationsServiceImpl },
    ],
})
export class InfraNotificationsModule {}
