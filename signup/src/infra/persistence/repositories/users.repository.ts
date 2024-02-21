import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';

import { User } from '@app/user';
import { UsersRepository } from '@app/repositories';

@Injectable()
export class UsersRepositoryImpl extends UsersRepository {
    constructor(private readonly prisma: PrismaService) {
        super();
    }

    async save(u: User): Promise<void> {
        if (u.idSafe) {
            return;
        }

        const result = await this.prisma.user.create({
            select: {
                id: true,
            },
            data: {
                fullName: u.fullName,
                email: u.email,
                password: u.password,
                createdAt: u.createdAt,
            },
        });

        u.id = result.id;
    }

    async emailExists(email: string): Promise<boolean> {
        const c = await this.prisma.user.count({ where: { email } });

        return c > 0;
    }
}
