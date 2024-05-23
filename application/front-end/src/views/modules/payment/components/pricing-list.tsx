import { PricingCard } from '#/views/modules/payment/components/pricing-card';
import { SubscriptionDurationType } from '@package/common';

export type Tier = {
  name: string;
  duration: SubscriptionDurationType;
  id: string;
  href: string;
  price: string;
  description: string;
  features: string[];
};

const tiers: Tier[] = [
  {
    name: 'Monthly',
    duration: 'MONTHLY',
    id: 'tier-monthly',
    href: '#',
    price: '12 €',
    description: 'Billed monthly',
    features: ['2 premium challenges', '5 design files', 'Private solutions', 'Unlimited solution screenshots'],
  },
  {
    name: 'Annually',
    duration: 'YEARLY',
    id: 'tier-annually',
    href: '#',
    price: '8 €',
    description: '96 € billed yearly (save 33% vs monthly)',
    features: [
      'unlimited premium challenges',
      'unlimited design files',
      'Private solutions',
      'Unlimited solution screenshots',
    ],
  },
];

export const PricingList = () => {
  return (
    <div className="mt-20 flow-root">
      <div className="isolate -mt-16 grid max-w-sm grid-cols-1 gap-y-16 divide-y divide-gray-100 mx-auto lg:-mx-8 lg:mt-0 lg:max-w-none lg:grid-cols-2 lg:divide-x lg:divide-y-0">
        {tiers.map((tier) => (
          <PricingCard tier={tier} key={tier.id} />
        ))}
      </div>
    </div>
  );
};
