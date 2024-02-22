import {
    Injectable,
    NestInterceptor,
    ExecutionContext,
    CallHandler,
} from '@nestjs/common';
import { Request } from 'express';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { MetricsService } from '@infra/metrics';

@Injectable()
export class RequestDurationInterceptor implements NestInterceptor {
    constructor(private readonly metrics: MetricsService) {}

    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        const request = context.switchToHttp().getRequest<Request>();
        const start = Date.now();
        return next.handle().pipe(
            tap(() => {
                const delta = Date.now() - start;

                console.log('Request took:', delta);

                this.metrics.httpRequestDuration.observe(
                    { method: request.method, route: request.route },
                    delta,
                );
            }),
        );
    }
}
