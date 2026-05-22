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
            border: 'hover:border-emerald-200/80',
        },
        {
            id: 'signature',
            title: 'Chef Specials',
            desc: 'Warm artisanal plates',
            image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=200&h=200&q=80',
            border: 'hover:border-orange-200/80',
        },
        {
            id: 'sides',
            title: 'Sides & Snacks',
            desc: 'Crisp & fresh treats',
            image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=200&h=200&q=80',
            border: 'hover:border-lime-200/80',
        },
    ];

    return (
        <section 
            className="relative pt-20 pb-12 md:pt-28 md:pb-20 lg:pt-36 lg:pb-28 overflow-hidden bg-stone-100"
            style={{
                backgroundImage: "url('/hero.jpg')",
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}
        >
            {/* Custom ambient keyframes for the interactive 3D layout depth */}
            <style dangerouslySetInnerHTML={{__html: `
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
                .animate-float-slow {
                    animation: float-slow 6s ease-in-out infinite;
                }
                .animate-float-reverse {
                    animation: float-reverse 7s ease-in-out infinite;
                }
                .animate-spin-slow {
                    animation: spin-ultra-slow 65s linear infinite;
                }
                /* Hide scrollbar for category row on mobile devices */
                .scrollbar-none::-webkit-scrollbar {
                    display: none;
                }
                .scrollbar-none {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
            `}} />

            {/* Premium Soft White Studio Lighting Overlay to keep copy readable over texture */}
            {/* Change line 83 to look like this */}
<div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_20%,rgba(0,0,0,0.05)_100%)] pointer-events-none" />


            <div className="container mx-auto px-4 relative z-10">
  {/* Upper Meta Info Row: Location & Timing */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-8 pb-4 border-b border-gray-900/10">
                    <div className="flex items-center gap-2">
                        <div className="p-1.5 bg-white rounded-full shadow-sm border border-gray-100">
                            <StarIcon className="w-3.5 h-3.5 text-appAccent" />
                        </div>
                        <div>
                            <div className="text-xs font-semibold text-appText">{address}</div>
                        </div>
                    </div>
                    
                    <div className="flex items-center gap-3 max-sm:w-full max-sm:justify-between">
                        <div className="sm:hidden">
                            <HomePageMap map={map} bcmConfig={bcmsConfig} />
                        </div>
                        <div className="text-right sm:text-left flex items-center gap-1">
                            <span className="text-xs text-gray-400 uppercase tracking-wider">Hours:</span>
                            <ContentManager
                                items={open_time.nodes}
                                className="text-xs text-appText font-semibold [&_strong]:text-appAccent"
                            />
                        </div>
                    </div>
                </div>

                {/* Main Grid Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                    
                    {/* LEFT COLUMN: Editorial Copy & Category Navigation */}
                    <div className="lg:col-span-7 flex flex-col space-y-6">
                        <div className="space-y-3">
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-800 text-[10px] font-bold tracking-wider uppercase">
                                <span className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse"></span>
                                Freshly Sourced Ingredients
                            </span>
                            
                            <h1 className="text-3xl md:text-5xl lg:text-6xl font-black tracking-tight text-appText leading-[1.1] font-Gloock">
                                {title}
                            </h1>
                        </div>

                        {/* Elegantly styled description blocks with clean, non-distorted inline images */}
                        <div className="text-sm md:text-base text-gray-600 leading-relaxed font-light">
                            {description.map((item, index) => (
                                <span key={index} className="inline-block mr-1 mb-1">
                                    {item.text && item.text.nodes.length > 0 && (
                                        <ContentManager
                                            items={item.text.nodes}
                                            className="inline"
                                        />
                                    )}
                                    {item.image && (
                                        <span className="inline-block mx-1.5 align-middle w-8 h-8 rounded-full overflow-hidden shadow-sm border border-white">
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

                        {/* Actions */}
                        <div className="flex items-center gap-3 pt-1">
                            <Btn to="/menu" className="uppercase px-6 py-3 bg-appAccent text-white rounded-full text-xs font-bold shadow-md shadow-appAccent/20 hover:scale-[1.02] transition-transform">
                                <span>Order Now</span>
                            </Btn>
                            <Btn to="/about-us" className="uppercase px-6 py-3 bg-white text-appText border border-gray-200 rounded-full text-xs font-bold hover:bg-gray-50 transition-colors">
                                <span>Explore Story</span>
                            </Btn>
                        </div>

                        {/* Categories Segment with horizontal swipe row on mobile to reduce scroll */}
                        <div className="pt-6 border-t border-gray-900/10">
                            <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-3">
                                Jump straight to menus
                            </p>
                            
                            {/* Horizontal Swipe Ribbon on Mobile, Crisp Grid on Desktop */}
                            <div className="flex overflow-x-auto snap-x snap-mandatory scrollbar-none gap-3 -mx-4 px-4 sm:mx-0 sm:px-0 sm:grid sm:grid-cols-3">
                                {categoryCards.map((card) => (
                                    <div
                                        key={card.id}
                                        className={`group relative flex-shrink-0 w-[230px] sm:w-auto snap-center flex items-center gap-3 p-2 bg-white/90 backdrop-blur-sm border border-gray-200/50 rounded-xl cursor-pointer transition-all duration-300 shadow-sm hover:shadow-md hover:bg-white ${card.border}`}
                                    >
                                        <div className="relative w-10 h-10 rounded-lg overflow-hidden flex-shrink-0 shadow-inner bg-stone-100">
                                            <img
                                                src={card.image}
                                                alt={card.title}
                                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                                            />
                                        </div>
                                        <div className="min-w-0 pr-4">
                                            <h3 className="text-xs font-bold text-appText leading-tight truncate">
                                                {card.title}
                                            </h3>
                                            <p className="text-[10px] text-gray-500 leading-tight truncate">
                                                {card.desc}
                                            </p>
                                        </div>
                                        <div className="absolute right-2.5 text-xs text-gray-300 group-hover:text-appAccent group-hover:translate-x-0.5 transition-all">
                                            →
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* RIGHT COLUMN: Layered Food Presentation (The Studio Flatlay Experience) */}
                    <div className="lg:col-span-5 relative flex justify-center items-center h-[280px] sm:h-[380px] lg:h-[450px]">
                        
                        {/* 1. Studio Backdrop Soft Vignette Shadow */}
                        <div className="absolute w-[85%] h-[85%] rounded-full bg-gradient-to-tr from-amber-200/10 via-emerald-200/10 to-transparent blur-3xl pointer-events-none" />
                        
                        {/* 2. Soft-Faceted Platter Ring */}
                        <div className="absolute w-[80%] h-[80%] rounded-full border border-gray-400/10 bg-white/25 backdrop-blur-[1px] shadow-[inset_0_2px_4px_rgba(255,255,255,0.4)] flex items-center justify-center animate-spin-slow">
                            <div className="w-[96%] h-[96%] rounded-full border border-dashed border-gray-300/30" />
                        </div>

                        {/* 3. Primary Top-Down Food Dish Container */}
                        <div className="relative w-[72%] h-[72%] rounded-full shadow-[0_20px_45px_rgba(0,0,0,0.15)] overflow-hidden border-4 border-white group transition-transform duration-500 hover:scale-[1.02] animate-float-slow">
                            <img
                                src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80"
                                alt="Signature culinary dish top view"
                                className="w-full h-full object-cover"
                            />
                        </div>

                        {/* 4. Soft Ambient Leaves */}
                        {/* Upper Right Leaf */}
                        <div className="absolute top-[15%] right-[10%] text-2xl select-none pointer-events-none animate-float-slow" style={{ animationDelay: '1s' }}>
                            🍃
                        </div>

                        {/* Lower Left Garnish */}
                        <div className="absolute bottom-[18%] left-[12%] text-2xl select-none pointer-events-none animate-float-reverse" style={{ animationDelay: '2.5s' }}>
                            🌿
                        </div>

                        {/* Left Lemon Slice */}
                        <div className="absolute top-[35%] left-[8%] text-2xl select-none pointer-events-none animate-float-slow" style={{ animationDelay: '0.5s' }}>
                            🍋
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default HomeHero;

