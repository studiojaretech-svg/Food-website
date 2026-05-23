import Link from 'next/link';
import React from 'react';

const Footer: React.FC = async () => {
    // Rebranded nav categories: removed Tastyyy emails and added Cravenest links
    const nav = [
        {
            title: 'Connect',
            items: [
                {
                    label: 'Instagram',
                    href: 'https://instagram.com',
                },
                {
                    label: 'Facebook',
                    href: 'https://facebook.com',
                },
                {
                    label: 'X',
                    href: 'https://x.com',
                },
            ],
        },
        {
            title: 'Get in touch',
            items: [
                {
                    label: '(+234) 812 9232 823',
                    href: 'tel:+2348129232823',
                },
                {
                    label: 'hello@cravenest.com',
                    href: 'mailto:hello@cravenest.com',
                },
            ],
        },
        {
            title: 'Shop',
            items: [
                {
                    label: 'Pickup',
                    href: '#',
                },
                {
                    label: 'Location',
                    href: '#',
                },
            ],
        },
        {
            title: 'Legal',
            items: [
                {
                    label: 'Terms & condition',
                    href: '/legal',
                },
                {
                    label: 'Privacy policy',
                    href: '/legal',
                },
            ],
        },
    ];

    return (
        <footer className="bg-appText py-12 md:py-16">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-[auto,1fr] gap-8 md:gap-16 items-start">
                    
                    {/* Rebranded Localized Nigerian Address block */}
                    <p className="text-sm leading-relaxed uppercase tracking-wide text-appGray-500 text-center md:text-left font-medium">
                        Plot 14, Block III,
                        <br />
                        Wole Ariyo Street, Lekki Phase 1,
                        <br />
                        Lagos State, Nigeria.
                    </p>

                    {/* Footer Nav Links */}
                    <nav className="grid grid-cols-2 lg:grid-cols-4 gap-x-12 gap-y-8 justify-between max-md:max-w-[280px] mx-auto md:ml-auto md:mr-0">
                        {nav.map((col, index) => {
                            return (
                                <div key={index} className="footer--nav-col text-left">
                                    <div className="text-sm font-black tracking-widest uppercase text-white mb-3.5">
                                        {col.title}
                                    </div>
                                    <ul className="grid grid-cols-1 gap-3">
                                        {col.items.map((item, itemIndex) => {
                                            return (
                                                <li
                                                    key={itemIndex}
                                                    className="relative leading-none text-[#9c9090] max-w-max"
                                                >
                                                    <Link
                                                        href={item.href}
                                                        target={
                                                            item.href.startsWith(
                                                                'http',
                                                            )
                                                                ? '_blank'
                                                                : '_self'
                                                        }
                                                        className="text-xs font-semibold hover:text-white transition-colors uppercase tracking-wider"
                                                    >
                                                        {item.label}
                                                    </Link>
                                                </li>
                                            );
                                        })}
                                    </ul>
                                </div>
                            );
                        })}
                    </nav>
                </div>

                {/* Bottom Row - Removed all BCMS branding, powered blocks, and replaced with clean Cravenest metadata */}
                <div className="flex flex-col md:flex-row justify-between items-center pt-10 mt-10 border-t border-white/5 gap-4">
                    <div className="flex items-center">
                        <span className="text-sm font-black tracking-widest uppercase text-white font-Gloock">
                            CRA<span className="text-[#FFB03A]">V</span>ENEST
                        </span>
                    </div>
                    <div className="text-[10px] sm:text-xs uppercase tracking-widest text-appGray-500 font-bold">
                        &copy; {new Date().getFullYear()} Cravenest. All rights reserved.
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;

