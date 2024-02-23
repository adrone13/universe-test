import {
    Body,
    Controller,
    Get,
    Logger,
    Post,
    UseInterceptors,
} from '@nestjs/common';

import { Signup } from '@app/signup';

import { SignupDto } from '@infra/controllers/dtos';
import { RequestDurationInterceptor } from '@infra/controllers/interceptors';
import { NotificationsService } from '@app/services';

@Controller('signup')
export class SignupController {
    private readonly logger = new Logger(SignupController.name);

    constructor(
        private readonly signup: Signup,
        private readonly notifications: NotificationsService,
    ) {}

    @UseInterceptors(RequestDurationInterceptor)
    @Post()
    async handleSignup(@Body() body: SignupDto) {
        this.logger.debug(`POST /signup. Body: ${JSON.stringify(body)}`);

        await this.signup.execute(body);
    }

    @Get('send')
    async sendNotification() {
        await this.notifications.userCreated('user_uuid');
    }
}
