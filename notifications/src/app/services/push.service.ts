export abstract class PushService {
    abstract send(userId: string, text: string): Promise<void>;
}
