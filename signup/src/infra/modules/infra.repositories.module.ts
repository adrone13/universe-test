import { Global, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Prisma } from '@prisma/client';
import { PrismaModule } from 'nestjs-prisma';

import { UsersRepository } from '@app/repositories';

import { UsersRepositoryImpl } from '@infra/persistence/repositories';

@Global()
@Module({
    imports: [
        PrismaModule.forRootAsync({
            isGlobal: true,
            useFactory: async (config: ConfigService) => {
                const prismaOptions: Prisma.PrismaClientOptions = {
                    datasourceUrl: config.getOrThrow('DB_URL'),
                };
                if (config.getOrThrow('DB_LOGGING')) {
                    prismaOptions.log = ['query', 'info', 'warn', 'error'];
                }

                return {
                    explicitConnect: true,
                    prismaOptions,
                };
            },
            inject: [ConfigService],
        }),
    ],
    providers: [{ provide: UsersRepository, useClass: UsersRepositoryImpl }],
    exports: [{ provide: UsersRepository, useClass: UsersRepositoryImpl }],
})
export class InfraRepositoriesModule {}
