import { User } from '@app/user';

export abstract class UsersRepository {
    abstract save(u: User): Promise<void>;

    abstract emailExists(email: string): Promise<boolean>;
}
