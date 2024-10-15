import type { Metadata } from 'next';
import './globals.css';

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
      <body>{children}</body>
    </html>
  );
}
