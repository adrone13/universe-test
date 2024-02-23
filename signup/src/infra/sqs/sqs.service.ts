import { randomUUID } from 'node:crypto';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Producer, Message } from 'sqs-producer';

import { SqsMessage } from './sqs.message';
import { SqsException } from './sqs.exception';

@Injectable()
export class SqsService {
    private readonly AWS_REGION: string;

    private readonly logger = new Logger(SqsService.name);

    constructor(config: ConfigService) {
        this.AWS_REGION = config.getOrThrow('AWS_REGION');
    }

    public async sendToSqs(queue: string, m: SqsMessage): Promise<void> {
        try {
            const producer = Producer.create({
                queueUrl: queue,
                region: this.AWS_REGION,
            });

            const message: Message = {
                id: randomUUID(),
                body: JSON.stringify(m.data),
                delaySeconds: m.delaySeconds,
                messageAttributes: {
                    event: { DataType: 'String', StringValue: m.event },
                },
            };

            this.logger.debug(
                `sendToSqs() queue: ${queue}, message: ${JSON.stringify(message)}`,
            );

            await producer.send(message);
        } catch (err: any) {
            this.logger.error(`sendToSqs() error: ${err.message}`);

            throw new SqsException(m, err.message);
        }
    }
}
