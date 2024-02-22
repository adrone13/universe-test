import { Controller, Get, Header } from '@nestjs/common';
import { register } from 'prom-client';

import { MetricsService } from '@infra/metrics';

@Controller('metrics')
export class MetricsController {
    constructor(private readonly metrics: MetricsService) {}

    @Get()
    @Header('Content-Type', register.contentType)
    metricsHandler() {
        return this.metrics.getMetrics();
    }
}
