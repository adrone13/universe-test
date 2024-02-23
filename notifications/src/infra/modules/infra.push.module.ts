import { Module } from '@nestjs/common';

import { PushService } from '@app/services';
import { PushServiceImpl } from '@infra/push';

@Module({
    providers: [
        {
            provide: PushService,
            useClass: PushServiceImpl,
        },
    ],
    exports: [
        {
            provide: PushService,
            useClass: PushServiceImpl,
        },
    ],
})
export class InfraPushModule {}
