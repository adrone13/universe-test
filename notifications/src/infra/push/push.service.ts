import { Injectable, Logger } from '@nestjs/common';

import { PushService } from '@app/services';

@Injectable()
export class PushServiceImpl extends PushService {
    private readonly logger = new Logger(PushServiceImpl.name);

    constructor() {
        super();
    }

    async send(userId: string, text: string) {
        this.logger.debug(
            `Sending push notification. User: ${userId}, text: ${text}`,
        );
    }
}
