export interface UserInitData {
    readonly id: string;
    readonly fullName: string;
    readonly email: string;
    readonly password: string;
    readonly createdAt: string;
}

export class User {
    private _id: string | null = null;
    set id(id: string) {
        if (this._id) {
            throw new Error('id already set');
        }

        this._id = id;
    }
    get id(): string {
        if (!this._id) {
            throw new Error('id not set');
        }

        return this._id;
    }
    get idSafe(): string | null {
        return this._id;
    }

    readonly createAt: Date;

    constructor(
        readonly fullName: string,
        readonly email: string,
        readonly password: string,
    ) {
        this.createAt = new Date();
    }

    from(data: UserInitData) {
        return Object.assign(
            new User(data.fullName, data.email, data.password),
            {
                _id: data.id,
                createdAt: data.createdAt,
            },
        );
    }
}
