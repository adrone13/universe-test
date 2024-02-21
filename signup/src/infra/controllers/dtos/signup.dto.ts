import {
    IsEmail,
    IsNotEmpty,
    IsString,
    MaxLength,
    MinLength,
} from 'class-validator';

export class SignupDto {
    @IsString()
    @IsNotEmpty()
    readonly fullName: string;

    @IsEmail()
    readonly email: string;

    @IsString()
    @MinLength(16)
    @MaxLength(64)
    readonly password: string;
}
