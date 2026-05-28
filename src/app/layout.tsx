import { PropsWithChildren } from 'react';
import '@/styles/_main.scss';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Gloock } from 'next/font/google';
import { Metadata } from 'next';
import { CartProvider } from '@/context/CartContext';

const gloock = Gloock({
    weight: ['400'],
    subsets: ['latin'],
    variable: '--font-gloock',
});

const metaTitle = 'Cravenest - Premium Gourmet Food Trays & Luxury Hampers';
const metaDescription =
    'Indulge in Cravenest, offering premium gourmet food trays, bulk party packs, and bespoke luxury hampers hand-styled and delivered fresh in Lagos, Nigeria.';

export const metadata: Metadata = {
    // Hardcoded production Vercel base to guarantee absolute URLs for crawlers
    metadataBase: new URL('https://cravenest.vercel.app'),
    alternates: {
        canonical: '/',
    },
    title: metaTitle,
    description: metaDescription,
    
    // Explicit tab and mobile icons setup
    icons: {
        icon: '/favicon.ico',
        shortcut: '/favicon.ico',
        apple: '/apple-icon.png',
    },

    openGraph: {
        title: metaTitle,
        description: metaDescription,
        type: 'website',
        images: [
            {
                url: '/thumbnail.png', // Automatically resolved to https://cravenest.vercel.app/thumbnail.png
                width: 1200,
                height: 630,
                alt: 'Cravenest Premium Platter Showcase',
            }
        ],
        siteName: 'Cravenest',
    },
    twitter: {
        card: 'summary_large_image',
        title: metaTitle,
        description: metaDescription,
        images: ['/thumbnail.png'],
        site: '@cravenest',
        creator: '@cravenest',
    },
};

const RootLayout: React.FC<PropsWithChildren> = async ({ children }) => {
    return (
        <html lang="en">
            <body
                className={`${gloock.variable} font-Helvetica overflow-x-hidden bg-appBody text-appText`}
            >
                <CartProvider>
                    <div className="overflow-hidden flex flex-col min-h-screen">
                        <Header />
                        <main className="flex flex-col flex-1">{children}</main>
                        <Footer />
                    </div>
                </CartProvider>
            </body>
        </html>
    );
};

export default RootLayout;
