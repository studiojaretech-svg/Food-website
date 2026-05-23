import { PropsWithChildren } from 'react';
import '@/styles/_main.scss'; // Restored original template stylesheet
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Gloock } from 'next/font/google';
import { Metadata } from 'next';
import { CartProvider } from '@/context/CartContext'; // Restores global cart state support

const gloock = Gloock({
    weight: ['400'],
    subsets: ['latin'],
    variable: '--font-gloock',
});

const metaTitle = 'Cravenest'; // Rebranded from 'Tastyyy'
const metaDescription =
    'Indulge in Cravenest, offering premium gourmet food trays, bulk party packs, and bespoke luxury hampers hand-styled and delivered fresh in Lagos, Nigeria.';
const metaImage = '/thumbnail.jpg';

export const metadata: Metadata = {
    metadataBase: new URL('https://restaurant-starter.thebcms.com'),
    alternates: {
        canonical: '/',
    },
    title: metaTitle,
    description: metaDescription,
    openGraph: {
        title: metaTitle,
        description: metaDescription,
        type: 'website',
        images: [metaImage],
        siteName: metaTitle,
    },
    twitter: {
        card: 'summary_large_image',
        title: metaTitle,
        description: metaDescription,
        images: [metaImage],
        site: '@thebcms',
        creator: '@thebcms',
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
