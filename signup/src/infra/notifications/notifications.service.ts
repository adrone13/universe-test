import { Injectable, Logger } from '@nestjs/common';
import { NotificationsService } from '@app/services';

@Injectable()
export class NotificationsServiceImpl extends NotificationsService {
    private readonly logger = new Logger(NotificationsServiceImpl.name);

    constructor() {
        super();
    }

    userCreated(userId: string): Promise<void> {
        this.logger.debug(`Sent user.created event. User id: ${userId}`);

        return Promise.resolve(undefined);
    }
}
