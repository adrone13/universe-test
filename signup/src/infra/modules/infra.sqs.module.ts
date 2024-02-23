import { Module } from '@nestjs/common';

import { SqsService } from '@infra/sqs';

@Module({
    providers: [SqsService],
    exports: [SqsService],
})
export class InfraSqsModule {}
