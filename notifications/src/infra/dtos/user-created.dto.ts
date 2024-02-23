import { IsUUID } from 'class-validator';

export class UserCreatedDto {
    @IsUUID() userId: string;

    constructor(userId: string) {
        this.userId = userId;
    }
}
