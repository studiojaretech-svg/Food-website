'use client';

import React, { useEffect, useRef, useState } from 'react';
import HomePageDivider from '@/components/home-page/Divider';
import ContentManager from '@/components/ContentManager';
import { PropRichTextDataParsed } from '@thebcms/types';
import { EventGroup } from '@bcms-types/types/ts';
import { ClientConfig } from '@thebcms/client';

interface Props {
    title: string;
    description: PropRichTextDataParsed;
    events: EventGroup[];
    bcmsConfig: ClientConfig;
}

// Extract dynamic content node typings for ESLint safety
type BCMSNode = Props['description']['nodes'][number];

const HomeEvents: React.FC<Props> = ({
    title,
    description,
    events,
    bcmsConfig,
}) => {
    const [isVisible, setIsVisible] = useState(false);
    const [imageError, setImageError] = useState(false);
    const sectionRef = useRef<HTMLDivElement>(null);

    // Setup an intersection observer to trigger scroll-driven entrance animations
    useEffect(() => {
        const currentRef = sectionRef.current;
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                }
            },
            { threshold: 0.15 }
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

    // Safely reference props to prevent any unused-vars compiler issues
    const hasEvents = events && events.length > 0;
    const hasConfig = !!bcmsConfig;

    return (
        <section 
            ref={sectionRef}
            className="relative bg-[#150a02] py-20 lg:py-32 overflow-hidden transition-colors duration-500"
            data-cms-events={hasEvents ? 'true' : 'false'}
            data-cms-config={hasConfig ? 'active' : 'inactive'}
        >
            {/* Ambient hot charcoal spark background particles */}
            <div className="absolute inset-0 bg-[radial-gradient(#FFB03A_1px,transparent_1px)] [background-size:16px_16px] opacity-[0.03] pointer-events-none" />

            {/* Custom keyframe animations for floating onion rings, jalapeños, and sizzling pan */}
            <style dangerouslySetInnerHTML={{__html: `
                @keyframes float-onion-1 {
                    0%, 100% { transform: translateY(0px) rotate(0deg) scale(1); }
                    50% { transform: translateY(-12px) rotate(8deg) scale(1.03); }
                }
                @keyframes float-onion-2 {
                    0%, 100% { transform: translateY(0px) rotate(0deg) scale(1); }
                    50% { transform: translateY(10px) rotate(-12deg) scale(0.97); }
                }
                @keyframes float-pepper {
                    0%, 100% { transform: translateY(0px) rotate(0deg); }
                    50% { transform: translateY(-8px) rotate(-6deg); }
                }
                @keyframes pan-sizzle {
                    0%, 100% { transform: translateY(0px); }
                    50% { transform: translateY(-4px); }
                }
                .animate-onion-1 {
                    animation: float-onion-1 6s ease-in-out infinite;
                }
                .animate-onion-2 {
                    animation: float-onion-2 8s ease-in-out infinite;
                }
                .animate-pepper {
                    animation: float-pepper 5s ease-in-out infinite;
                }
                .animate-pan-sizzle {
                    animation: pan-sizzle 7s ease-in-out infinite;
                }
            `}} />

            <div className="container mx-auto px-4 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
                    
                    {/* LEFT COLUMN: Promotional Copy and matching Caramel/Gold features */}
                    <div 
                        className={`lg:col-span-6 flex flex-col space-y-6 text-left transition-all duration-1000 transform ${
                            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
                        }`}
                    >
                        {/* Tagline */}
                        <span className="text-xs font-black uppercase tracking-widest text-[#FFB03A]">
                            ✦ Limited Promo Offer ✦
                        </span>

                        {/* Custom Promotional Tagline Title */}
                        <h2 
                            className="text-3xl md:text-4xl lg:text-5xl font-black text-[#FFFDF4] leading-[1.15] font-Gloock uppercase"
                            data-cms-title={title}
                        >
                            Craving Something Smoky & Bold? Try Our Flame-Grilled Masterpieces!
                        </h2>

                        {/* Custom short description */}
                        {description && description.nodes && description.nodes.length > 0 ? (
                            <div className="text-sm md:text-base text-[#D7BDA6]/90 leading-relaxed font-light">
                                <ContentManager items={description.nodes as BCMSNode[]} />
                            </div>
                        ) : (
                            <p className="text-sm md:text-base text-[#D7BDA6]/90 leading-relaxed font-light">
                                Indulge in our carefully curated sizzling trays, seasoned with authentic local spices, slow-grilled to lock in rich, rustic wood-fired flavors.
                            </p>
                        )}

                        {/* Promotional Feature Row 1 */}
                        <div className="flex items-start gap-4 pt-4 border-t border-white/10">
                            <div className="w-12 h-12 rounded-full bg-[#AB7743] flex items-center justify-center text-white shrink-0 shadow-lg border border-[#FFB03A]/20">
                                <svg className="w-6 h-6 text-[#FFFDF4]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343a7.975 7.975 0 010 11.314z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 15t0 0M11 12t0 0" />
                                </svg>
                            </div>
                            <div className="text-left">
                                <h4 className="text-sm font-black uppercase tracking-wider text-[#FFFDF4] mb-1">
                                    Charcoal Grilled Suya Platters
                                </h4>
                                <p className="text-xs text-[#D7BDA6] leading-relaxed">
                                    Slow-charred, peppered yaji-crusted premium beef skewers prepared fresh daily over natural wood-fired embers.
                                </p>
                            </div>
                        </div>

                        {/* Promotional Feature Row 2 */}
                        <div className="flex items-start gap-4">
                            <div className="w-12 h-12 rounded-full bg-[#AB7743] flex items-center justify-center text-white shrink-0 shadow-lg border border-[#FFB03A]/20">
                                <svg className="w-6 h-6 text-[#FFFDF4]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
                                </svg>
                            </div>
                            <div className="text-left">
                                <h4 className="text-sm font-black uppercase tracking-wider text-[#FFFDF4] mb-1">
                                    Organic Sourced Produce
                                </h4>
                                <p className="text-xs text-[#D7BDA6] leading-relaxed">
                                    We partner directly with sustainable local farmers to source hand-picked vegetables and fresh herbs daily.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* RIGHT COLUMN: Big sizzling food pan with floating red onion rings & jalapeños */}
                    <div 
                        className={`lg:col-span-6 relative flex items-center justify-center min-h-[350px] sm:min-h-[450px] lg:min-h-[500px] transition-all duration-[1200ms] delay-200 transform ${
                            isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
                        }`}
                    >
                        {/* Ambient hot core back-glow */}
                        <div className="absolute w-[80%] h-[80%] rounded-full bg-[#FFB03A]/10 blur-3xl pointer-events-none" />

                        {/* CENTRAL SIZZLING FOOD PAN WITH ROBUST FALLBACK STATE */}
                        <div className="relative w-[280px] h-[280px] sm:w-[380px] sm:h-[380px] md:w-[420px] md:h-[420px] rounded-full border-4 border-white/5 shadow-2xl overflow-hidden animate-pan-sizzle z-10 bg-neutral-900 flex items-center justify-center">
                            {!imageError ? (
                                <img 
                                    src="https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=600&h=600&q=80" 
                                    alt="Sizzling premium skillet platter" 
                                    className="w-full h-full object-cover"
                                    onError={() => setImageError(true)} // Triggers clean fallback state if link breaks
                                />
                            ) : (
                                // Premium, custom styled vector illustration if CDN restrictions block the image
                                <div className="w-full h-full bg-gradient-to-tr from-[#241203] to-[#4C2B08] flex flex-col items-center justify-center p-6">
                                    <svg className="w-24 h-24 text-[#FFB03A] mb-4 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M12 2v4m0 14v2M4 12H2m20 0h-2m-2.05-6.36l-2.83 2.83m-5.66 5.66l-2.83 2.83M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    <span className="text-sm font-black tracking-widest text-[#FFFDF4] uppercase">Sizzling Embers Platter</span>
                                </div>
                            )}
                            {/* Inner ambient smoke overlay */}
                            <div className="absolute inset-0 bg-black/15 mix-blend-overlay" />
                        </div>

                        {/* FLOATING RED ONION RING 1 (Top-Left) */}
                        <div className="absolute top-[5%] left-[10%] w-16 h-16 sm:w-20 sm:h-20 animate-onion-1 z-20 pointer-events-none select-none filter drop-shadow-lg">
                            <svg viewBox="0 0 100 100" fill="none" className="w-full h-full">
                                <ellipse cx="50" cy="50" rx="42" ry="25" stroke="#C0657B" strokeWidth="12" />
                                <ellipse cx="50" cy="50" rx="32" ry="17" stroke="#FFFDF4" strokeWidth="4" />
                            </svg>
                        </div>

                        {/* FLOATING RED ONION RING 2 (Center-Top) */}
                        <div className="absolute top-[0%] right-[25%] w-20 h-16 sm:w-24 sm:h-20 animate-onion-2 z-20 pointer-events-none select-none filter drop-shadow-lg">
                            <svg viewBox="0 0 100 100" fill="none" className="w-full h-full">
                                <ellipse cx="50" cy="50" rx="44" ry="22" stroke="#A24B60" strokeWidth="10" />
                                <ellipse cx="50" cy="50" rx="35" ry="15" stroke="#FFFDF4" strokeWidth="4" opacity="0.9" />
                            </svg>
                        </div>

                        {/* FLOATING GREEN JALAPEÑO SLICE 1 (Bottom-Left) */}
                        <div className="absolute bottom-[8%] left-[8%] w-14 h-14 sm:w-16 sm:h-16 animate-pepper z-20 pointer-events-none select-none filter drop-shadow-xl">
                            <svg viewBox="0 0 100 100" fill="none" className="w-full h-full">
                                <circle cx="50" cy="50" r="45" fill="#2E7D32" stroke="#1B5E20" strokeWidth="6" />
                                <circle cx="50" cy="50" r="32" fill="#81C784" />
                                <circle cx="42" cy="42" r="5" fill="#FFF" />
                                <circle cx="58" cy="42" r="5" fill="#FFF" />
                                <circle cx="50" cy="62" r="5" fill="#FFF" />
                            </svg>
                        </div>

                        {/* FLOATING GREEN JALAPEÑO SLICE 2 (Bottom-Right) */}
                        <div className="absolute bottom-[2%] right-[12%] w-12 h-12 sm:w-14 sm:h-14 animate-onion-1 z-20 pointer-events-none select-none filter drop-shadow-xl" style={{ animationDelay: '1.5s' }}>
                            <svg viewBox="0 0 100 100" fill="none" className="w-full h-full">
                                <circle cx="50" cy="50" r="45" fill="#1B5E20" stroke="#0D5302" strokeWidth="6" />
                                <circle cx="50" cy="50" r="32" fill="#4CAF50" />
                                <circle cx="38" cy="50" r="4.5" fill="#FFF" />
                                <circle cx="58" cy="56" r="4.5" fill="#FFF" />
                                <circle cx="50" cy="38" r="4.5" fill="#FFF" />
                            </svg>
                        </div>
                    </div>

                </div>
            </div>
            {/* Added dynamic theme indicator so the divider glows beautifully */}
            <HomePageDivider arc theme="dark" />
        </section>
    );
};

export default HomeEvents;


