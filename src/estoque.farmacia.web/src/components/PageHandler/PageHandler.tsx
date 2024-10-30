'use client';

import { usePathname } from 'next/navigation';
import Header from '../Header/Header';

export default function PageHandler({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const path = usePathname();

  return (
    <>
      {path !== '/login' && <Header />}
      {children}
    </>
  );
}
