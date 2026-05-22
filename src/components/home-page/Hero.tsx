'use client';

import React from 'react';
import ContentManager from '@/components/ContentManager';
import StarIcon from '@/assets/icons/star.svg';
import Btn from '@/components/Btn';
import HomePageMap from '@/components/home-page/Map';
import { PropMediaDataParsed, PropRichTextDataParsed } from '@thebcms/types';
import { ClientConfig } from '@thebcms/client';
import { InlineTextWithImageGroup } from '@bcms-types/types/ts';

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

    // Helper function to dynamically clean placeholder content from BCMS nodes
    const replaceTextInNodes = (nodes: any[]): any[] => {
        if (!nodes) return [];
        return nodes.map((node) => {
            const newNode = { ...node };
            if (typeof newNode.value === 'string') {
                newNode.value = newNode.value.replace(/welcome to tastyyy/gi, 'Welcome to Cravenest');
                newNode.value = newNode.value.replace(/tastyyy/gi, 'Cravenest');
            }
            if (newNode.nodes && Array.isArray(newNode.nodes)) {
                newNode.nodes = replaceTextInNodes(newNode.nodes);
            }
            return newNode;
        });
    };

    const processedOpenTimeNodes = replaceTextInNodes(open_time.nodes);

    return (
        <section 
            className="relative pt-20 pb-12 md:pt-28 md:pb-20 lg:pt-36 lg:pb-28 overflow-hidden bg-neutral-950"
            style={{
                backgroundImage: "url('/hero.jpg')",
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}
        >
            {/* Custom premium styling for legibility and smooth organic animations */}
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
                @keyframes float-delayed {
                    0%, 100% { transform: translateY(0px) rotate(0deg); }
                    50% { transform: translateY(-10px) rotate(-2deg); }
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
                .animate-float-delayed {
                    animation: float-delayed 8s ease-in-out infinite;
                }
                .scrollbar-none::-webkit-scrollbar {
                    display: none;
                }
                .scrollbar-none {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
                /* Soft drop shadow applied directly to text for extreme legibility over raw photo backdrops */
                .text-shadow-premium {
                    text-shadow: 0 2px 14px rgba(0, 0, 0, 0.95), 0 1px 5px rgba(0, 0, 0, 0.85);
                }
            `}} />

            <div className="container mx-auto px-4 relative z-10">
                
                {/* Upper Metadata Row: Location & Hours with enlarged text */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 pb-4 border-b border-white/25">
                    <div className="flex items-center gap-2">
                        <div className="p-1.5 bg-amber-500 rounded-full shadow-md">
                            <StarIcon className="w-4 h-4 text-neutral-950" />
                        </div>
                        <div>
                            {/* Enlarged Location Text */}
                            <div className="text-sm md:text-base font-extrabold text-[#FFFDF4] tracking-wide text-shadow-premium">
                                {address}
                            </div>
                        </div>
                    </div>
                    
                    <div className="flex items-center gap-3 max-sm:w-full max-sm:justify-between">
                        <div className="sm:hidden">
                            <HomePageMap map={map} bcmConfig={bcmsConfig} />
                        </div>
                        {/* Enlarged Hours Text */}
                        <div className="text-right sm:text-left flex items-center gap-2 text-shadow-premium">
                            <span className="text-sm text-[#FF9130] uppercase tracking-widest font-black">Hours:</span>
                            <ContentManager
                                items={processedOpenTimeNodes}
                                className="text-sm md:text-base text-[#FFFDF4] font-extrabold [&_strong]:text-[#FF9130]"
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
                            
                            {/* Brand Name Title with "Crave" in Gold and "Nest" completely in White */}
                            <h1 
                                className="text-5xl md:text-6xl lg:text-7xl font-black tracking-tight leading-[1.05] font-Gloock text-shadow-premium flex flex-wrap items-center"
                                data-cms-title={title}
                            >
                                <span className="text-[#FFB03A]">Crave</span>
                                <span className="text-white">Nest</span>
                            </h1>
                        </div>

                        {/* Clean descriptions with "Tastyyy" text replaced, styled in premium italic editorial Gloock serif */}
                        <div className="text-lg md:text-xl text-[#FFFDF4]/95 leading-relaxed font-normal font-Gloock italic tracking-wide max-w-2xl animate-reveal-2 text-shadow-premium">
                            {description.map((item, index) => {
                                const processedNodes = replaceTextInNodes(item.text?.nodes || []);
                                return (
                                    <span key={index} className="inline mr-1 mb-1">
                                        {item.text && item.text.nodes.length > 0 && (
                                            <span className="bg-neutral-950/25 px-1 py-0.5 rounded backdrop-blur-[0.5px]">
                                                <ContentManager items={processedNodes} className="inline" />
                                            </span>
                                        )}
                                    </span>
                                );
                            })}
                        </div>

                        {/* Primary & Secondary Action Buttons (Gold & White Premium Pills) */}
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

                        {/* Category Shortcut Ribbon (Sleek dark cards with white text) */}
                        <div className="pt-6 border-t border-white/20 animate-reveal-3">
                            <p className="text-[13px] font-black uppercase tracking-widest text-[#FF9130] mb-3 text-shadow-premium">
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

                    {/* RIGHT COLUMN: Overlapping 3-Dish Photographic Collage Cluster */}
                    <div className="lg:col-span-5 relative flex justify-center items-center h-[350px] sm:h-[450px] lg:h-[500px] mt-8 lg:mt-0">
                        
                        {/* Soft Ambient Core Glow behind the entire cluster */}
                        <div className="absolute w-[90%] h-[90%] rounded-full bg-[#FF9130]/5 blur-3xl pointer-events-none" />
                        
                        {/* Dish 1: Primary Upper (Center-Right / z-20) - Vibrant Fresh Salad Bowl (Swapped on top) */}
                        <div className="absolute top-[5%] right-[5%] w-[56%] h-[56%] rounded-full shadow-[0_20px_45px_rgba(0,0,0,0.45)] overflow-hidden border-4 border-white z-20 transition-transform duration-500 hover:scale-[1.03] animate-float-slow">
                            <img
                                src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&h=600&q=80"
                                alt="Vibrant fresh salad platter"
                                className="w-full h-full object-cover"
                            />
                        </div>

                        {/* Dish 2: Lower Left (z-10) - Chad Montano's Pizza (Swapped underneath Dish 1) */}
                        <div className="absolute top-[35%] left-[5%] w-[46%] h-[46%] rounded-full shadow-[0_15px_35px_rgba(0,0,0,0.4)] overflow-hidden border-4 border-white z-10 transition-transform duration-500 hover:scale-[1.03] animate-float-reverse">
                            <img
                                src="https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=500&h=500&q=80"
                                alt="Artisanal baked pizza by Chad Montano"
                                className="w-full h-full object-cover"
                            />
                        </div>

                        {/* Dish 3: Lower Right (z-30) - Overlaps with both dishes */}
                        <div className="absolute bottom-[5%] right-[15%] w-[48%] h-[48%] rounded-full shadow-[0_22px_50px_rgba(0,0,0,0.5)] overflow-hidden border-4 border-white z-30 transition-transform duration-500 hover:scale-[1.03] animate-float-delayed">
                            <img
                                src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=500&h=500&q=80"
                                alt="Signature roasted culinary specials"
                                className="w-full h-full object-cover"
                            />
                        </div>

                        {/* Floating leaf accents floating organically around the collage */}
                        <div className="absolute top-[10%] left-[15%] text-2xl select-none pointer-events-none animate-float-slow" style={{ animationDelay: '1s' }}>
                            🍃
                        </div>
                        <div className="absolute bottom-[10%] right-[5%] text-2xl select-none pointer-events-none animate-float-reverse" style={{ animationDelay: '2s' }}>
                            🌿
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default HomeHero;
