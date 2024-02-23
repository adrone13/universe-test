export interface SqsMessage {
    readonly data: Record<string, unknown>;
    readonly event: string;
    readonly delaySeconds?: number;
}
