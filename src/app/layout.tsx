import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ClerkProvider } from '@clerk/nextjs';
import './globals.css';

import Header from '@/components/Header';

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
      <html lang='en'>
        <body className={`${inter.className} antialiased`}>
          <Header />
          <main className='min-h-screen bg-gradient-to-b from-blue-50 to-white'>
            {children}
          </main>
          <footer className='bg-blue-100 py-6'>
            <div className='container mx-auto px-4 text-center text-gray-600'>
              <p>Made with 💗 by Zanak</p>
            </div>
          </footer>
        </body>
      </html>
    </ClerkProvider>
  );
}
