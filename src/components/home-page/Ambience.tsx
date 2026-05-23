'use client';

import React from 'react';
import HomePageDivider from '@/components/home-page/Divider';
import ContentManager from '@/components/ContentManager';
import { PropRichTextDataParsed } from '@thebcms/types';
import { TextWithImageGroup } from '@bcms-types/types/ts';
import { ClientConfig } from '@thebcms/client';
import { BCMSImage } from '@thebcms/components-react';

interface Props {
    title: string;
    description: PropRichTextDataParsed;
    items: TextWithImageGroup[];
    bcmsConfig: ClientConfig;
}

// Dynamically extract the type of a single content node to maintain strict ESLint compliance
type BCMSNode = Props['description']['nodes'][number];

const HomeAmbience: React.FC<Props> = ({
    title,
    description,
    items,
    bcmsConfig,
}) => {

    // Helper function to dynamically replace placeholder text "tastyyy" inside description & item nodes
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
        <section className="relative bg-[#B7957F] pt-20 pb-12 lg:pt-32 lg:pb-20 overflow-hidden transition-colors duration-500">
            {/* Subtle light-scattering ambient highlights to add luxurious depth over the Almond stucco backdrop */}
            <div className="absolute top-[20%] left-[-10%] w-[45%] h-[45%] rounded-full bg-white/20 blur-[130px] pointer-events-none" />
            <div className="absolute bottom-[20%] right-[-10%] w-[45%] h-[45%] rounded-full bg-[#4C2B08]/10 blur-[130px] pointer-events-none" />

            <div className="container mx-auto px-4 relative z-10">
                {/* Responsive Dual Column Layout: Side-by-side on desktop (lg), stacked on mobile */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
                    
                    {/* LEFT SIDE: Editorial Typography column (Spans 5 columns on desktop) */}
                    <div className="lg:col-span-5 flex flex-col space-y-4 lg:space-y-6 text-left">
                        {/* Index Tag Styled in High-Contrast Espresso */}
                        <div className="inline-flex items-center gap-2 text-xs lg:text-sm font-black tracking-widest text-[#4C2B08] uppercase max-w-max px-3 py-1 bg-[#4C2B08]/5 rounded-full border border-[#4C2B08]/15">
                            [ 3 ]
                        </div>

                        {/* Section Title in bold, organic Gloock Serif */}
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-[#4C2B08] leading-[1.1] tracking-tight font-Gloock uppercase">
                            {title}
                        </h2>

                        {/* Description paragraphs styled in deep roasted Coffee for premium legibility */}
                        <ContentManager
                            items={processedDescriptionNodes}
                            className="text-sm md:text-base leading-relaxed text-[#4C2B08]/90 font-medium uppercase max-w-xl"
                        />
                    </div>

                    {/* RIGHT SIDE: Gorgeous 2-Column Photo Gallery Grid (Spans 7 columns on desktop) */}
                    <div className="lg:col-span-7">
                        <div className="grid grid-cols-2 gap-4 auto-rows-fr lg:gap-6">
                            {items.map((item, index) => {
                                const processedItemTextNodes = replaceTextInNodes((item.text.nodes || []) as BCMSNode[]);

                                return (
                                    <div
                                        key={index}
                                        className="group relative w-full h-full min-h-[220px] md:min-h-[280px] lg:min-h-[340px] rounded-3xl overflow-hidden border border-white/10 shadow-[0_15px_30px_rgba(76,43,8,0.15)] transition-all duration-500 hover:shadow-[0_25px_50px_rgba(76,43,8,0.25)] hover:border-[#FFB03A]/20"
                                    >
                                        {/* Premium Floating Glassmorphism Badge */}
                                        <div className="absolute z-10 top-4 left-4 md:top-6 md:left-6 bg-[#4C2B08]/90 rounded-full border border-white/10 px-4 py-2 shadow-lg max-w-[calc(100%-32px)] backdrop-blur-md transition-colors duration-300 group-hover:bg-[#AB7743] group-hover:border-[#FFB03A]/30">
                                            <ContentManager
                                                items={processedItemTextNodes}
                                                className="text-[10px] md:text-xs font-black leading-none uppercase truncate text-white tracking-wider"
                                            />
                                        </div>

                                        {/* Image zoom on hover */}
                                        <BCMSImage
                                            media={item.image}
                                            clientConfig={bcmsConfig}
                                            className="absolute top-0 left-0 w-full h-full object-cover transform scale-100 group-hover:scale-[1.03] transition-transform duration-[1000ms] ease-out"
                                        />

                                        {/* Elegant cinematic shadow vignette */}
                                        <div className="absolute inset-0 w-full h-full bg-gradient-to-t from-black/50 via-black/10 to-transparent transition-opacity duration-500 group-hover:opacity-90" />
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                </div>
            </div>

            <HomePageDivider />
        </section>
    );
};

export default HomeAmbience;

