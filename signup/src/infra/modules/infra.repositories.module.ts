import { Global, Module } from '@nestjs/common';

import { UsersRepository } from '@app/repositories';
import { UsersRepositoryImpl } from '@infra/persistence/repositories';

@Global()
@Module({
    providers: [{ provide: UsersRepository, useClass: UsersRepositoryImpl }],
    exports: [{ provide: UsersRepository, useClass: UsersRepositoryImpl }],
})
export class InfraRepositoriesModule {}
