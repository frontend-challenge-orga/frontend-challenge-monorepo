'use client';
import React, { useTransition } from 'react';
import type { SubscriptionDurationType } from '@package/common';
import { createCheckoutSessionAction } from '#/views/modules/actions/create-checkout-session';

type Props = {
  subscription_duration: SubscriptionDurationType;
};
export const PricingCardForm = ({ subscription_duration }: Props) => {
  const [isPending, startTransition] = useTransition();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    startTransition(async () => {
      const payload = await createCheckoutSessionAction({
        subscription_duration,
      });

      if (payload.serverError) {
        console.error(payload.serverError);
      }

      if (!payload.data) {
        console.error('No data returned');
        return;
      }

      window.location.href = payload.data;
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <button
        type="submit"
        className="mt-10 block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      >
        Buy plan
      </button>
    </form>
  );
};
