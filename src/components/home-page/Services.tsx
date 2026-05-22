'use client';

import React, { useEffect, useRef, useState } from 'react';
import Btn from '@/components/Btn';

const HomeServices: React.FC = () => {
    const [isVisible, setIsVisible] = useState(false);
    const sectionRef = useRef<HTMLDivElement>(null);

    // Setup an intersection observer to trigger scroll-driven entrance animations
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                }
            },
            {
                threshold: 0.12, // Triggers when 12% of the section is visible
            }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => {
            if (sectionRef.current) {
                observer.unobserve(sectionRef.current);
            }
        };
    }, []);

    const servicesSteps = [
        {
            id: 1,
            title: 'Select Your Plan',
            desc: 'Browse our curated, chef-crafted seasonal menus and select the weekly program that aligns with your lifestyle.',
            icon: (
                <svg className="w-8 h-8 text-[#FFB03A]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                </svg>
            ),
            isFeatured: false,
            delayClass: 'delay-[100ms]',
        },
        {
            id: 2,
            title: 'Confirm & Customise',
            desc: 'Schedule your delivery slots and customise individual ingredients with our kitchen to match any dietary preference.',
            icon: (
                <svg className="w-8 h-8 text-[#4C2B08]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M5 13l4 4L19 7" />
                </svg>
            ),
            isFeatured: true, // Caramel highlighted card
            delayClass: 'delay-[200ms]',
        },
        {
            id: 3,
            title: 'Artisanal Prep',
            desc: 'Our master culinary team prepares, slow-bakes, and fires your meals to perfection using fresh stone ovens.',
            icon: (
                <svg className="w-8 h-8 text-[#FFB03A]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
            ),
            isFeatured: false,
            delayClass: 'delay-[300ms]',
        },
        {
            id: 4,
            title: '100% Sourced Fresh',
            desc: 'Zero chemicals, zero GMOs. Just clean, hand-picked ingredients sourced daily from sustainable local farms.',
            icon: (
                <svg className="w-8 h-8 text-[#FFB03A]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707-.707m0-12.728l.707.707m12.728 12.728l.707-.707M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            ),
            isFeatured: false,
            delayClass: 'delay-[400ms]',
        },
    ];

    return (
        <section 
            ref={sectionRef} 
            className="relative py-20 lg:py-32 overflow-hidden bg-[#241203]"
        >
            {/* Custom slow spin keyframe for the background symbol */}
            <style dangerouslySetInnerHTML={{__html: `
                @keyframes spin-infinitely {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
                .animate-spin-infinitely {
                    animation: spin-infinitely 140s linear infinite;
                }
            `}} />

            {/* 1. GIANT TRANSPARENT CULINARY BRAND WATERMARK (Big symbol element) */}
            <div className="absolute top-[10%] left-[-15%] lg:left-[-10%] w-[500px] h-[500px] lg:w-[800px] lg:h-[800px] opacity-[0.025] text-[#FFB03A] pointer-events-none select-none z-0 mix-blend-screen animate-spin-infinitely">
                <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" className="w-full h-full">
                    {/* Nested outer rings */}
                    <circle cx="50" cy="50" r="48" strokeWidth="0.25" strokeDasharray="1 1" />
                    <circle cx="50" cy="50" r="44" strokeWidth="0.1" />
                    <circle cx="50" cy="50" r="38" strokeWidth="0.15" strokeDasharray="2 1" />
                    
                    {/* Symmetric radial geometry lines (representing a giant cook top / nest) */}
                    <line x1="50" y1="2" x2="50" y2="98" strokeWidth="0.1" />
                    <line x1="2" y1="50" x2="98" y2="50" strokeWidth="0.1" />
                    <line x1="16" y1="16" x2="84" y2="84" strokeWidth="0.1" />
                    <line x1="16" y1="84" x2="84" y2="16" strokeWidth="0.1" />
                    
                    {/* Abstract circular pattern elements */}
                    <circle cx="50" cy="50" r="24" strokeWidth="0.2" />
                    <circle cx="50" cy="26" r="4" strokeWidth="0.15" />
                    <circle cx="50" cy="74" r="4" strokeWidth="0.15" />
                    <circle cx="26" cy="50" r="4" strokeWidth="0.15" />
                    <circle cx="74" cy="50" r="4" strokeWidth="0.15" />
                </svg>
            </div>

            {/* Ambient subtle blurs */}
            <div className="absolute top-[-10%] left-[-10%] w-[45%] h-[45%] rounded-full bg-[#FFB03A]/5 blur-3xl pointer-events-none" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[45%] h-[45%] rounded-full bg-[#AB7743]/5 blur-3xl pointer-events-none" />

            <div className="container mx-auto px-4 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
                    
                    {/* LEFT SIDE: Asymmetrical Staggered Cards with Staggered Scroll Animations */}
                    <div className="lg:col-span-6 grid grid-cols-2 gap-4 md:gap-6 relative">
                        
                        {/* Column 1 (Normal Alignment) */}
                        <div className="flex flex-col gap-4 md:gap-6">
                            {servicesSteps.filter(step => step.id % 2 !== 0).map((step) => (
                                <div 
                                    key={step.id} 
                                    className={`p-5 md:p-6 bg-[#4C2B08]/40 border border-[#B7957F]/10 rounded-2xl shadow-lg transition-all duration-700 hover:scale-[1.02] transform ${
                                        isVisible 
                                            ? 'opacity-100 translate-y-0 filter-none' 
                                            : 'opacity-0 translate-y-8 blur-sm'
                                    } ${step.delayClass}`}
                                >
                                    <div className="w-14 h-14 rounded-xl bg-[#4C2B08]/60 flex items-center justify-center mb-4 border border-[#B7957F]/20">
                                        {step.icon}
                                    </div>
                                    <h3 className="text-base md:text-lg font-black text-[#FFFDF4] mb-2 font-Gloock">
                                        {step.title}
                                    </h3>
                                    <p className="text-xs md:text-sm text-[#D7BDA6]/80 leading-relaxed font-light">
                                        {step.desc}
                                    </p>
                                </div>
                            ))}
                        </div>

                        {/* Column 2 (Pushed Lower to create the exact offset stagger, animated on scroll) */}
                        <div className="flex flex-col gap-4 md:gap-6 mt-8 lg:mt-12">
                            {servicesSteps.filter(step => step.id % 2 === 0).map((step) => (
                                <div 
                                    key={step.id} 
                                    className={`p-5 md:p-6 rounded-2xl shadow-xl transition-all duration-700 hover:scale-[1.02] transform ${
                                        isVisible 
                                            ? 'opacity-100 translate-y-0 filter-none' 
                                            : 'opacity-0 translate-y-8 blur-sm'
                                    } ${step.delayClass} ${
                                        step.isFeatured 
                                            ? 'bg-gradient-to-br from-[#AB7743] to-[#966535] border-2 border-[#FFB03A]/40 text-neutral-950' 
                                            : 'bg-[#4C2B08]/40 border border-[#B7957F]/10'
                                    }`}
                                >
                                    <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-4 ${
                                        step.isFeatured 
                                            ? 'bg-white/90 shadow-inner' 
                                            : 'bg-[#4C2B08]/60 border border-[#B7957F]/20'
                                    }`}>
                                        {step.icon}
                                    </div>
                                    <h3 className={`text-base md:text-lg font-black mb-2 font-Gloock ${
                                        step.isFeatured ? 'text-white drop-shadow-sm' : 'text-[#FFFDF4]'
                                    }`}>
                                        {step.title}
                                    </h3>
                                    <p className={`text-xs md:text-sm leading-relaxed font-light ${
                                        step.isFeatured ? 'text-white/90 font-medium' : 'text-[#D7BDA6]/80'
                                    }`}>
                                        {step.desc}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* RIGHT SIDE: Rich Editorial Copy & Call to Action with Scroll Animation */}
                    <div 
                        className={`lg:col-span-6 flex flex-col space-y-6 lg:pl-4 transition-all duration-1000 transform ${
                            isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'
                        }`}
                    >
                        <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FFB03A]/10 text-[#FFB03A] text-[10px] font-black tracking-widest uppercase max-w-max border border-[#FFB03A]/20">
                            Our Concept
                        </span>
                        
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-[#FFFDF4] leading-[1.1] font-Gloock">
                            How we <span className="text-[#FFB03A]">work</span> & what you <span className="text-white">experience</span>
                        </h2>

                        <p className="text-sm md:text-base text-[#D7BDA6] leading-relaxed font-light">
                            At Cravenest, we believe clean, restaurant-grade dining should fit effortlessly into your busy schedule. We have eliminated meal prep, planning, cooking, and dishes. Every recipe is individually configured by our nutritional experts, slow-baked by master chefs, and delivered warm to your home.
                        </p>

                        <div className="pt-4 flex flex-wrap gap-4">
                            <Btn 
                                to="/menu" 
                                className="uppercase px-7 py-4 bg-[#AB7743] hover:bg-[#966535] text-white rounded-full text-xs font-black tracking-wider shadow-lg transition-transform hover:scale-[1.02]"
                            >
                                <span>View Weekly Menus</span>
                            </Btn>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default HomeServices;

