'use client';

import React from 'react';
import ContentManager from '@/components/ContentManager';
import Link from 'next/link';
import HomePageDivider from '@/components/home-page/Divider';
import { ClientConfig } from '@thebcms/client';
import { PropRichTextDataParsed } from '@thebcms/types';
import { BCMSImage } from '@thebcms/components-react';
import { MealTypeEntry } from '@bcms-types/types/ts';

interface Props {
    title: string;
    description: PropRichTextDataParsed;
    meals: MealTypeEntry[];
    bcmsConfig: ClientConfig;
}

// Dynamically extract the type of a single content node to maintain strict ESLint compliance
type BCMSNode = Props['description']['nodes'][number];

const HomeMenu: React.FC<Props> = ({
    title,
    description,
    meals,
    bcmsConfig,
}) => {

    // Helper function to dynamically replace placeholder text "tastyyy" with "Cravenest"
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

    return (
        <section className="relative bg-[#D7BDA6] pt-16 pb-8 lg:pt-24 lg:pb-12 overflow-hidden transition-colors duration-500">
            {/* Soft Ambient Background Highlights to add elegant light-theme depth */}
            <div className="absolute top-[10%] left-[-15%] w-[50%] h-[50%] rounded-full bg-white/20 blur-[120px] pointer-events-none" />
            <div className="absolute bottom-[10%] right-[-15%] w-[50%] h-[50%] rounded-full bg-[#AB7743]/10 blur-[120px] pointer-events-none" />

            <div className="container mx-auto px-4 relative z-10">
                {/* Header Segment */}
                <div className="flex flex-col items-center text-center mb-12 lg:mb-18 max-w-[765px] mx-auto">
                    {/* Index Tag Styled in High-Contrast Espresso with a fine border */}
                    <div className="text-xs lg:text-sm font-black tracking-widest text-[#4C2B08] uppercase mb-4 px-3 py-1 bg-[#4C2B08]/5 rounded-full border border-[#4C2B08]/15">
                        [ 2 ]
                    </div>
                    {/* Title Styled in Deep Espresso (Incredible high-end editorial feel) */}
                    <h2 className="text-3xl lg:text-5xl font-black text-[#4C2B08] tracking-tight font-Gloock mb-4 lg:mb-6">
                        {title}
                    </h2>
                    {/* Description Styled in Deep Roasted Coffee */}
                    <ContentManager
                        items={processedDescriptionNodes}
                        className="text-sm lg:text-base leading-relaxed text-[#6D3914]/90 tracking-wide font-medium uppercase"
                    />
                </div>
            </div>

            {/* Menu Category Grid/Cards */}
            <div className="space-y-6 lg:space-y-8 container mx-auto px-4 pb-12">
                {meals.map((meal, index) => {
                    const processedMealDescription = replaceTextInNodes((meal.meta.en?.description.nodes || []) as BCMSNode[]);
                    
                    return (
                        <Link
                            key={index}
                            href={`/menu?s=${meal.meta.en?.title.toLowerCase()}`}
                            className="group relative flex w-full h-[220px] md:h-[320px] lg:h-[400px] overflow-hidden rounded-3xl border border-[#4C2B08]/15 shadow-[0_15px_30px_rgba(76,43,8,0.12)] transition-all duration-500 hover:border-[#4C2B08] hover:shadow-[0_25px_50px_rgba(76,43,8,0.22)] cursor-pointer"
                        >
                            {meal.meta.en && (
                                <div className="relative w-full h-full flex items-center justify-center">
                                    {/* 1. Backdrop Zoom-in Cover Image */}
                                    <div className="absolute inset-0 w-full h-full">
                                        <BCMSImage
                                            media={meal.meta.en?.cover_image}
                                            clientConfig={bcmsConfig}
                                            className="w-full h-full object-cover transform scale-100 group-hover:scale-[1.03] transition-transform duration-[1000ms] ease-out"
                                        />
                                    </div>

                                    {/* 2. Cozy, Dynamic Vignette Overlay blending from our deep Mocca into a dark smoke */}
                                    <div className="absolute inset-0 w-full h-full bg-gradient-to-t from-[#4C2B08] via-[#4C2B08]/60 to-transparent transition-opacity duration-500 group-hover:opacity-90" />

                                    {/* 3. Central Interactive Copy Blocks */}
                                    <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-[680px] mx-auto transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                                        {/* Dynamic category icon or bullet */}
                                        <span className="text-xs font-bold uppercase tracking-widest text-[#FFB03A] mb-2 opacity-90 group-hover:opacity-100 transition-opacity">
                                            ✦ Signature Menu ✦
                                        </span>
                                        {/* Plate Title */}
                                        <h3 className="text-2xl md:text-3xl lg:text-4xl font-black font-Gloock text-[#FFFDF4] uppercase mb-3 transition-colors duration-300 group-hover:text-[#FFB03A]">
                                            {meal.meta.en.title}
                                        </h3>
                                        {/* Plate Description */}
                                        <ContentManager
                                            items={processedMealDescription}
                                            className="text-xs md:text-sm lg:text-base leading-relaxed tracking-wide text-[#FFFDF4]/90 uppercase font-light"
                                        />
                                        
                                        {/* Hover Action Button Element */}
                                        <div className="mt-4 flex items-center gap-1.5 text-xs font-black text-white bg-[#AB7743] hover:bg-[#966535] px-4 py-2 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0 shadow-md">
                                            <span>Explore Menu</span>
                                            <span className="text-sm font-normal">→</span>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </Link>
                    );
                })}
            </div>

            <HomePageDivider />
        </section>
    );
};

export default HomeMenu;

