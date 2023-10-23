import type { Metadata } from 'next';
import './globals.scss';
import { Nav, Providers } from '@/components';


export const metadata: Metadata = {
  title: 'Chat app',
  description: 'Chat app demo with Nextjs',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <html lang='en'>
      <body>
        <Providers>
          <Nav />
          {children}
        </Providers>
      </body>
    </html>
  );
}
