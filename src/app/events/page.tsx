'use client';

import React, { useState, useEffect, useRef, useMemo } from 'react';
import Link from 'next/link';
import classnames from 'classnames';
import { useCart } from '@/context/CartContext';
import { A11y } from 'swiper/modules';
import SwiperCore from 'swiper';
import { SwiperSlide, Swiper } from 'swiper/react';
import 'swiper/css';

SwiperCore.use([A11y]);

// Core types for food card listings and specials packages
interface FoodCard {
    id: number;
    name: string;
    category: string;
    price: string;
    portion: string;
    badge?: string;
    image: string;
    ingredients: string;
}

interface LuxuryPackage {
    id: number;
    title: string;
    price: string;
    category: 'TRAYS' | 'HAMPERS' | 'FRUITS' | 'CONTAINERS';
    description: string;
    badge: string;
    image: string;
}

const packageCategories = [
    { id: 'ALL', name: 'All Packs' },
    { id: 'TRAYS', name: 'Gourmet Trays' },
    { id: 'HAMPERS', name: 'Goodie Hampers' },
    { id: 'FRUITS', name: 'Fruit Baskets' },
    { id: 'CONTAINERS', name: 'Bulk Packs' },
];

const OrderPage: React.FC = () => {
    const { cart, addToCart, removeFromCart } = useCart();
    
    // Master Switch: 'seasons' (Customer Favourites) or 'specials' (Gourmet Specials)
    const [masterTab, setMasterTab] = useState<'seasons' | 'specials'>('seasons');
    
    // Nested Category States
    const [selectedSeasonCategory, setSelectedSeasonCategory] = useState('Trending');
    const [activePackageCategory, setActivePackageCategory] = useState('ALL');
    
    // Card Active states for ingredients popup
    const [activeCardId, setActiveCardId] = useState<number | null>(null);
    const [isVisible, setIsVisible] = useState(false);
    const pageRef = useRef<HTMLDivElement>(null);

    // Setup Scroll Entrance Intersection Observer
    useEffect(() => {
        const currentRef = pageRef.current;
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                }
            },
            { threshold: 0.05 }
        );

        if (currentRef) {
            observer.observe(currentRef);
        }

        return () => {
            if (currentRef) {
                observer.unobserve(currentRef);
            }
        };
    }, []);

    const seasonCategories = ['Trending', 'Traditional Rice', 'Spiced Grills', 'Pastries'];

    // High-fidelity curated gourmet dishes
    const popularFoods: FoodCard[] = [
        {
            id: 1,
            name: 'Smoky Party Jollof',
            category: 'Traditional Rice',
            price: '₦4,500',
            portion: 'Single Platter',
            badge: 'New',
            image: 'https://images.unsplash.com/photo-1541832676-9b763b0239ab?auto=format&fit=crop&w=400&h=400&q=80',
            ingredients: 'Long-grain parboiled rice, smoky tatashe tomato reduction, golden sweet plantains, bay leaf infusion.',
        },
        {
            id: 2,
            name: 'Smoked Beef Suya',
            category: 'Spiced Grills',
            price: '₦5,000',
            portion: 'Double Skewer',
            badge: 'Hit!',
            image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=400&h=400&q=80',
            ingredients: 'Tender thin-sliced beef flanks, roasted ground peanut dust, authentic hot yaji spice, sweet red onion rings.',
        },
        {
            id: 3,
            name: 'Glazed Doughnuts',
            category: 'Pastries',
            price: '₦2,500',
            portion: '6 pcs Portion',
            badge: 'Popular',
            image: 'https://images.unsplash.com/photo-1551024601-bec78aea704b?auto=format&fit=crop&w=400&h=400&q=80',
            ingredients: 'Light yeasted doughnut dough, rich sweet sugar glaze, premium organic vanilla bean finish.',
        },
        {
            id: 4,
            name: 'Coconut Fried Rice',
            category: 'Traditional Rice',
            price: '₦4,800',
            portion: 'Gourmet Pack',
            image: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?auto=format&fit=crop&w=400&h=400&q=80',
            ingredients: 'Jasmine rice simmered in fresh coconut milk, sweet green peas, diced carrots, seasoned local white shrimp.',
        },
        {
            id: 5,
            name: 'Gourmet Crispy Samosas',
            category: 'Pastries',
            price: '₦3,000',
            portion: '6 pcs Portion',
            badge: 'Hot!',
            image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=400&h=400&q=80',
            ingredients: 'Flaky golden triangular pastry shells, spiced minced beef and green pea filling, aromatic garlic seasonings.',
        },
        {
            id: 6,
            name: 'Peppered BBQ Croaker',
            category: 'Spiced Grills',
            price: '₦8,500',
            portion: 'Full Fish',
            badge: 'Chef Choice',
            image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=400&h=400&q=80',
            ingredients: 'Whole grilled river croaker, sweet scotch bonnet glaze, green bell pepper reduction, raw lime wedges.',
        },
        {
            id: 7,
            name: 'Scotch Bonnet Chicken',
            category: 'Spiced Grills',
            price: '₦4,200',
            portion: 'Single Drum',
            image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=400&h=400&q=80',
            ingredients: 'Succulent chicken drumstick marinated in roasted habaneros, sweet dark honey sauce, and organic ginger roots.',
        },
        {
            id: 8,
            name: 'Rich Efo Riro soup',
            category: 'Trending',
            price: '₦6,500',
            portion: 'Single Bowl',
            badge: 'Popular',
            image: 'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=400&h=400&q=80',
            ingredients: 'Freshly shredded shoko spinach leaves, cooked tripe and cowhide, local locust bean seasoning, red palm oil sauce.',
        },
    ];

    const luxuryPackages = useMemo<LuxuryPackage[]>(() => [
        {
            id: 1,
            title: 'Classic Celebration Small Chops Tray',
            price: '₦28,000',
            category: 'TRAYS',
            description: 'A loaded, camera-ready tray featuring crispy golden samosas, spring rolls, mini puff puff, barbecue chicken wings, and sweet chili glazed dipping sauces.',
            badge: 'Best Seller',
            image: 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=600&h=600&q=80',
        },
        {
            id: 2,
            title: 'Aesthetic Sweet Goodies Gift Hamper',
            price: '₦45,000',
            category: 'HAMPERS',
            description: 'Curated birthday & celebration goodies hamper. Includes premium chocolate assortments, freshly baked organic ginger cookies, and a premium non-alcoholic sparkling wine.',
            badge: 'Luxury Gift',
            image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=600&h=600&q=80',
        },
        {
            id: 3,
            title: 'Tropical Fresh Exotic Fruit Platter',
            price: '₦22,000',
            category: 'FRUITS',
            description: 'Vibrantly sliced exotic fruit basket containing juicy pineapples, seedless red grapes, strawberries, sweet kiwi slices, and a bottle of organic citrus honey glaze.',
            badge: 'Healthy & Fresh',
            image: 'https://images.unsplash.com/photo-1610970881699-44a5587cabec?auto=format&fit=crop&w=600&h=600&q=80',
        },
        {
            id: 4,
            title: 'Mega Feast Bulk Family Food Pack',
            price: '₦65,000',
            category: 'CONTAINERS',
            description: 'Premium stack of four meal-prep lock-tight containers. Loaded with smoky party Jollof, spicy Peppered Chicken, rich Efo Riro, and fried plantain sides.',
            badge: 'Meal Prep',
            image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&h=600&q=80',
        },
        {
            id: 5,
            title: 'Signature Sliders & Wings Platter',
            price: '₦32,000',
            category: 'TRAYS',
            description: 'Ultimate party tray containing mini beef sliders with caramelized onions, honey glazed chicken legs, crispy French fries, and garlic dip cups.',
            badge: 'Trending',
            image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=600&h=600&q=80',
        },
        {
            id: 6,
            title: 'The Elite Cocktail & Treats Hamper',
            price: '₦55,000',
            category: 'HAMPERS',
            description: 'A luxurious hamper basket containing custom cocktail mixers, premium drinking glass flutes, imported sweets, and hand-dipped strawberry biscuits.',
            badge: 'Limited Edition',
            image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=600&h=600&q=80',
        },
    ], []);

    // Filtered lists based on tab and nested categories
    const filteredFoods = selectedSeasonCategory === 'Trending' 
        ? popularFoods.filter(food => food.id === 1 || food.id === 2 || food.id === 3 || food.id === 8)
        : popularFoods.filter(food => food.category === selectedSeasonCategory);

    const filteredPackages = useMemo(() => {
        if (activePackageCategory === 'ALL') return luxuryPackages;
        return luxuryPackages.filter((pkg) => pkg.category === activePackageCategory);
    }, [activePackageCategory, luxuryPackages]);

    // Cart Handlers
    const toggleSeasonFoodCart = (food: FoodCard) => {
        const cartId = `fav_${food.id}`;
        const isItemAdded = cart.some(item => item.id === cartId);

        if (isItemAdded) {
            removeFromCart(cartId);
        } else {
            const numericPrice = parseInt(food.price.replace(/[^0-9]/g, ''), 10) || 0;
            addToCart({
                id: cartId,
                title: food.name,
                price: numericPrice,
                image: food.image,
                category: food.category
            });
        }
    };

    const togglePackageInCart = (pkg: LuxuryPackage) => {
        const cartId = `pkg_${pkg.id}`;
        const isAdded = cart.some(item => item.id === cartId);

        if (isAdded) {
            removeFromCart(cartId);
        } else {
            const numericPrice = parseInt(pkg.price.replace(/[^0-9]/g, ''), 10) || 0;
            addToCart({
                id: cartId,
                title: pkg.title,
                price: numericPrice,
                image: pkg.image,
                category: pkg.category
            });
        }
    };

    // Custom Headline Highlights: renders 'FAVOURITES' where ONLY the letter 'I' is styled in saffron gold
    const renderStyledTitle = () => {
        return (
            <span className="flex flex-wrap justify-center gap-x-3">
                <span className="text-[#4C2B08]">CUSTOMER</span>
                <span className="inline-flex">
                    {'FAVOURITES'.split('').map((char, idx) => {
                        const isGoldI = char.toUpperCase() === 'I';
                        return (
                            <span 
                                key={idx}
                                className={isGoldI ? 'text-[#FFB03A] font-black drop-shadow-[0_0_8px_rgba(255,176,58,0.55)]' : 'text-[#4C2B08]'}
                            >
                                {char}
                            </span>
                        );
                    })}
                </span>
            </span>
        );
    };

    // Highlights EXACTLY the word "special" to be Saffron Gold inside the tagline
    const renderTaglineWithGold = () => {
        const rawTagline = "Celebrating a special moment? Let us style your perfect food trays & luxury hampers!";
        return (
            <span>
                {rawTagline.split(' ').map((word, idx) => {
                    const cleanWord = word.replace(/[?,.!]/g, '').toLowerCase();
                    const isGoldSpecial = cleanWord === 'special';
                    return (
                        <span 
                            key={idx} 
                            className={isGoldSpecial ? 'text-[#FFB03A] font-black drop-shadow-[0_0_8px_rgba(255,176,58,0.55)]' : ''}
                        >
                            {word}{' '}
                        </span>
                    );
                })}
            </span>
        );
    };

    return (
        <section ref={pageRef} className="relative min-h-screen bg-[#D7BDA6] py-16 lg:py-24 overflow-hidden">
            {/* Global style injector to force layout context to match the Vanilla backdrop */}
            <style dangerouslySetInnerHTML={{__html: `
                body, html, main, #__next, .app-layout-wrapper {
                    background-color: #D7BDA6 !important;
                }
            `}} />

            {/* Ambient gold glow in the background */}
            <div className="absolute top-[20%] left-[-10%] w-[40%] h-[40%] rounded-full bg-white/20 blur-[130px] pointer-events-none" />
            <div className="absolute bottom-[20%] right-[-10%] w-[40%] h-[40%] rounded-full bg-[#4C2B08]/5 blur-[130px] pointer-events-none" />

            <div className="container mx-auto px-4 max-w-[1200px] relative z-10 text-center">
                
                {/* 1. MASTER PILOT TOGGLE SWITCH */}
                <div 
                    className={`flex flex-col items-center mb-12 lg:mb-16 transition-all duration-[1000ms] transform ${
                        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                    }`}
                >
                    <div className="text-xs font-black tracking-widest text-[#4C2B08] uppercase mb-4 px-3 py-1 bg-[#4C2B08]/5 rounded-full border border-[#4C2B08]/15">
                        ✦ Cravenest Gourmet Menu ✦
                    </div>
                    <h1 className="text-3xl lg:text-5xl font-black font-Gloock uppercase text-[#4C2B08] tracking-tight mb-8">
                        Order Catalog
                    </h1>

                    {/* Master Switch Panel */}
                    <div className="flex bg-[#150a02] p-1.5 rounded-full border border-white/5 shadow-lg max-w-sm sm:max-w-md w-full">
                        <button
                            onClick={() => setMasterTab('seasons')}
                            className={classnames(
                                'flex-1 py-3 px-6 rounded-full text-xs font-black uppercase tracking-widest transition-all duration-300 cursor-pointer',
                                {
                                    'bg-[#FFB03A] text-[#150a02] shadow-md': masterTab === 'seasons',
                                    'text-[#D7BDA6]/70 hover:text-white': masterTab !== 'seasons'
                                }
                            )}
                        >
                            Favourites
                        </button>
                        <button
                            onClick={() => setMasterTab('specials')}
                            className={classnames(
                                'flex-1 py-3 px-6 rounded-full text-xs font-black uppercase tracking-widest transition-all duration-300 cursor-pointer',
                                {
                                    'bg-[#FFB03A] text-[#150a02] shadow-md': masterTab === 'specials',
                                    'text-[#D7BDA6]/70 hover:text-white': masterTab !== 'specials'
                                }
                            )}
                        >
                            Specials
                        </button>
                    </div>
                </div>

                {/* 2. TAB CONTENT MODULES */}
                
                {/* TAB A: Customer Favourites (Seasons) */}
                {masterTab === 'seasons' && (
                    <div className="animate-fade-in">
                        {/* Upper Section Header */}
                        <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-12 pb-6 border-b border-[#4C2B08]/10 w-full text-left">
                            
                            {/* Inner Filters category switch */}
                            <div className="flex flex-col space-y-3 w-full md:w-auto">
                                <span className="text-[10px] uppercase tracking-widest font-black text-[#4C2B08]/60">
                                    Filter by category:
                                </span>
                                <div className="flex gap-2 overflow-x-auto max-sm:w-full scrollbar-none pb-2">
                                    {seasonCategories.map((cat) => (
                                        <button
                                            key={cat}
                                            onClick={() => setSelectedSeasonCategory(cat)}
                                            className={classnames(
                                                'px-4 py-2 text-xs font-black uppercase tracking-wider rounded-full border transition-all cursor-pointer whitespace-nowrap',
                                                {
                                                    'border-[#4C2B08] bg-[#4C2B08] text-white': selectedSeasonCategory === cat,
                                                    'border-[#4C2B08]/20 text-[#4C2B08]/70 hover:text-[#4C2B08] hover:border-[#4C2B08]': selectedSeasonCategory !== cat
                                                }
                                            )}
                                        >
                                            {cat}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Section Headline with gold highlight glyph rule */}
                            <div className="text-center md:text-right max-w-sm">
                                <h2 className="text-2xl font-black font-Gloock uppercase leading-tight">
                                    {renderStyledTitle()}
                                </h2>
                                <p className="text-[9px] tracking-widest uppercase text-[#4C2B08]/50 mt-1 font-bold">
                                    Our top-rated hand-styled signature dishes
                                </p>
                            </div>
                        </div>

                        {/* Customer Favourites Platters Cards Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
                            {filteredFoods.map((food) => {
                                const isHoveredOrHeld = activeCardId === food.id;
                                const cartId = `fav_${food.id}`;
                                const isItemAdded = cart.some(item => item.id === cartId);

                                return (
                                    <div 
                                        key={food.id}
                                        onMouseEnter={() => setActiveCardId(food.id)}
                                        onMouseLeave={() => setActiveCardId(null)}
                                        onTouchStart={(e) => {
                                            const isBtn = (e.target as HTMLElement).closest('button');
                                            if (isBtn) return;
                                            setActiveCardId(food.id);
                   