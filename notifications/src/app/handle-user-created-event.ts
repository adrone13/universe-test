import { Injectable } from '@nestjs/common';

import { PushService } from '@app/services';

export interface HandleUserCreatedEventInput {
    readonly userId: string;
}

@Injectable()
export class HandleUserCreatedEvent {
    constructor(private readonly push: PushService) {}

    async execute(input: HandleUserCreatedEventInput) {
        await this.push.send(input.userId, 'Welcome!');
    }
}
