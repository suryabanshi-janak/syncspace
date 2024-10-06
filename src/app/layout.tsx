import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ClerkProvider } from '@clerk/nextjs';
import './globals.css';

import Header from '@/components/Header';
import Providers from '@/components/Providers';
import CreateEventDrawer from '@/components/CreateEventDrawer';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'SyncSpace',
  description: 'Meeting Scheduling App',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <Providers>
        <html lang='en'>
          <body className={`${inter.className} antialiased`}>
            <Header />
            <main className='min-h-[calc(100vh-7.5rem)] bg-gradient-to-b from-blue-50 to-white'>
              {children}
            </main>
            <footer className='bg-blue-100 h-14 grid place-items-center'>
              <div className='container mx-auto px-4 text-center text-gray-600'>
                <p>Made with 💗 by Zanak</p>
              </div>
            </footer>

            <CreateEventDrawer />
          </body>
        </html>
      </Providers>
    </ClerkProvider>
  );
}
