'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import classNames from 'classnames';
import Btn from '../Btn';

const Header: React.FC = () => {
    // Correct ref type to HTMLUListElement to match the <ul> element below
    const navItemsDOM = useRef<HTMLUListElement | null>(null);
    const [showMobileMenu, setShowMobileMenu] = useState<boolean>(false);

    // Rebranded navigation links: changed "Events" to "Order"
    const nav = [
        {
            label: 'Home',
            href: '/',
        },
        {
            label: 'Menu',
            href: '/menu',
        },
        {
            label: 'Order',
            href: '/events',
        },
        {
            label: 'Reservation',
            href: '/reservation',
        },
    ];

    useEffect(() => {
        const handleMobileNavClickOutside = (event: MouseEvent) => {
            const navItemsEl = navItemsDOM.current;

            if (navItemsEl && !navItemsEl.contains(event.target as Node)) {
                setShowMobileMenu(false);
            }
        };

        if (showMobileMenu) {
            document.addEventListener('click', handleMobileNavClickOutside);
        } else {
            document.removeEventListener('click', handleMobileNavClickOutside);
        }

        return () => {
            document.removeEventListener('click', handleMobileNavClickOutside);
        };
    }, [showMobileMenu]);

    return (
        <header className="relative z-50 bg-[#D7BDA6] py-4 lg:py-6 shadow-[0_4px_20px_rgba(76,43,8,0.06)] border-b border-[#4C2B08]/5 transition-colors duration-500">
            <div className="relative z-10 container mx-auto px-4">
                <nav className="relative flex items-center justify-between">
                    {/* Premium Cravenest Custom Text Logo with Gold Saffron accent */}
                    <Link
                        href="/"
                        className="flex md:flex-1 items-center select-none"
                        aria-label="Cravenest Home"
                    >
                        <span className="text-xl md:text-2xl font-black font-Gloock uppercase tracking-[0.18em] text-[#4C2B08]">
                            CRA<span className="text-[#FFB03A] drop-shadow-[0_0_8px_rgba(255,176,58,0.4)] transition-all duration-300">V</span>ENEST
                        </span>
                    </Link>

                    {/* Navigation Items - Colored in Deep Espresso for high-contrast readability against Vanilla */}
                    <ul
                        ref={navItemsDOM}
                        className={classNames(
                            'flex flex-col gap-5 max-md:absolute max-md:left-0 max-md:-bottom-[17px] max-md:translate-y-full max-md:w-full max-md:bg-[#D7BDA6] max-md:p-6 max-md:border-t max-md:border-[#4C2B08]/10 max-md:shadow-xl md:flex-row md:flex-1 md:justify-center lg:gap-8 z-50',
                            {
                                'flex': showMobileMenu,
                                'max-md:hidden': !showMobileMenu,
                            },
                        )}
                    >
                        {nav.map((item, index) => (
                            <li key={index}>
                                <Link
                                    href={item.href}
                                    onClick={() => setShowMobileMenu(false)}
                                    className="text-base md:text-xs lg:text-sm leading-none tracking-[0.05em] uppercase text-[#4C2B08] font-black hover:text-[#AB7743] transition-colors"
                                >
                                    {item.label}
                                </Link>
                            </li>
                        ))}
                        <li>
                            <Link
                                href="/contact"
                                onClick={() => setShowMobileMenu(false)}
                                className="text-base leading-none tracking-[0.05em] uppercase text-[#4C2B08] font-black md:hidden"
                            >
                                Contact us
                            </Link>
                        </li>
                    </ul>

                    {/* Premium Espresso Styled Contact CTA Button */}
                    <div className="flex justify-end max-md:hidden md:flex-1">
                        <Btn 
                            to="/contact" 
                            className="uppercase bg-[#4C2B08] hover:bg-[#AB7743] text-white px-5 py-2.5 rounded-full text-xs font-black tracking-widest transition-colors shadow-md"
                        >
                            <span>Contact us</span>
                        </Btn>
                    </div>

                    {/* Responsive Mobile Hamburgers (Clean Inline SVGs to ensure compile safety) */}
                    <button
                        className="flex md:hidden p-2 text-[#4C2B08] hover:text-[#AB7743] transition-colors cursor-pointer"
                        aria-label="Toggle mobile menu"
                        onClick={() => setShowMobileMenu((prev) => !prev)}
                    >
                        {showMobileMenu ? (
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        ) : (
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        )}
                    </button>
                </nav>
            </div>
        </header>
    );
};

export default Header;

