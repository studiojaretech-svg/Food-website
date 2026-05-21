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
    // Elegant, curated static options for the category cards sitting under the description
    const categoryCards = [
        {
            id: 'bowls',
            title: 'Gourmet Bowls',
            desc: 'Healthy & vibrant',
            emoji: '🥗',
            bg: 'from-emerald-50 to-teal-50/50',
            border: 'hover:border-emerald-200',
        },
        {
            id: 'signature',
            title: 'Chef Specials',
            desc: 'Warm artisanal plates',
            emoji: '🍳',
            bg: 'from-orange-50 to-amber-50/50',
            border: 'hover:border-orange-200',
        },
        {
            id: 'sides',
            title: 'Sides & Snacks',
            desc: 'Crisp hand-picked treats',
            emoji: '🥑',
            bg: 'from-lime-50 to-emerald-50/50',
            border: 'hover:border-lime-200',
        },
    ];

    return (
        <section className="relative pt-24 pb-16 md:pt-32 md:pb-24 lg:pt-40 lg:pb-32 overflow-hidden bg-appBody">
            {/* Custom ambient keyframes for the 3D depth effect */}
            <style dangerouslySetInnerHTML={{__html: `
                @keyframes float-slow {
                    0%, 100% { transform: translateY(0px) rotate(0deg); }
                    50% { transform: translateY(-10px) rotate(3deg); }
                }
                @keyframes float-reverse {
                    0%, 100% { transform: translateY(0px) rotate(0deg); }
                    50% { transform: translateY(8px) rotate(-4deg); }
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
                    animation: spin-ultra-slow 40s linear infinite;
                }
            `}} />

            <div className="container mx-auto px-4 relative z-10">
                {/* Upper Metadata Row: Address & Timing */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-12 pb-6 border-b border-gray-100">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-white rounded-full shadow-sm border border-gray-50">
                            <StarIcon className="w-4 h-4 text-appAccent" />
                        </div>
                        <div>
                            <p className="text-xs text-gray-400 uppercase tracking-widest leading-none mb-1">Location</p>
                            <div className="text-sm font-medium text-appText">{address}</div>
                        </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                        <div className="max-sm:hidden">
                            <HomePageMap map={map} bcmConfig={bcmsConfig} />
                        </div>
                        <div className="text-right sm:text-left">
                            <p className="text-xs text-gray-400 uppercase tracking-widest leading-none mb-1">Hours of Operation</p>
                            <ContentManager
                                items={open_time.nodes}
                                className="text-sm text-appText font-medium [&_strong]:text-appAccent [&_strong]:font-semibold"
                            />
                        </div>
                    </div>
                </div>

                {/* Main Hero Layout Grid split */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
                    
                    {/* LEFT COLUMN: Editorial Copy & Category Navigation */}
                    <div className="lg:col-span-7 flex flex-col space-y-8">
                        <div className="space-y-4">
                            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-semibold tracking-wider uppercase">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                                Freshly Sourced Ingredients
                            </span>
                            
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-appText leading-[1.1] font-Gloock">
                                {title}
                            </h1>
                        </div>

                        {/* Description Blocks rendered cleanly */}
                        <div className="space-y-4 max-w-2xl">
                            {description.map((item, index) => (
                                <React.Fragment key={index}>
                                    {item.text && item.text.nodes.length > 0 && (
                                        <ContentManager
                                            items={item.text.nodes}
                                            className="text-base md:text-lg text-gray-600 leading-relaxed font-light"
                                        />
                                    )}
                                    {item.image && (
                                        <div className="my-2 inline-block">
                                            <BCMSImage
                                                media={item.image}
                                                clientConfig={bcmsConfig}
                                                className="rounded-lg shadow-sm max-h-12 w-auto bg-center bg-cover object-cover"
                                            />
                                        </div>
                                    )}
                                </React.Fragment>
                            ))}
                        </div>

                        {/* CTA Actions */}
                        <div className="flex flex-wrap items-center gap-4 pt-2">
                            <Btn to="/menu" className="uppercase px-8 py-4 bg-appAccent text-white rounded-full font-bold shadow-lg shadow-appAccent/20 hover:scale-[1.02] transition-transform">
                                <span>Order Now</span>
                            </Btn>
                            <Btn to="/about-us" className="uppercase px-8 py-4 bg-white text-appText border border-gray-100 rounded-full font-bold hover:bg-gray-50 transition-colors">
                                <span>Explore Story</span>
                            </Btn>
                        </div>

                        {/* Quick-Category Capsule Cards (Straight from reference image) */}
                        <div className="pt-8 border-t border-gray-100">
                            <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-4">
                                Jump straight to menus
                            </p>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                                {categoryCards.map((card) => (
                                    <div
                                        key={card.id}
                                        className={`group relative flex items-center gap-3 p-3 bg-gradient-to-br ${card.bg} border border-transparent rounded-2xl cursor-pointer transition-all duration-300 shadow-sm hover:shadow-md ${card.border}`}
                                    >
                                        <div className="text-2xl p-2 bg-white rounded-xl shadow-inner group-hover:scale-110 transition-transform">
                                            {card.emoji}
                                        </div>
                                        <div>
                                            <h3 className="text-sm font-semibold text-appText leading-none mb-1">
                                                {card.title}
                                            </h3>
                                            <p className="text-[11px] text-gray-500 leading-none">
                                                {card.desc}
                                            </p>
                                        </div>
                                        <div className="absolute right-3 text-gray-300 group-hover:text-appAccent group-hover:translate-x-1 transition-all">
                                            →
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* RIGHT COLUMN: The Immersive Layered Food Display */}
                    <div className="lg:col-span-5 relative flex justify-center items-center h-[350px] sm:h-[450px] lg:h-[550px]">
                        
                        {/* 1. Halo Ambient Background Glow */}
                        <div className="absolute w-[80%] h-[80%] rounded-full bg-gradient-to-tr from-amber-100/40 via-emerald-100/30 to-transparent blur-3xl" />
                        
                        {/* 2. Soft-Faceted Wooden/Slate Platter Ring */}
                        <div className="absolute w-[75%] h-[75%] rounded-full border border-gray-100 bg-white/40 backdrop-blur-[2px] shadow-2xl flex items-center justify-center animate-spin-slow" style={{ animationDuration: '60s' }}>
                            <div className="w-[95%] h-[95%] rounded-full border border-dashed border-gray-200/60" />
                        </div>

                        {/* 3. Primary Top-Down Main Dish Image */}
                        <div className="relative w-[70%] h-[70%] rounded-full shadow-[0_25px_50px_-12px_rgba(0,0,0,0.15)] overflow-hidden border-8 border-white group transition-transform duration-500 hover:scale-[1.03] animate-float-slow">
                            <img
                                src="/home-cover.jpg"
                                alt="Signature culinary dish top view"
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                    // Robust fallback if default image assets are missing
                                    e.currentTarget.src = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=1000&q=80';
                                }}
                            />
                        </div>

                        {/* 4. Overlapping Absolute Decorative Accents (The Floating Depth Layer) */}
                        {/* Upper Right Leaf */}
                        <div className="absolute top-[12%] right-[10%] w-12 h-12 text-3xl select-none pointer-events-none animate-float-slow" style={{ animationDelay: '1s' }}>
                            🍃
                        </div>

                        {/* Lower Left Herb */}
                        <div className="absolute bottom-[14%] left-[12%] w-10 h-10 text-2xl select-none pointer-events-none animate-float-reverse" style={{ animationDelay: '2.5s' }}>
                            🌿
                        </div>

                        {/* Upper Left Lemon slice */}
                        <div className="absolute top-[25%] left-[8%] w-10 h-10 text-2xl select-none pointer-events-none animate-float-slow" style={{ animationDelay: '0.5s' }}>
                            🍋
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default HomeHero;

