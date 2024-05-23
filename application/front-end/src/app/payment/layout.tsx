import type { PropsWithChildren } from 'react';

export default function PaymentLayout({ children }: PropsWithChildren) {
  return <main className="w-full h-screen">{children}</main>;
}
