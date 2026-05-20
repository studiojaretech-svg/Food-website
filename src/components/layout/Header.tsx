'use client';

import React, { useEffect, useRef, useState } from 'react';
import MenuIcon from '@/assets/icons/menu.svg';
import XIcon from '@/assets/icons/x.svg';
import Logo from '@/assets/icons/logo.svg';
import Link from 'next/link';
import classNames from 'classnames';
import Btn from '../Btn';

const Header: React.FC = () => {
    const navItemsDOM = useRef<HTMLDivElement | null>(null);
    const [showMobileMenu, setShowMobileMenu] = useState<boolean>(false);

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
            label: 'Events',
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
        <header className="relative z-50" ref={navItemsDOM}>
            <div className="relative z-10 container mx-auto px-4">
                <nav className="relative flex items-center justify-between pt-6 lg:pt-8">
                    {/* Brand Identity / Logo Wrapper */}
                    <Link
                        href="/"
                        className="flex md:flex-1"
                        aria-label="Home page"
                    >
                        <div
                            className={classNames(
                                'w-[60px] md:w-[101px] flex items-center justify-start text-current transition-all duration-300',
                                {
                                    'max-md:grayscale-0 max-md:brightness-[0.2] max-md:invert-0':
                                        showMobileMenu,
                                }
                            )}
                        >
                            <Logo />
                        </div>
                    </Link>

                    {/* Navigation Menu */}
                    <ul
                        className={classNames(
                            'flex flex-col gap-4 max-md:absolute max-md:left-0 max-md:-bottom-9 max-md:translate-y-full max-md:w-full md:flex-row md:flex-1 md:justify-center lg:gap-8',
                            {
                                'flex flex-col': showMobileMenu,
                                'max-md:hidden': !showMobileMenu,
                            },
                        )}
                    >
                        {nav.map((item, index) => (
                            <li key={index} className="text-center md:text-left">
                                <Link
                                    href={item.href}
                                    onClick={() => setShowMobileMenu(false)}
                                    className="text-lg leading-none tracking-[-0.41px] uppercase transition-colors duration-200 hover:text-appAccent md:text-sm font-medium"
                                >
                                    {item.label}
                                </Link>
                            </li>
                        ))}
                        <li className="text-center md:hidden">
                            <Link
                                href="/contact"
                                onClick={() => setShowMobileMenu(false)}
                                className="text-lg leading-none tracking-[-0.41px] uppercase font-medium"
                            >
                                Contact us
                            </Link>
                        </li>
                    </ul>

                    {/* Desktop CTA Button */}
                    <div className="flex justify-end max-md:hidden md:flex-1">
                        <Btn to="/contact" className="uppercase">
                            <span>Contact us</span>
                        </Btn>
                    </div>

                    {/* Mobile Menu Toggle Button */}
                    <button
                        className="flex md:hidden p-2 focus:outline-none text-current"
                        aria-label="Toggle mobile menu"
                        onClick={() => setShowMobileMenu((prev) => !prev)}
                    >
                        <div className="w-6 h-6 flex items-center justify-center text-current">
                            {showMobileMenu ? <XIcon /> : <MenuIcon />}
                        </div>
                    </button>
                </nav>
            </div>

            {/* Backdrop Mask */}
            {showMobileMenu && (
                <div className="fixed inset-0 w-screen h-screen bg-appAccent md:hidden" />
            )}
        </header>
    );
};

export default Header;
