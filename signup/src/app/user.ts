export class User {
  constructor(
    readonly id: string,
    readonly fullName: string,
    readonly email: string,
    readonly password: string,
    readonly createdAt: Date,
  ) {}
}
