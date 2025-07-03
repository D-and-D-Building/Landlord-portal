import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import SessionProviderWrapper from './SessionProviderWrapper';
import { PropertyProvider } from '@/context/PropertyContext';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Landlord Portal',
  description: 'Landlord portal for rental management system',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionProviderWrapper>
          <PropertyProvider>
            {children}
          </PropertyProvider>
        </SessionProviderWrapper>
      </body>
    </html>
  );
}
