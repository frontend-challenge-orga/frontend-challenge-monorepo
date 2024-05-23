import { CheckCircleIcon } from '@heroicons/react/20/solid';
import { PricingList } from '#/views/modules/payment/components/pricing-list';
import { PricingSectionHero } from '#/views/modules/payment/components/pricing-section-hero';

export const PricingSection = () => {
  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <PricingSectionHero />
        <PricingList />
      </div>
    </div>
  );
};
