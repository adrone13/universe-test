import {
    Controller,
    Logger,
    OnModuleDestroy,
    OnModuleInit,
} from '@nestjs/common';
import { Message } from '@aws-sdk/client-sqs';
import { Consumer } from 'sqs-consumer';

import { HandleUserCreatedEvent } from '@app/handle-user-created-event';
import { ConfigService } from '@nestjs/config';
import { UserCreatedDto } from '@infra/dtos';
import { validate } from 'class-validator';

enum Topics {
    UserCreated = 'user.created',
}

@Controller('sqs')
export class SqsController implements OnModuleInit, OnModuleDestroy {
    private readonly consumer: Consumer;
    private readonly logger = new Logger(SqsController.name);

    constructor(
        private readonly handleUserCreatedEvent: HandleUserCreatedEvent,
        config: ConfigService,
    ) {
        const sqsBaseUrl = config.getOrThrow('AWS_ENDPOINT_URL_SQS');
        const sqsUser = config.getOrThrow('SQS_USER');
        const sqsQueue = config.getOrThrow('SQS_SIGNUP_QUEUE');
        const queueUrl = `${sqsBaseUrl}/${sqsUser}/${sqsQueue}`;

        this.consumer = Consumer.create({
            queueUrl,
            messageAttributeNames: ['All'],
            handleMessage: (message) => this.resolveSqsMessage(message),
        });
    }

    onModuleInit(): void {
        this.consumer.start();

        this.consumer.on('error', (error) => {
            this.logger.error(error, error.message);
        });
    }

    onModuleDestroy(): void {
        this.consumer.stop();
    }

    async resolveSqsMessage(message: Message): Promise<void> {
        this.logger.debug(`Received message: ${JSON.stringify(message)}`);

        const event = message.MessageAttributes?.event?.StringValue;
        if (!event) {
            this.logger.error('Invalid SQS message: Error: topic missing');

            throw new Error('Invalid SQS message: Error: topic missing');
        }
        const data = JSON.parse(message.Body);
        if (!data) {
            this.logger.error('Invalid SQS message: Error: topic missing');

            throw new Error('Invalid SQS message: Error: topic missing');
        }

        switch (event) {
            case Topics.UserCreated: {
                await this.userCreatedHandler(data);

                break;
            }
            default: {
                this.logger.error(
                    `Received message with non-supported topic: ${event}`,
                );

                throw new Error('Invalid topic');
            }
        }
    }

    async userCreatedHandler(data: any) {
        const dto = new UserCreatedDto(data.userId);
        const errors = await validate(dto);
        if (errors.length) {
            this.logger.error(
                `Message ${Topics.UserCreated} payload invalid. Error: ${errors[0].toString()}`,
            );

            throw new Error('Invalid message payload');
        }

        await this.handleUserCreatedEvent.execute({
            userId: data.userId,
        });
    }
}
