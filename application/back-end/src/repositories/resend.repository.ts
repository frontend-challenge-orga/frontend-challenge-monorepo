import { IMailingRepository } from '@package/domain';
import { Resend } from 'resend';

export class ResendRepository implements IMailingRepository {
  private mailingRepository: Resend;

  constructor(mailingSource: Resend) {
    this.mailingRepository = mailingSource;
    this.sendSuspendingSubscriptionEmail = this.sendSuspendingSubscriptionEmail.bind(this);
  }

  async sendSuspendingSubscriptionEmail(email: string): Promise<void> {
    await this.mailingRepository.emails.send({
      from: 'contact@frontend-challenge.com',
      to: 'adlpromail@gmail.com',
      subject: 'Your subscription is about to expire',
      text: 'Please renew your subscription to keep enjoying our services',
    });
  }
}
