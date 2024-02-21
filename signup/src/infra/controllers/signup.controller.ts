import { Body, Controller, Post } from '@nestjs/common';

import { Signup } from '@app/signup';

import { SignupDto } from '@infra/controllers/dtos';

@Controller('signup')
export class SignupController {
    constructor(private readonly signup: Signup) {}

    @Post()
    async handleSignup(@Body() body: SignupDto) {
        console.log(body);

        await this.signup.execute(body);
    }
}
