import { Injectable, Logger } from '@nestjs/common';

import { User } from '@app/user';
import { UsersRepository } from '@app/repositories';

@Injectable()
export class UsersRepositoryImpl extends UsersRepository {
    private readonly logger = new Logger(UsersRepositoryImpl.name);

    constructor() {
        super();
    }

    async save(u: User): Promise<void> {
        this.logger.debug(`User saved: ${JSON.stringify(u)}`);

        u.id = '9c5b94b1-35ad-49bb-b118-8e8fc24abf80';
    }
}
