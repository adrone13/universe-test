import {
    Injectable,
    InternalServerErrorException,
    Logger,
} from '@nestjs/common';
import { hash } from 'bcrypt';

import { User } from '@app/user';
import { UsersRepository } from '@app/repositories';
import { NotificationsService } from '@app/services';

interface SignupInput {
    readonly fullName: string;
    readonly email: string;
    readonly password: string;
}

@Injectable()
export class Signup {
    private readonly logger = new Logger(Signup.name);

    constructor(
        private readonly usersRepository: UsersRepository,
        private readonly notificationsService: NotificationsService,
    ) {}

    async execute(input: SignupInput) {
        const { fullName, email, password } = input;

        const hashedPassword = await this.hashPassword(password);
        const user = new User(fullName, email, hashedPassword);
        await this.usersRepository.save(user);

        await this.notify(user.id);
    }

    private async notify(userId: string) {
        try {
            await this.notificationsService.userCreated(userId);
        } catch (error: any) {
            this.logger.error(
                `Failed to send user created event. Error: ${error.message}`,
            );
        }
    }

    private async hashPassword(p: string): Promise<string> {
        try {
            return await hash(p, 10);
        } catch (error: any) {
            this.logger.error(
                `Failed to hash password: ${p}. Error: ${error.message}`,
            );

            throw new InternalServerErrorException();
        }
    }
}
