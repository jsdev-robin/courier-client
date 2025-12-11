import { Toaster } from '@repo/ui/components/sonner';
import '@repo/ui/globals.css';
import { cn } from '@repo/ui/lib/utils';
import type { Metadata } from 'next';
import { Inter, Merriweather, Poppins, Roboto } from 'next/font/google';
import StoreProvider from './StoreProvider';
import './styles.css';

const inter = Inter({ subsets: ['latin'] });

const roboto = Roboto({
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  subsets: ['latin'],
  variable: '--font-roboto',
});

const poppins = Poppins({
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  subsets: ['latin'],
  variable: '--font-poppins',
});

const merriweather = Merriweather({
  weight: ['300', '400', '700', '900'],
  subsets: ['latin'],
  variable: '--font-merriweather',
});

export const metadata: Metadata = {
  generator: 'Next.js',
  applicationName: 'Devmun Marketplace',
  referrer: 'origin-when-cross-origin',
  keywords: [
    'Devmun',
    'Multi Vendor eCommerce',
    'Online Marketplace',
    'Buy and Sell Products',
    'Shop Online',
    'Vendor Dashboard',
    'Sell Products Online',
    'eCommerce Platform',
    'Online Store',
    'Bangladesh eCommerce',
    'Product Marketplace',
  ],
  authors: [{ name: 'Devmun Team', url: 'https://www.devmun.xyz' }],
  creator: 'Devmun',
  publisher: 'Devmun',
  formatDetection: {
    email: true,
    address: true,
    telephone: true,
  },
  title: 'Devmun Marketplace – Multi-Vendor eCommerce Platform',
  description:
    'Devmun Marketplace is a modern multi-vendor eCommerce platform where buyers and sellers connect. Shop top-quality products, manage your store, and sell online with ease.',
  openGraph: {
    title: 'Devmun Marketplace – Your Trusted Multi-Vendor Platform',
    description:
      'Discover a wide range of products from verified vendors on Devmun Marketplace. Join as a seller, grow your business, and reach customers nationwide.',
    url: 'https://www.devmun.xyz',
    siteName: 'Devmun Marketplace',
    locale: 'en_US',
    type: 'website',
  },
  icons: {
    icon: [
      { url: '/images/favicon/favicon.ico', type: 'image/x-icon' },
      {
        url: '/images/favicon/favicon-32x32.png',
        type: 'image/png',
        sizes: '32x32',
      },
    ],
    apple: [{ url: '/images/favicon/apple-touch-icon.png', sizes: '180x180' }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          'antialiased text-base',
          inter.className,
          roboto.variable,
          poppins.variable,
          merriweather.variable,
        )}
      >
        <StoreProvider>{children}</StoreProvider>
        <Toaster position="bottom-right" richColors />
      </body>
    </html>
  );
}
