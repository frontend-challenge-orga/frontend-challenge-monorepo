import type { IMailingRepository } from '../repositories';

export interface IMailingService {
  sendSuspendingSubscriptionEmail(email: string): Promise<void>;
}

export class MailingService implements IMailingService {
  constructor(private mailingRepository: IMailingRepository) {}

  async sendSuspendingSubscriptionEmail(email: string): Promise<void> {
    return this.mailingRepository.sendSuspendingSubscriptionEmail(email);
  }
}
