import { mockPaymentService, mockSubscriptionService } from '#mock';
import { SuspendSubscription } from '@use-cases/suspend-subscription';
import { NotFoundError, SubscriptionNotActiveError } from '@package/domain';

describe('SuspendSubscription', () => {
  it('should throw NotFoundError if user subscription does not exist', async () => {
    mockSubscriptionService.getSubscription.mockResolvedValue(null);

    const suspendSubscription = new SuspendSubscription(mockSubscriptionService, mockPaymentService);

    await expect(suspendSubscription.do('userId')).rejects.toThrow(NotFoundError);
  });

  it('should throw SubscriptionNotActiveError if subscription is not active or is already cancelled', async () => {
    mockSubscriptionService.getSubscription.mockResolvedValue({ subscription_id: 'subscriptionId' });
    mockPaymentService.getSubscription.mockResolvedValue({ id: 'stripeSubscriptionId', cancel_at_period_end: true });
    mockPaymentService.getSubscriptionStatus.mockResolvedValue('inactive');

    const suspendSubscription = new SuspendSubscription(mockSubscriptionService, mockPaymentService);

    await expect(suspendSubscription.do('userId')).rejects.toThrow(SubscriptionNotActiveError);
  });

  it('should suspend subscription if it is active and not cancelled', async () => {
    mockSubscriptionService.getSubscription.mockResolvedValue({ subscription_id: 'subscriptionId' });
    mockPaymentService.getSubscription.mockResolvedValue({ id: 'stripeSubscriptionId', cancel_at_period_end: false });
    mockPaymentService.getSubscriptionStatus.mockResolvedValue('active');

    const suspendSubscription = new SuspendSubscription(mockSubscriptionService, mockPaymentService);

    await suspendSubscription.do('userId');

    expect(mockPaymentService.suspendSubscription).toHaveBeenCalledWith('stripeSubscriptionId');
  });
});
