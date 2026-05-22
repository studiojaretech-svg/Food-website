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
            border: 'hover:border-neutral-400',
        },
        {
            id: 'signature',
            title: 'Chef Specials',
            desc: 'Warm artisanal plates',
            image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=200&h=200&q=80',
            border: 'hover:border-neutral-400',
        },
        {
            id: 'sides',
            title: 'Sides & Snacks',
            desc: 'Crisp & fresh treats',
            image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=200&h=200&q=80',
            border: 'hover:border-neutral-400',
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
            {/* Custom high-end animations and responsive layout styles */}
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
            `}} />

            {/* Subtle contrast mask to ground the typography while keeping the background crisp */}
            <div className="absolute inset-0 bg-white/40 pointer-events-none" />

            <div className="container mx-auto px-4 relative z-10">
                
                {/* Upper Metadata Row */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-8 pb-4 border-b border-neutral-900/10">
                    <div className="flex items-center gap-2">
                        <div className="p-1.5 bg-neutral-900 rounded-full shadow-sm">
                            <StarIcon className="w-3.5 h-3.5 text-white" />
                        </div>
                        <div>
                            <div className="text-xs font-bold text-neutral-900 tracking-wide">{address}</div>
                        </div>
                    </div>
                    
                    <div className="flex items-center gap-3 max-sm:w-full max-sm:justify-between">
                        <div className="sm:hidden">
                            <HomePageMap map={map} bcmConfig={bcmsConfig} />
                        </div>
                        <div className="text-right sm:text-left flex items-center gap-1">
                            <span className="text-xs text-neutral-600 uppercase tracking-wider font-semibold">Hours:</span>
                            <ContentManager
                                items={open_time.nodes}
                                className="text-xs text-neutral-900 font-bold [&_strong]:text-appAccent"
                            />
                        </div>
                    </div>
                </div>

                {/* Main Grid Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                    
                    {/* LEFT COLUMN: Deep High-Contrast Typography & Reveals */}
                    <div className="lg:col-span-7 flex flex-col space-y-6">
                        <div className="space-y-3 animate-reveal-1">
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-neutral-900 text-white text-[10px] font-black tracking-widest uppercase shadow-sm">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                                Freshly Sourced Ingredients
                            </span>
                            
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-neutral-900 leading-[1.05] font-Gloock drop-shadow-sm">
                                {title}
                            </h1>
                        </div>

                        {/* Bold description strings that sit beautifully over textured images */}
                        <div className="text-base md:text-lg text-neutral-900 leading-relaxed font-semibold max-w-2xl animate-reveal-2">
                            {description.map((item, index) => (
                                <span key={index} className="inline-block mr-1.5 mb-1.5">
                                    {item.text && item.text.nodes.length > 0 && (
                                        <span className="bg-white/60 px-1 py-0.5 rounded backdrop-blur-[1px]">
                                            <ContentManager items={item.text.nodes} className="inline" />
                                        </span>
                                    )}
                                    {item.image && (
                                        <span className="inline-block mx-1 align-middle w-9 h-9 rounded-full overflow-hidden shadow-md border-2 border-white bg-white">
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
                        <div className="flex items-center gap-4 pt-1 animate-reveal-2">
                            <Btn to="/menu" className="uppercase px-7 py-3.5 bg-neutral-900 text-white hover:bg-neutral-800 rounded-full text-xs font-black tracking-wider shadow-lg hover:scale-[1.02] transition-all">
                                <span>Order Now</span>
                            </Btn>
                            <Btn to="/about-us" className="uppercase px-7 py-3.5 bg-white text-neutral-900 border-2 border-neutral-900 rounded-full text-xs font-black tracking-wider hover:bg-neutral-50 transition-all">
                                <span>Explore Story</span>
                            </Btn>
                        </div>

                        {/* Category Shortcut Ribbon */}
                        <div className="pt-6 border-t border-neutral-900/10 animate-reveal-3">
                            <p className="text-[10px] font-black uppercase tracking-widest text-neutral-600 mb-3">
                                Jump straight to menus
                            </p>
                            
                            <div className="flex overflow-x-auto snap-x snap-mandatory scrollbar-none gap-3 -mx-4 px-4 sm:mx-0 sm:px-0 sm:grid sm:grid-cols-3">
                                {categoryCards.map((card) => (
                                    <div
                                        key={card.id}
                                        className={`group relative flex-shrink-0 w-[230px] sm:w-auto snap-center flex items-center gap-3 p-2 bg-white border border-neutral-200 rounded-xl cursor-pointer transition-all duration-300 shadow-sm hover:shadow-md ${card.border}`}
                                    >
                                        <div className="relative w-10 h-10 rounded-lg overflow-hidden flex-shrink-0 shadow-inner bg-stone-100">
                                            <img
                                                src={card.image}
                                                alt={card.title}
                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                            />
                                        </div>
                                        <div className="min-w-0 pr-4">
                                            <h3 className="text-xs font-black text-neutral-900 leading-tight truncate">
                                                {card.title}
                                            </h3>
                                            <p className="text-[10px] font-medium text-neutral-500 leading-tight truncate">
                                                {card.desc}
                                            </p>
                                        </div>
                                        <div className="absolute right-2.5 text-xs text-neutral-400 group-hover:text-neutral-900 group-hover:translate-x-0.5 transition-all">
                                            →
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* RIGHT COLUMN: Chad Montano Premium Pizza Display */}
                    <div className="lg:col-span-5 relative flex justify-center items-center h-[280px] sm:h-[380px] lg:h-[450px]">
                        
                        {/* Soft Vignette Shadows */}
                        <div className="absolute w-[85%] h-[85%] rounded-full bg-gradient-to-tr from-amber-200/5 via-orange-200/5 to-transparent blur-3xl pointer-events-none" />
                        
                        {/* Graphic Frame Ring */}
                        <div className="absolute w-[80%] h-[80%] rounded-full border border-neutral-900/5 bg-white/10 flex items-center justify-center animate-spin-slow">
                            <div className="w-[96%] h-[96%] rounded-full border border-dashed border-neutral-900/10" />
                        </div>

                        {/* Top-Down Authentic Pizza Feature (Sourced directly via Chad Montano) */}
                        <div className="relative w-[74%] h-[74%] rounded-full shadow-[0_25px_50px_rgba(0,0,0,0.18)] overflow-hidden border-4 border-white group transition-transform duration-500 hover:scale-[1.02] animate-float-slow">
                            <img
                                src="https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=800&h=800&q=80"
                                alt="Artisanal stone-baked pizza by Chad Montano"
                                className="w-full h-full object-cover"
                            />
                        </div>

                        {/* Interactive Float Elements */}
                        <div className="absolute top-[15%] right-[10%] text-2xl select-none pointer-events-none animate-float-slow" style={{ animationDelay: '1s' }}>
                            🍃
                        </div>

                        <div className="absolute bottom-[18%] left-[12%] text-2xl select-none pointer-events-none animate-float-reverse" style={{ animationDelay: '2.5s' }}>
                            🌿
                        </div>

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


