'use client';

import { usePathname } from 'next/navigation';
import Header from '../Header/Header';

export default function PageHandler({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const path = usePathname();
  const splitedPath = path.split('/');

  return (
    <>
      {splitedPath[1] !== 'login' &&
        splitedPath[1] !== 'print-report' &&
        splitedPath[1] !== 'print-batch' && <Header />}
      {children}
    </>
  );
}
