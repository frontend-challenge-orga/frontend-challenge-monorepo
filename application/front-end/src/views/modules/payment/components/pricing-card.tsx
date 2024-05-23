import { CheckCircleIcon } from '@heroicons/react/20/solid';
import type { Tier } from '#/views/modules/payment/components/pricing-list';
import { PricingCardForm } from '#/views/modules/payment/components/pricing-card-form';

type Props = {
  tier: Tier;
};

export const PricingCard = ({ tier }: Props) => {
  const { name, duration, id, href, price, description, features } = tier;

  return (
    <div key={id} className="pt-16 lg:px-8 lg:pt-0 xl:px-14">
      <h3 id={id} className="text-base font-semibold leading-7 text-gray-900">
        {name}
      </h3>
      <p className="mt-6 flex items-baseline gap-x-1">
        <span className="text-5xl font-bold tracking-tight text-gray-900">{price}</span>
        <span className="text-sm font-semibold leading-6 text-gray-600">/month</span>
      </p>

      <PricingCardForm subscription_duration={duration} />

      <p className="mt-10 text-sm font-semibold leading-6 text-gray-900">{description}</p>
      <ul role="list" className="mt-6 space-y-3 text-sm leading-6 text-gray-600">
        {features.map((feature) => (
          <li key={feature} className="flex gap-x-3">
            <CheckCircleIcon className="h-6 w-5 flex-none text-indigo-600" aria-hidden="true" />
            {feature}
          </li>
        ))}
      </ul>
    </div>
  );
};
