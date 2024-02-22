import { Module } from '@nestjs/common';

import { MetricsService } from '@infra/metrics';

@Module({
    providers: [MetricsService],
    exports: [MetricsService],
})
export class InfraMetricsModule {}
