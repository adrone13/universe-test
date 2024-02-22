import { Injectable } from '@nestjs/common';
import { collectDefaultMetrics, Histogram, register } from 'prom-client';

@Injectable()
export class MetricsService {
    public readonly httpRequestDuration: Histogram;

    constructor() {
        collectDefaultMetrics({ prefix: 'signup_' });

        register.resetMetrics();

        this.httpRequestDuration = new Histogram({
            name: 'signup_http_request_duration_ms',
            help: 'Duration of HTTP requests in seconds',
            labelNames: ['method', 'route'],
            buckets: [0.1, 5, 15, 50, 100, 200, 300, 400, 500],
        });
    }

    getMetrics() {
        return register.metrics();
    }
}
