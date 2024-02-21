import { NestFactory } from '@nestjs/core';
import {
    BadRequestException,
    ValidationError,
    ValidationPipe,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { AppModule } from '@infra/modules';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    const config = app.get(ConfigService);

    app.useGlobalPipes(
        new ValidationPipe({
            transform: true,
            whitelist: true,
            validationError: {
                target: false,
                value: false,
            },
            exceptionFactory: (errors: ValidationError[]) => {
                const err = errors[0];
                const errMessage = Object.values(err.constraints)[0];

                return new BadRequestException(errMessage);
            },
        }),
    );

    await app.listen(config.getOrThrow('PORT'));
}

void bootstrap();
