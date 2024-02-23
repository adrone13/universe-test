import { SqsMessage } from './sqs.message';

export class SqsException extends Error {
    constructor(m: SqsMessage, err: string) {
        super(
            `Failed to send message. Data: ${JSON.stringify(m)}. Error: ${err}`,
        );
    }
}
