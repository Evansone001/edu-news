import type { Metadata } from 'next';
import { Inter, Lora } from 'next/font/google';
import '@/styles/globals.css';
import { SimpleAuthProvider } from '@/context/AuthContext/SimpleAuthContext';
import HeaderClient from '@/components/layout/Header/HeaderClientWrapper';
import ProfessionalFooter from '@/components/layout/Footer/Footer';
import { SpeedInsights } from "@vercel/speed-insights/next"
import { Analytics } from "@vercel/analytics/next"

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const lora = Lora({ subsets: ['latin'], variable: '--font-lora' });

export const metadata: Metadata = {
  title: 'EDU NEWS Education Blog',
  description: 'Education insights, teaching resources, and learning materials by EDU NEWS',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${lora.variable} antialiased`}>
        <SimpleAuthProvider>
          <HeaderClient />
          {children}
          <ProfessionalFooter />

        </SimpleAuthProvider>
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
