export interface IMailingRepository {
  sendSuspendingSubscriptionEmail(email: string): Promise<void>;
}
