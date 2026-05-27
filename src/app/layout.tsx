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

// 1. DYNAMICALLY RESOLVE VERCEL ENVIRONMENT URL
// This automatically finds your exact Vercel subdomain (e.g., your-project.vercel.app)
const getDeploymentUrl = () => {
    if (process.env.NEXT_PUBLIC_VERCEL_URL) {
        return `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`;
    }
    if (process.env.VERCEL_URL) {
        return `https://${process.env.VERCEL_URL}`;
    }
    return 'http://localhost:3000'; // Local development fallback
};

const deploymentUrl = getDeploymentUrl();

// 2. CONSTRUCT ABSOLUTE IMAGE URL FOR OG CRAWLERS
const metaImage = `${deploymentUrl}/thumbnail.png`;

export const metadata: Metadata = {
    metadataBase: new URL(deploymentUrl),
    alternates: {
        canonical: '/',
    },
    title: metaTitle,
    description: metaDescription,
    openGraph: {
        title: metaTitle,
        description: metaDescription,
        type: 'website',
        images: [
            {
                url: metaImage, // Direct absolute URL
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
        images: [metaImage], // Direct absolute URL
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

