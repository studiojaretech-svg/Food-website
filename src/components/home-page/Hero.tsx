'use client';

import React from 'react';
import ContentManager from '@/components/ContentManager';
import StarIcon from '@/assets/icons/star.svg';
import Btn from '@/components/Btn';
import HomePageMap from '@/components/home-page/Map';
import { PropMediaDataParsed, PropRichTextDataParsed } from '@thebcms/types';
import { ClientConfig } from '@thebcms/client';
import { InlineTextWithImageGroup } from '@bcms-types/types/ts';
import { BCMSImage } from '@thebcms/components-react';

interface Props {
    title: string;
    open_time: PropRichTextDataParsed;
    address: string;
    map: PropMediaDataParsed;
    description: InlineTextWithImageGroup[];
    bcmsConfig: ClientConfig;
}

const HomeHero: React.FC<Props> = ({
    title,
    open_time,
    address,
    map,
    description,
    bcmsConfig,
}) => {
    // Beautiful top-down food thumbnail images for the menu shortcut cards
    const categoryCards = [
        {
            id: 'bowls',
            title: 'Gourmet Bowls',
            desc: 'Healthy & vibrant',
            image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=200&h=200&q=80',
            border: 'hover:border-amber-400',
        },
        {
            id: 'signature',
            title: 'Chef Specials',
            desc: 'Warm artisanal plates',
            image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=200&h=200&q=80',
            border: 'hover:border-amber-400',
        },
        {
            id: 'sides',
            title: 'Sides & Snacks',
            desc: 'Crisp & fresh treats',
            image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=200&h=200&q=80',
            border: 'hover:border-amber-400',
        },
    ];

    return (
        <section 
            className="relative pt-20 pb-12 md:pt-28 md:pb-20 lg:pt-36 lg:pb-28 overflow-hidden bg-neutral-950"
            style={{
                backgroundImage: "url('/hero.jpg')",
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}
        >
            {/* Custom premium styling for legibility and smooth animations */}
            <style dangerouslySetInnerHTML={{__html: `
                @keyframes fade-slide-up {
                    0% { opacity: 0; transform: translateY(24px); }
                    100% { opacity: 1; transform: translateY(0); }
                }
                @keyframes float-slow {
                    0%, 100% { transform: translateY(0px) rotate(0deg); }
                    50% { transform: translateY(-8px) rotate(2deg); }
                }
                @keyframes float-reverse {
                    0%, 100% { transform: translateY(0px) rotate(0deg); }
                    50% { transform: translateY(6px) rotate(-3deg); }
                }
                @keyframes spin-ultra-slow {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
                .animate-reveal-1 {
                    animation: fade-slide-up 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
                }
                .animate-reveal-2 {
                    animation: fade-slide-up 1s cubic-bezier(0.16, 1, 0.3, 1) 0.15s forwards;
                    opacity: 0;
                }
                .animate-reveal-3 {
                    animation: fade-slide-up 1s cubic-bezier(0.16, 1, 0.3, 1) 0.3s forwards;
                    opacity: 0;
                }
                .animate-float-slow {
                    animation: float-slow 6s ease-in-out infinite;
                }
                .animate-float-reverse {
                    animation: float-reverse 7s ease-in-out infinite;
                }
                .animate-spin-slow {
                    animation: spin-ultra-slow 75s linear infinite;
                }
                .scrollbar-none::-webkit-scrollbar {
                    display: none;
                }
                .scrollbar-none {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
                /* Soft drop shadow applied directly to text for extreme legibility over busy photo backdrops */
                .text-shadow-premium {
                    text-shadow: 0 2px 10px rgba(0, 0, 0, 0.9), 0 1px 3px rgba(0, 0, 0, 0.7);
                }
            `}} />

            <div className="container mx-auto px-4 relative z-10">
                
                {/* Upper Metadata Row: Location & Hours */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-8 pb-4 border-b border-white/20">
                    <div className="flex items-center gap-2">
                        <div className="p-1.5 bg-amber-500 rounded-full shadow-md">
                            <StarIcon className="w-3.5 h-3.5 text-neutral-950" />
                        </div>
                        <div>
                            <div className="text-xs font-bold text-[#FFFDF4] tracking-wide text-shadow-premium">
                                {address}
                            </div>
                        </div>
                    </div>
                    
                    <div className="flex items-center gap-3 max-sm:w-full max-sm:justify-between">
                        <div className="sm:hidden">
                            <HomePageMap map={map} bcmConfig={bcmsConfig} />
                        </div>
                        <div className="text-right sm:text-left flex items-center gap-1.5 text-shadow-premium">
                            <span className="text-xs text-[#FF9130] uppercase tracking-widest font-black">Hours:</span>
                            <ContentManager
                                items={open_time.nodes}
                                className="text-xs text-[#FFFDF4] font-bold [&_strong]:text-[#FF9130]"
                            />
                        </div>
                    </div>
                </div>

                {/* Main Grid Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                    
                    {/* LEFT COLUMN: Editorial Copy & Category Navigation */}
                    <div className="lg:col-span-7 flex flex-col space-y-6">
                        <div className="space-y-3 animate-reveal-1">
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500 text-neutral-950 text-[10px] font-black tracking-widest uppercase shadow-md">
                                <span className="w-1.5 h-1.5 rounded-full bg-neutral-950 animate-ping"></span>
                                Freshly Sourced Ingredients
                            </span>
                            
                            {/* Uses the prop variable directly with fallback to satisfy TypeScript compiler warnings */}
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-[#FFFDF4] leading-[1.05] font-Gloock text-shadow-premium">
                                {title || 'Cravenest'}
                            </h1>
                        </div>

                        {/* Elegantly styled descriptions with clean non-distorted inline images */}
                        <div className="text-base md:text-lg text-[#FFFDF4] leading-relaxed font-semibold max-w-2xl animate-reveal-2 text-shadow-premium">
                            {description.map((item, index) => (
                                <span key={index} className="inline-block mr-1.5 mb-1.5">
                                    {item.text && item.text.nodes.length > 0 && (
                                        <span className="bg-neutral-950/40 px-1 py-0.5 rounded backdrop-blur-[1px]">
                                            <ContentManager items={item.text.nodes} className="inline" />
                                        </span>
                                    )}
                                    {item.image && (
                                        <span className="inline-block mx-1.5 align-middle w-9 h-9 rounded-full overflow-hidden shadow-md border-2 border-[#C29D6E] bg-[#C29D6E]">
                                            <BCMSImage
                                                media={item.image}
                                                clientConfig={bcmsConfig}
                                                className="w-full h-full object-cover"
                                            />
                                        </span>
                                    )}
                                </span>
                            ))}
                        </div>

                        {/* Primary & Secondary Action Buttons (Reverted to original gold & white premium pill style) */}
                        <div className="flex items-center gap-4 pt-1 animate-reveal-2">
                            <Btn 
                                to="/menu" 
                                className="uppercase px-7 py-3.5 bg-[#C29D6E] text-neutral-950 hover:bg-[#b58f5f] rounded-full text-xs font-black tracking-wider shadow-lg hover:scale-[1.02] transition-all"
                            >
                                <span>Order Now</span>
                            </Btn>
                            <Btn 
                                to="/about-us" 
                                className="uppercase px-7 py-3.5 bg-white text-neutral-950 hover:bg-neutral-50 rounded-full text-xs font-black tracking-wider shadow-lg hover:scale-[1.02] transition-all"
                            >
                                <span>Explore Story</span>
                            </Btn>
                        </div>

                        {/* Category Shortcut Ribbon (Sleek dark cards with white text to stand out against background) */}
                        <div className="pt-6 border-t border-white/20 animate-reveal-3">
                            <p className="text-[10px] font-black uppercase tracking-widest text-[#FF9130] mb-3 text-shadow-premium">
                                Jump straight to menus
                            </p>
                            
                            <div className="flex overflow-x-auto snap-x snap-mandatory scrollbar-none gap-3 -mx-4 px-4 sm:mx-0 sm:px-0 sm:grid sm:grid-cols-3">
                                {categoryCards.map((card) => (
                                    <div
                                        key={card.id}
                                        className={`group relative flex-shrink-0 w-[230px] sm:w-auto snap-center flex items-center gap-3 p-2 bg-neutral-950/80 backdrop-blur-md border border-white/10 rounded-xl cursor-pointer transition-all duration-300 shadow-lg ${card.border}`}
                                    >
                                        <div className="relative w-10 h-10 rounded-lg overflow-hidden flex-shrink-0 shadow-inner bg-[#C29D6E]/20">
                                            <img
                                                src={card.image}
                                                alt={card.title}
                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                            />
                                        </div>
                                        <div className="min-w-0 pr-4">
                                            <h3 className="text-xs font-black text-white leading-tight truncate">
                                                {card.title}
                                            </h3>
                                            <p className="text-[10px] font-medium text-gray-400 leading-tight truncate">
                                                {card.desc}
                                            </p>
                                        </div>
                                        <div className="absolute right-2.5 text-xs text-gray-400 group-hover:text-white group-hover:translate-x-0.5 transition-all">
                                            →
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* RIGHT COLUMN: Fully Restored Layered Food Presentation (Featuring Chad Montano's Pizza) */}
                    <div className="lg:col-span-5 relative flex justify-center items-center h-[280px] sm:h-[380px] lg:h-[450px]">
                        
                        {/* 1. Studio Backdrop Ambient Glow */}
                        <div className="absolute w-[85%] h-[85%] rounded-full bg-[#FF9130]/10 blur-3xl pointer-events-none" />
                        
                        {/* 2. Soft-Faceted Platter Ring */}
                        <div className="absolute w-[80%] h-[80%] rounded-full border border-white/10 bg-white/5 backdrop-blur-[0.5px] shadow-[inset_0_2px_4px_rgba(255,255,255,0.1)] flex items-center justify-center animate-spin-slow">
                            <div className="w-[96%] h-[96%] rounded-full border border-dashed border-white/20" />
                        </div>

                        {/* 3. Primary Rotating Food Dish Container (Loaded with Chad Montano's Pizza) */}
                        <div className="relative w-[72%] h-[72%] rounded-full shadow-[0_25px_50px_rgba(0,0,0,0.5)] overflow-hidden border-4 border-white group transition-transform duration-500 hover:scale-[1.02] animate-float-slow">
                            <img
                                src="https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=800&h=800&q=80"
                                alt="Artisanal stone-baked pizza by Chad Montano"
                                className="w-full h-full object-cover"
                            />
                        </div>

                        {/* 4. Overlapping Absolute Decorative Accents (The Floating Depth Layer) */}
                        {/* Upper Right Leaf */}
                        <div className="absolute top-[15%] right-[10%] text-2xl select-none pointer-events-none animate-float-slow" style={{ animationDelay: '1s' }}>
                            🍃
                        </div>

                        {/* Lower Left Garnish */}
                        <div className="absolute bottom-[18%] left-[12%] text-2xl select-none pointer-events-none animate-float-reverse" style={{ animationDelay: '2.5s' }}>
                            🌿
                        </div>

                        {/* Left Pizza Emoji */}
                        <div className="absolute top-[35%] left-[8%] text-2xl select-none pointer-events-none animate-float-slow" style={{ animationDelay: '0.5s' }}>
                            🍕
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default HomeHero;
