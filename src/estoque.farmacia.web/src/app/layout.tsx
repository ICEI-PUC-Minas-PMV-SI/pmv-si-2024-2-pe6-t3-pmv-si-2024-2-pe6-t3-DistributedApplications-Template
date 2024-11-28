import type { Metadata } from 'next';
import './globals.css';
import PageHandler from '@/components/PageHandler/PageHandler';

export const metadata: Metadata = {
  title: 'Controle de Estoque de Farmácria',
  description:
    'Sistema desenvolvido para fazer o controle de estoque de uma farmácia.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='pt-br'>
      <body>
        <PageHandler>{children}</PageHandler>
      </body>
    </html>
  );
}
