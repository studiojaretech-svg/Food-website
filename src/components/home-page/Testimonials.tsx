'use client';

import React, { useEffect, useRef, useState } from 'react';
import ContentManager from '@/components/ContentManager';
import SwiperCore from 'swiper';
import { A11y, Navigation } from 'swiper/modules';
import { SwiperSlide, Swiper } from 'swiper/react';
import { TestimonialGroup } from '@bcms-types/types/ts';
import { PropRichTextDataParsed } from '@thebcms/types';
import { ClientConfig } from '@thebcms/client';
import { BCMSImage } from '@thebcms/components-react';

interface Props {
    title: string;
    description: PropRichTextDataParsed;
    testimonials: TestimonialGroup[];
    bcmsConfig: ClientConfig;
}

SwiperCore.use([A11y, Navigation]);

// Dynamic node type extractor to satisfy TypeScript compilation rules
type BCMSNode = Props['description']['nodes'][number];

const HomeTestimonials: React.FC<Props> = ({
    title,
    description,
    testimonials,
    bcmsConfig,
}) => {
    const [isVisible, setIsVisible] = useState(false);
    const sectionRef = useRef<HTMLDivElement>(null);

    // Setup scroll intersection observer
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

    // Helper function to safely replace placeholder text "tastyyy" inside description nodes
    const replaceTextInNodes = (nodes: BCMSNode[]): BCMSNode[] => {
        if (!nodes) return [];
        return nodes.map((node) => {
            const newNode = { ...node } as BCMSNode;
            if (newNode && 'value' in newNode && typeof newNode.value === 'string') {
                (newNode as { value?: string }).value = newNode.value
                    .replace(/welcome to tastyyy/gi, 'Welcome to Cravenest')
                    .replace(/tastyyy/gi, 'Cravenest');
            }
            if (newNode && 'nodes' in newNode && newNode.nodes && Array.isArray(newNode.nodes)) {
                (newNode as { nodes?: BCMSNode[] }).nodes = replaceTextInNodes(newNode.nodes as BCMSNode[]);
            }
            return newNode;
        });
    };

    const processedDescriptionNodes = replaceTextInNodes(description.nodes as BCMSNode[]);

    // Function to render the word "TESTIMONIALS" with ONLY the 'I' inside the "NIALS" segment styled in Saffron Gold
    const renderStyledTitle = (rawTitle: string) => {
        const fallbackText = "TESTIMONIALS";
        const targetWord = (rawTitle || fallbackText).toUpperCase();
        
        // Find the absolute last occurrence of 'I' inside the word TESTIMONIALS (the 'I' inside "nials")
        const lastIndexI = targetWord.lastIndexOf('I'); 
        
        return (
            <span className="inline-flex flex-wrap justify-center">
                {targetWord.split('').map((char, idx) => {
                    const isTargetI = char === 'I' && idx === lastIndexI;
                    return (
                        <span 
                            key={idx} 
                            className={isTargetI ? 'text-[#FFB03A] font-black drop-shadow-[0_0_8px_rgba(255,176,58,0.45)] animate-pulse' : 'text-[#4C2B08]'}
                        >
                            {char}
                        </span>
                    );
                })}
            </span>
        );
    };

    return (
        <section 
            ref={sectionRef}
            className="relative bg-[#D7BDA6] py-20 lg:py-32 overflow-hidden transition-colors duration-500"
        >
            {/* Subtle background light-diffuser effects */}
            <div className="absolute top-[10%] left-[-15%] w-[45%] h-[45%] rounded-full bg-white/15 blur-[120px] pointer-events-none" />
            <div className="absolute bottom-[10%] right-[-15%] w-[45%] h-[45%] rounded-full bg-[#4C2B08]/5 blur-[120px] pointer-events-none" />

            <div className="container mx-auto px-4 relative z-10">
                <div className="flex flex-col items-center">
                    
                    {/* Index Tag Styled in High-Contrast Espresso */}
                    <div className="text-xs lg:text-sm font-black tracking-widest text-[#4C2B08] uppercase mb-4 px-3 py-1 bg-[#4C2B08]/5 rounded-full border border-[#4C2B08]/15">
                        [ 5 ]
                    </div>

                    {/* Section Title: Dynamic word structure highlighting ONLY the last 'I' in gold */}
                    <h2 
                        className={`text-3xl lg:text-5xl font-black tracking-tight font-Gloock mb-4 lg:mb-6 uppercase leading-none transition-all duration-1000 transform ${
                            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                        }`}
                    >
                        {renderStyledTitle(title)}
                    </h2>

                    {/* Description Subheader in warm, highly-readable Espresso with scroll reveal */}
                    <div
                        className={`transition-all duration-1000 delay-150 transform ${
                            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                        }`}
                    >
                        <ContentManager
                            items={processedDescriptionNodes}
                            className="text-sm lg:text-base leading-relaxed text-[#6D3914]/90 tracking-wide font-medium uppercase max-w-[745px] mx-auto mb-12 lg:mb-20 text-center"
                        />
                    </div>

                    {/* Slider Block with scroll-driven entry animations */}
                    <div 
                        className={`grid grid-cols-[auto,1fr,auto] gap-5 w-full items-center lg:gap-20 max-w-5xl mx-auto transition-all duration-[1200ms] delay-300 transform ${
                            isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
                        }`}
                    >
                        
                        {/* Prev button: Styled in Espresso with Saffron hover states */}
                        <button className="homeTestimonials--swiperPrev w-10 h-10 lg:w-14 lg:h-14 rounded-full border border-[#4C2B08]/20 bg-[#4C2B08]/5 hover:bg-[#4C2B08] hover:text-[#FFFDF4] transition-all flex items-center justify-center cursor-pointer shadow-sm shrink-0 group">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 48 48"
                                className="w-5 h-5 lg:w-6 lg:h-6 text-[#4C2B08] group-hover:text-[#FFFDF4] transition-colors"
                            >
                                <path
                                    fill="currentColor"
                                    d="m24 40 2.85-2.8L15.65 26H40v-4H15.65l11.2-11.2L24 8 8 24l16 16Z"
                                />
                            </svg>
                        </button>

                        <Swiper
                            slidesPerView={1}
                            watchOverflow
                            grabCursor
                            spaceBetween={12}
                            navigation={{
                                prevEl: '.homeTestimonials--swiperPrev',
                                nextEl: '.homeTestimonials--swiperNext',
                            }}
                            className="w-full"
                        >
                            {testimonials.map((testimonial, index) => {
                                const processedQuoteNodes = replaceTextInNodes((testimonial.quote.nodes || []) as BCMSNode[]);
                                return (
                                    <SwiperSlide
                                        key={index}
                                        className="flex flex-col items-center justify-center text-center"
                                    >
                                        {/* Main quote in massive, beautiful Gloock serif italic */}
                                        <ContentManager
                                            items={processedQuoteNodes}
                                            className="text-lg md:text-xl lg:text-3xl leading-relaxed font-Gloock italic text-[#4C2B08] mb-6 lg:mb-12"
                                        />
                                        
                                        {/* Author Image wrapper */}
                                        <div className="relative w-12 h-12 lg:w-16 lg:h-16 rounded-full overflow-hidden object-cover mb-3 mx-auto shadow-md border-2 border-white/50">
                                            <BCMSImage
                                                media={testimonial.author_avatar_image}
                                                clientConfig={bcmsConfig}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>

                                        {/* Author metadata */}
                                        <div className="text-xs lg:text-sm font-black tracking-widest text-[#6D3914]/85 uppercase font-Gloock leading-none">
                                            {testimonial.author_name}
                                        </div>
                                    </SwiperSlide>
                                );
                            })}
                        </Swiper>

                        {/* Next button: Styled in Espresso with Saffron hover states */}
                        <button className="homeTestimonials--swiperNext w-10 h-10 lg:w-14 lg:h-14 rounded-full border border-[#4C2B08]/20 bg-[#4C2B08]/5 hover:bg-[#4C2B08] hover:text-[#FFFDF4] transition-all flex items-center justify-center cursor-pointer shadow-sm shrink-0 group">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 48 48"
                                className="w-5 h-5 lg:w-6 lg:h-6 text-[#4C2B08] group-hover:text-[#FFFDF4] transition-colors"
                            >
                                <path
                                    fill="currentColor"
                                    d="m24 40-2.85-2.8L32.35 26H8v-4h24.35l-11.2-11.2L24 8l16 16-16 16Z"
                                />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HomeTestimonials;

