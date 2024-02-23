import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { NotificationsService } from '@app/services';

import { SqsService } from '@infra/sqs';

@Injectable()
export class NotificationsServiceImpl extends NotificationsService {
    private readonly queueUrl: string;

    private readonly logger = new Logger(NotificationsServiceImpl.name);

    constructor(
        private readonly sqs: SqsService,
        config: ConfigService,
    ) {
        super();

        const sqsBaseUrl = config.getOrThrow('AWS_ENDPOINT_URL_SQS');
        const sqsUser = config.getOrThrow('SQS_USER');
        const sqsQueue = config.getOrThrow('SQS_QUEUE');

        this.queueUrl = `${sqsBaseUrl}/${sqsUser}/${sqsQueue}`;
    }

    async userCreated(userId: string): Promise<void> {
        this.logger.debug(`Sent user.created event. User id: ${userId}`);

        await this.sqs.sendToSqs(this.queueUrl, {
            data: { userId },
            event: 'user.created',
            delaySeconds: 1,
        });
    }
}
