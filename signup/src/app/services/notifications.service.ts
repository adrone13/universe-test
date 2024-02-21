export abstract class NotificationsService {
    abstract userCreated(userId: string): Promise<void>;
}
