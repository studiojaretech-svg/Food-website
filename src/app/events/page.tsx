'use client';

import React, { useState, useEffect, useRef, useMemo } from 'react';
import classnames from 'classnames';
import { useCart } from '@/context/CartContext';

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
    category: 'TRAYS' | 'HAMPERS';
    description: string;
    badge: string;
    image: string;
}

const packageCategories = [
    { id: 'ALL', name: 'All Packs' },
    { id: 'TRAYS', name: 'Gourmet Trays' },
    { id: 'HAMPERS', name: 'Goodie Hampers' },
];

const OrderPage: React.FC = () => {
    const { cart, addToCart, removeFromCart } = useCart();
    const [masterTab, setMasterTab] = useState<'seasons' | 'specials'>('seasons');
    const [selectedSeasonCategory, setSelectedSeasonCategory] = useState('Trending');
    const [activePackageCategory, setActivePackageCategory] = useState('ALL');
    const [activeCardId, setActiveCardId] = useState<number | null>(null);
    const [isVisible, setIsVisible] = useState(false);
    const pageRef = useRef<HTMLDivElement>(null);

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
        if (currentRef) observer.observe(currentRef);
        return () => {
            if (currentRef) observer.unobserve(currentRef);
        };
    }, []);

const seasonCategories = ['Trending', 'Traditional Rice', 'Spiced Grills'];

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
        }
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
        }
    ], []);

    const filteredFoods = selectedSeasonCategory === 'Trending' 
        ? popularFoods 
        : popularFoods.filter(food => food.category === selectedSeasonCategory);

    const filteredPackages = useMemo(() => {
        if (activePackageCategory === 'ALL') return luxuryPackages;
        return luxuryPackages.filter((pkg) => pkg.category === activePackageCategory);
    }, [activePackageCategory, luxuryPackages]);

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
            <style dangerouslySetInnerHTML={{__html: `
                body, html, main, #__next, .app-layout-wrapper {
                    background-color: #D7BDA6 !important;
                }
            `}} />

            <div className="absolute top-[20%] left-[-10%] w-[40%] h-[40%] rounded-full bg-white/20 blur-[130px] pointer-events-none" />
            <div className="absolute bottom-[20%] right-[-10%] w-[40%] h-[40%] rounded-full bg-[#4C2B08]/5 blur-[130px] pointer-events-none" />

            <div className="container mx-auto px-4 max-w-[1200px] relative z-10 text-center">
                
                <div className={classnames(
                    "flex flex-col items-center mb-12 lg:mb-16 transition-all duration-[1000ms] transform",
                    { 'opacity-100 translate-y-0': isVisible, 'opacity-0 translate-y-8': !isVisible }
                )}>
                    <div className="text-xs font-black tracking-widest text-[#4C2B08] uppercase mb-4 px-3 py-1 bg-[#4C2B08]/5 rounded-full border border-[#4C2B08]/15">
                        ✦ Cravenest Gourmet Menu ✦
                    </div>
                    <h1 className="text-3xl lg:text-5xl font-black font-Gloock uppercase text-[#4C2B08] tracking-tight mb-8">
                        Order Catalog
                    </h1>

                    <div className="flex bg-[#150a02] p-1.5 rounded-full border border-white/5 shadow-lg max-w-sm sm:max-w-md w-full">
                        <button
                            onClick={() => setMasterTab('seasons')}
                            className={classnames(
                                'flex-1 py-3 px-6 rounded-full text-xs font-black uppercase tracking-widest transition-all duration-300 cursor-pointer',
                                { 'bg-[#FFB03A] text-[#150a02] shadow-md': masterTab === 'seasons', 'text-[#D7BDA6]/70 hover:text-white': masterTab !== 'seasons' }
                            )}
                        >
                            Favourites
                        </button>
                        <button
                            onClick={() => setMasterTab('specials')}
                            className={classnames(
                                'flex-1 py-3 px-6 rounded-full text-xs font-black uppercase tracking-widest transition-all duration-300 cursor-pointer',
                                { 'bg-[#FFB03A] text-[#150a02] shadow-md': masterTab === 'specials', 'text-[#D7BDA6]/70 hover:text-white': masterTab !== 'specials' }
                            )}
                        >
                            Specials
                        </button>
                    </div>
                </div>

                {masterTab === 'seasons' && (
                    <div className="animate-fade-in">
                        <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-12 pb-6 border-b border-[#4C2B08]/10 w-full text-left">
                            <div className="flex flex-col space-y-3 w-full md:w-auto">
                                <span className="text-[10px] uppercase tracking-widest font-black text-[#4C2B08]/60">
                                    Filter by category:
                                </span>
                                <div className="flex gap-2 overflow-x-auto scrollbar-none pb-2">
                                    {seasonCategories.map((cat) => (
                                        <button
                                            key={cat}
                                            onClick={() => setSelectedSeasonCategory(cat)}
                                            className={classnames(
                                                'px-4 py-2 text-xs font-black uppercase tracking-wider rounded-full border transition-all cursor-pointer whitespace-nowrap',
                                                {
                                                    'border-[#4C2B08] bg-[#4C2B08] text-white': selectedSeasonCategory === cat,
                                                    'border-[#4C2B08]/20 text-[#4C2B08]/70 hover:text-[#4C2B08]': selectedSeasonCategory !== cat
                                                }
                                            )}
                                        >
                                            {cat}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="text-center md:text-right max-w-sm">
                                <h2 className="text-2xl font-black font-Gloock uppercase leading-tight">
                                    {renderStyledTitle()}
                                </h2>
                                <p className="text-[9px] tracking-widest uppercase text-[#4C2B08]/50 mt-1 font-bold">
                                    Our top-rated hand-styled signature dishes
                                </p>
                            </div>
                        </div>

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
                                            if ((e.target as HTMLElement).closest('button')) return;
                                            setActiveCardId(food.id);
                                        }}
                                        onTouchEnd={(e) => {
                                            if ((e.target as HTMLElement).closest('button')) return;
                                            setActiveCardId(null);
                                        }}
                                        className={classnames(
                                            'group relative p-6 rounded-3xl transition-all duration-300 flex flex-col justify-between overflow-visible cursor-pointer',
                                            {
                                                'bg-[#AB7743] text-white shadow-2xl scale-[1.02] border border-[#FFB03A]/30': isHoveredOrHeld,
                                                'bg-[#150a02] border border-white/5 shadow-lg text-white hover:border-[#B7957F]/25': !isHoveredOrHeld
                                            }
                                        )}
                                    >
                                        <div className="flex justify-between items-center mb-6">
                                            {food.badge ? (
                                                <span className={classnames(
                                                    'text-[9px] font-black tracking-widest uppercase px-2 py-0.5 rounded-full',
                                                    { 'bg-[#4C2B08] text-white': isHoveredOrHeld, 'bg-[#FFB03A]/15 border border-[#FFB03A]/35 text-[#FFB03A]': !isHoveredOrHeld }
                                                )}>
                                                    {food.badge}
                                                </span>
                                            ) : <div />}
                                            <div className={classnames(
                                                'w-6 h-6 rounded-full flex items-center justify-center transition-colors',
                                                { 'bg-[#4C2B08]/40 text-white': isHoveredOrHeld, 'bg-white/5 text-[#D7BDA6]': !isHoveredOrHeld }
                                            )}>
                                                <span className="text-xs font-semibold">i</span>
                                            </div>
                                        </div>

                                        <div className="relative flex justify-center items-center h-44 mb-6">
                                            <div className="absolute w-[80%] h-[80%] rounded-full bg-black/20 blur-xl pointer-events-none" />
                                            <div className="relative w-36 h-36 rounded-full overflow-hidden border-4 border-white shadow-[0_15px_30px_rgba(0,0,0,0.3)] transition-transform duration-500 group-hover:scale-105">
                                                <img src={food.image} alt={food.name} className="w-full h-full object-cover" />
                                            </div>

                                            {isHoveredOrHeld && (
                                                <div className="absolute inset-x-0 bottom-[-20px] mx-auto w-[92%] bg-[#361c07] border border-[#B7957F]/20 text-white rounded-xl p-3 shadow-2xl z-20 animate-fade-in pointer-events-none">
                                                    <p className="text-[9px] font-black uppercase tracking-widest text-[#FFB03A] mb-1">Ingredients</p>
                                                    <p className="text-[10px] leading-relaxed text-[#D7BDA6]/95">{food.ingredients}</p>
                                                </div>
                                            )}
                                        </div>

                                        <div className="text-left mt-auto">
                                            <h3 className="text-base font-black font-Gloock mb-4 tracking-tight uppercase leading-tight text-white">
                                                {food.name}
                                            </h3>

                                            <div className="flex justify-between items-end">
                                                <div className="flex flex-col">
                                                    <span className={classnames('text-[9px] uppercase font-bold tracking-widest', { 'text-white/60': isHoveredOrHeld, 'text-[#D7BDA6]/50': !isHoveredOrHeld })}>
                                                        {food.portion}
                                                    </span>
                                                    <span className={classnames('text-base font-black tracking-tight', { 'text-white font-Gloock': isHoveredOrHeld, 'text-[#FFB03A]': !isHoveredOrHeld })}>
                                                        {food.price}
                                                    </span>
                                                </div>

                                                <button
                                                    type="button"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        toggleSeasonFoodCart(food);
                                                    }}
                                                    onTouchStart={(e) => {
                                                        e.stopPropagation();
                                                        e.preventDefault();
                                                        toggleSeasonFoodCart(food);
                                                    }}
                                                    className={classnames(
                                                        'flex items-center justify-center rounded-lg px-3.5 py-1.5 transition-all text-[10px] font-black uppercase tracking-wider cursor-pointer shadow-md',
                                                        { 'bg-emerald-500 text-white': isItemAdded, 'bg-white text-neutral-950 hover:bg-white/90': !isItemAdded && isHoveredOrHeld, 'bg-[#AB7743] text-white': !isItemAdded && !isHoveredOrHeld }
                                                    )}
                                                >
                                                    {isItemAdded ? '✓ Added' : 'Add'}
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}

                {masterTab === 'specials' && (
                    <div className="animate-fade-in text-center">
                        <div className="flex flex-col items-center mb-12">
                            <h2 className="text-xl md:text-2xl lg:text-3.5xl font-black text-[#4C2B08] tracking-tight font-Gloock mb-6 uppercase max-w-2xl">
                                {renderTaglineWithGold()}
                            </h2>

                            <div className="flex gap-3 overflow-x-auto scrollbar-none pb-2 w-full max-w-max mx-auto justify-center">
                                {packageCategories.map((cat, index) => {
                                    const isActive = cat.id === activePackageCategory;
                                    return (
                                        <button
                                            key={index}
                                            className={classnames(
                                                'flex justify-center px-5 py-2 border rounded-full transition-all duration-300 text-xs font-black uppercase tracking-wider cursor-pointer whitespace-nowrap shadow-sm',
                                                {
                                                    'border-[#4C2B08] bg-[#4C2B08] text-white': isActive,
                                                    'border-[#4C2B08]/15 text-[#4C2B08]/70 hover:border-[#4C2B08]/40 hover:text-[#4C2B08]': !isActive,
                                                }
                                            )}
                                            onClick={() => setActivePackageCategory(cat.id)}
                                        >
                                            <span>{cat.name}</span>
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-16">
                            {filteredPackages.map((pkg, index) => {
                                const cartId = `pkg_${pkg.id}`;
                                const isItemAdded = cart.some(item => item.id === cartId);

                                return (
                                    <div
                                        key={index}
                                        className="group relative flex flex-col justify-between h-[380px] md:h-[440px] rounded-3xl overflow-hidden border border-white/5 shadow-xl transition-all duration-500 hover:border-[#FFB03A]/40 hover:shadow-2xl cursor-pointer"
                                    >
                                        <div className="absolute inset-0 w-full h-full">
                                            <img src={pkg.image} alt={pkg.title} className="w-full h-full object-cover transform scale-100 group-hover:scale-[1.03] transition-transform duration-[1000ms] ease-out" />
                                            <div className="absolute inset-0 w-full h-full bg-gradient-to-t from-[#1C0F03] via-[#4C2B08]/60 to-transparent transition-opacity duration-500 group-hover:opacity-95" />
                                        </div>

                                        <div className="absolute top-5 left-5 z-20">
                                            <span className="text-[9px] font-black tracking-widest uppercase px-3 py-1 bg-[#4C2B08]/90 text-white rounded-full border border-[#4C2B08]/10 backdrop-blur-md">
                                                {pkg.badge}
                                            </span>
                                        </div>

                                        <div className="relative z-10 mt-auto p-6 flex flex-col text-left">
                                            <span className="text-[10px] font-black uppercase tracking-widest text-[#FFB03A] mb-1.5">✦ Curated Tray ✦</span>
                                            <h3 className="text-lg md:text-xl font-black font-Gloock text-white leading-tight mb-2 uppercase group-hover:text-[#FFB03A] transition-colors">{pkg.title}</h3>
                                            <p className="text-xs text-[#D7BDA6] font-light leading-relaxed mb-4 line-clamp-2 group-hover:line-clamp-none transition-all duration-500">{pkg.description}</p>

                                            <div className="flex justify-between items-center pt-3 border-t border-white/10">
                                                <div className="flex flex-col">
                                                    <span className="text-[8px] font-bold uppercase tracking-widest text-white/50 leading-none">Starting At</span>
                                                    <span className="text-base font-black font-Gloock text-[#FFB03A] mt-1">{pkg.price}</span>
                                                </div>

                                                <button
                                                    type="button"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        togglePackageInCart(pkg);
                                                    }}
                                                    onTouchStart={(e) => {
                                                        e.stopPropagation();
                                                        e.preventDefault();
                                                        togglePackageInCart(pkg);
                                                    }}
                                                    className={classnames(
                                                        'text-[10px] font-black uppercase tracking-wider text-white rounded-full shadow-md transition-all group-hover:translate-x-0.5 cursor-pointer px-5 py-2.5',
                                                        { 'bg-emerald-500 hover:bg-emerald-600': isItemAdded, 'bg-[#AB7743] hover:bg-[#966535]': !isItemAdded }
                                                    )}
                                                >
                                                    {isItemAdded ? '✓ Added' : 'Add Tray'}
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}

                <div className={classnames(
                    'mt-16 lg:mt-24 transition-all duration-[1200ms] delay-300 transform',
                    { 'opacity-100 scale-100': isVisible, 'opacity-0 scale-95': !isVisible }
                )}>
                    <div className="relative rounded-[2.5rem] bg-[#150a02] overflow-hidden border border-[#FFB03A]/25 p-8 md:p-12 lg:p-16 text-center max-w-4xl mx-auto shadow-2xl">
                        <div className="absolute top-[-30%] left-[-20%] w-[50%] h-[50%] rounded-full bg-[#FFB03A]/10 blur-[90px] pointer-events-none" />
                        <div className="absolute bottom-[-30%] right-[-20%] w-[50%] h-[50%] rounded-full bg-[#AB7743]/15 blur-[90px] pointer-events-none" />

                        <div className="relative z-10 flex flex-col items-center">
                            <span className="text-[10px] sm:text-xs font-black tracking-widest text-[#FFB03A] uppercase mb-4 px-3.5 py-1 bg-white/5 rounded-full border border-white/10">

			    ✦ CRAVENEST ELITE CLUB PROMO ✦
                            </span>
                            <h3 className="text-xl md:text-3xl lg:text-4xl font-black font-Gloock text-white leading-tight uppercase mb-4 max-w-2xl">
                                {"First Time Feast? Let us treat you!"}
                            </h3>
                            <p className="text-xs sm:text-sm text-[#D7BDA6]/80 tracking-wide uppercase leading-relaxed max-w-xl mb-8">
                                {"Enjoy an exclusive 10% off your initial order of our hand-crafted food trays and gourmet baskets. Simply register your code below during checkout."}
                            </p>
                            <div className="inline-flex flex-col items-center border border-dashed border-[#FFB03A]/30 rounded-2xl p-4 bg-[#1e0f03] shadow-md select-all cursor-pointer hover:scale-[1.01] transition-transform">
                                <span className="text-[8px] font-black uppercase text-white/50 tracking-widest leading-none mb-1">PROMOTION CODE</span>
                                <span className="text-lg md:text-2xl font-black font-Gloock text-[#FFB03A] tracking-wider">CRAVE10</span>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
};

export default OrderPage;
