import '@/assets/css/main.css';
import '@/assets/css/reset.css';
import '@/assets/css/transition.css';
import '@/assets/css/fonts.css';

import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { CartProvider } from '@/context/CartContext';

export const metadata = {
    title: 'Cravenest - Premium Gourmet Food Trays & Luxury Hampers',
    description: 'Bespoke culinary experience customized perfectly for your premium dining requirements in Lagos, Nigeria.',
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body className="antialiased text-appBody bg-[#D7BDA6] min-h-screen flex flex-col justify-between selection:bg-[#FFB03A] selection:text-[#150a02]">
                <CartProvider>
                    <div className="app-layout-wrapper flex flex-col justify-between min-h-screen">
                        <Header />
                        <main className="flex-grow">
                            {children}
                        </main>
                        <Footer />
                    </div>
                </CartProvider>
            </body>
        </html>
    );
}
