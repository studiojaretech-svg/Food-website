'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import classNames from 'classnames';
import Btn from '../Btn';
import { useCart } from '@/context/CartContext';

const Header: React.FC = () => {
    const navItemsDOM = useRef<HTMLUListElement | null>(null);
    const cartDrawerRef = useRef<HTMLDivElement | null>(null);
    
    const [showMobileMenu, setShowMobileMenu] = useState<boolean>(false);
    const [showCartDrawer, setShowCartDrawer] = useState<boolean>(false);

    // Form states for instant drawer checkout
    const [customerName, setCustomerName] = useState('');
    const [phone, setPhone] = useState('');
    const [deliveryAddress, setDeliveryAddress] = useState('');
    const [additionalNotes, setAdditionalNotes] = useState('');

    const { cart, cartCount, cartTotal, updateQuantity, removeFromCart, checkoutViaWhatsApp } = useCart();

    // Rebranded navigation links: changed "Events" to "Order"
    const nav = [
        { label: 'Home', href: '/' },
        { label: 'Menu', href: '/menu' },
        { label: 'Order', href: '/events' },
        { label: 'Reservation', href: '/reservation' },
    ];

    // Get the top 3 items for display in the mini-cart menu
    const previewCartItems = cart.slice(0, 3);
    const remainingItemsCount = cartCount - previewCartItems.reduce((acc, item) => acc + item.quantity, 0);

    // Close mobile navigation or cart drawer if clicking outside
    useEffect(() => {
        const handleOutsideClick = (event: MouseEvent) => {
            const target = event.target as Node;
            
            if (showMobileMenu && navItemsDOM.current && !navItemsDOM.current.contains(target)) {
                setShowMobileMenu(false);
            }
            if (showCartDrawer && cartDrawerRef.current && !cartDrawerRef.current.contains(target)) {
                // Ignore click if it's on the cart toggle button itself to avoid immediate re-triggering
                const isCartToggle = (event.target as HTMLElement).closest('.cart-toggle-btn');
                if (!isCartToggle) {
                    setShowCartDrawer(false);
                }
            }
        };

        document.addEventListener('mousedown', handleOutsideClick);
        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
        };
    }, [showMobileMenu, showCartDrawer]);

    const handleCheckoutSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!customerName || !phone || !deliveryAddress) {
            alert("Please fill in your Name, Phone, and Delivery Address to place an order.");
            return;
        }
        checkoutViaWhatsApp({
            customerName,
            phone,
            deliveryAddress,
            additionalNotes
        });
    };

    return (
        <header className="relative z-50 bg-[#D7BDA6] py-4 lg:py-6 shadow-[0_4px_20px_rgba(76,43,8,0.06)] border-b border-[#4C2B08]/5 transition-colors duration-500">
            <div className="relative z-10 container mx-auto px-4">
                <nav className="relative flex items-center justify-between">
                    
                    {/* Premium Cravenest Custom Text Logo */}
                    <Link
                        href="/"
                        className="flex md:flex-1 items-center select-none"
                        aria-label="Cravenest Home"
                    >
                        <span className="text-xl md:text-2xl font-black font-Gloock uppercase tracking-[0.18em] text-[#4C2B08]">
                            CRA<span className="text-[#FFB03A] drop-shadow-[0_0_8px_rgba(255,176,58,0.4)] transition-all duration-300">V</span>ENEST
                        </span>
                    </Link>

                    {/* Navigation Items */}
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

                    {/* Cart Icon & Contact CTA Container */}
                    <div className="flex items-center justify-end gap-4 md:flex-1">
                        
                        {/* Interactive Cart Button with Floating Counter Badge */}
                        <button
                            onClick={() => setShowCartDrawer(!showCartDrawer)}
                            className="cart-toggle-btn relative p-2.5 text-[#4C2B08] hover:text-[#AB7743] transition-colors cursor-pointer rounded-full bg-[#4C2B08]/5 hover:bg-[#4C2B08]/10 flex items-center justify-center"
                            aria-label="Open shopping cart drawer"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                            </svg>
                            {cartCount > 0 && (
                                <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#FFB03A] text-[#150a02] text-[10px] font-black rounded-full flex items-center justify-center shadow-md animate-bounce">
                                    {cartCount}
                                </span>
                            )}
                        </button>

                        {/* Contact CTA */}
                        <div className="max-md:hidden">
                            <Btn 
                                to="/contact" 
                                className="uppercase bg-[#4C2B08] hover:bg-[#AB7743] text-white px-5 py-2.5 rounded-full text-xs font-black tracking-widest transition-colors shadow-md"
                            >
                                <span>Contact us</span>
                            </Btn>
                        </div>

                        {/* Mobile Menu Hamburger */}
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
                    </div>
                </nav>
            </div>

            {/* SLIDING MINI-CART DRAWER (Slide out from Right) */}
            <div 
                ref={cartDrawerRef}
                className={classNames(
                    'fixed inset-y-0 right-0 w-full max-w-sm sm:max-w-md bg-[#150a02] text-[#FFFDF4] shadow-2xl z-50 p-6 flex flex-col justify-between transition-transform duration-500 ease-in-out border-l border-white/5',
                    {
                        'translate-x-0': showCartDrawer,
                        'translate-x-full': !showCartDrawer,
                    }
                )}
            >
                {/* Drawer Header */}
                <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
                    <div className="flex items-center gap-2">
                        <span className="text-[#FFB03A] text-lg">✦</span>
                        <h2 className="text-lg font-black tracking-widest uppercase font-Gloock text-white">Your Cart</h2>
                        <span className="text-xs bg-[#FFB03A] text-[#150a02] px-2 py-0.5 rounded-full font-black ml-1">
                            {cartCount}
                        </span>
                    </div>
                    <button 
                        onClick={() => setShowCartDrawer(false)}
                        className="p-1 text-white/70 hover:text-white transition-colors cursor-pointer rounded-full hover:bg-white/10"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {/* Cart Preview (Up to 3 Items scroll-area) */}
                <div className="flex-1 overflow-y-auto mb-6 pr-2 space-y-4 max-h-[45vh]">
                    {cart.length > 0 ? (
                        <>
                            {previewCartItems.map((item) => (
                                <div key={item.id} className="flex items-center gap-4 bg-white/5 p-3 rounded-2xl border border-white/5">
                                    <div className="w-16 h-16 rounded-xl overflow-hidden shrink-0 border border-white/10">
                                        <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                                    </div>
                                    <div className="flex-1 text-left">
                                        <h4 className="text-sm font-black text-white uppercase tracking-wider line-clamp-1">{item.title}</h4>
                                        <p className="text-xs text-[#FFB03A] font-Gloock mt-1">₦{item.price.toLocaleString()}</p>
                                        
                                        {/* Simple Quantity Toggles */}
                                        <div className="flex items-center gap-2 mt-2">
                                            <button 
                                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                className="w-5 h-5 rounded-full bg-white/10 flex items-center justify-center text-white text-xs hover:bg-white/25"
                                            >
                                                -
                                            </button>
                                            <span className="text-xs font-black text-white">{item.quantity}</span>
                                            <button 
                                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                className="w-5 h-5 rounded-full bg-white/10 flex items-center justify-center text-white text-xs hover:bg-white/25"
                                            >
                                                +
                                            </button>
                                        </div>
                                    </div>
                                    <button 
                                        onClick={() => removeFromCart(item.id)}
                                        className="text-white/40 hover:text-red-400 p-1 cursor-pointer"
                                    >
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                        </svg>
                                    </button>
                                </div>
                            ))}

                            {remainingItemsCount > 0 && (
                                <p className="text-xs text-[#D7BDA6] tracking-wide text-center uppercase font-bold py-2">
                                    ✦ Plus {remainingItemsCount} more delicious selection(s) below ✦
                                </p>
                            )}
                        </>
                    ) : (
                        <div className="flex flex-col items-center justify-center py-16 text-center text-white/50">
                            <svg className="w-12 h-12 mb-3" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                            </svg>
                            <p className="text-xs uppercase tracking-widest font-black">Your Cart is Empty</p>
                        </div>
                    )}
                </div>

                {/* Subtotal Display & Checkout Form (Only visible if Cart contains items) */}
                {cart.length > 0 && (
                    <div className="border-t border-white/10 pt-4 mt-auto">
                        <div className="flex items-center justify-between mb-4">
                            <span className="text-sm font-bold uppercase tracking-widest text-[#D7BDA6]">Subtotal</span>
                            <span className="text-lg font-black font-Gloock text-[#FFB03A]">₦{cartTotal.toLocaleString()}</span>
                        </div>

                        {/* Interactive Instant Ordering Fields */}
                        <form onSubmit={handleCheckoutSubmit} className="space-y-3">
                            <input 
                                type="text" 
                                placeholder="Your Full Name" 
                                required
                                value={customerName}
                                onChange={(e) => setCustomerName(e.target.value)}
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs text-white placeholder-white/30 focus:outline-none focus:border-[#FFB03A] transition-colors"
                            />
                            <input 
                                type="tel" 
                                placeholder="Phone Number" 
                                required
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs text-white placeholder-white/30 focus:outline-none focus:border-[#FFB03A] transition-colors"
                            />
                            <textarea 
                                placeholder="Delivery Address" 
                                required
                                rows={2}
                                value={deliveryAddress}
                                onChange={(e) => setDeliveryAddress(e.target.value)}
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs text-white placeholder-white/30 focus:outline-none focus:border-[#FFB03A] transition-colors resize-none"
                            />
                            <input 
                                type="text" 
                                placeholder="Notes (e.g. Extra pepper, delivery hour)" 
                                value={additionalNotes}
                                onChange={(e) => setAdditionalNotes(e.target.value)}
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs text-white placeholder-white/30 focus:outline-none focus:border-[#FFB03A] transition-colors"
                            />

                            {/* Direct WhatsApp dispatcher */}
                            <button
                                type="submit"
                                className="w-full bg-[#FFB03A] hover:bg-amber-400 text-[#150a02] rounded-full py-3 text-xs font-black tracking-widest uppercase transition-all duration-300 shadow-md cursor-pointer hover:scale-[1.01] active:scale-[0.99] mt-2 flex items-center justify-center gap-1.5"
                            >
                                <span>Place Order via WhatsApp</span>
                            </button>
                        </form>
                    </div>
                )}
            </div>

            {/* Back-shadow drop overlay when cart drawer is active */}
            {showCartDrawer && (
                <div className="fixed inset-0 bg-black/45 backdrop-blur-sm z-40 transition-opacity" />
            )}
        </header>
    );
};

export default Header;

