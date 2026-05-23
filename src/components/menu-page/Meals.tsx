'use client';

import React, { useEffect, useMemo, useState, useRef } from 'react';
import ArchWithStar from '@/components/ArchWithStar';
import ContentManager from '@/components/ContentManager';
import { ClientConfig } from '@thebcms/client';
import { BCMSImage } from '@thebcms/components-react';
import {
    FoodItemEntryMetaItem,
    MealTypeEntryMetaItem,
    MenuPageEntryMetaItem,
} from '@bcms-types/types/ts';
import classNames from 'classnames';
import { useSearchParams } from 'next/navigation';

interface Props {
    meta: MenuPageEntryMetaItem;
    meals: MealTypeEntryMetaItem[];
    foodItems: FoodItemEntryMetaItem[];
    bcmsConfig: ClientConfig;
}

// Extracted types to maintain absolute ESLint compiler compliance
type BCMSNode = MealTypeEntryMetaItem['description']['nodes'][number];

const MenuMeals: React.FC<Props> = ({ meta, meals, foodItems, bcmsConfig }) => {
    const [activeMealType, setActiveMealType] = useState('breakfast');
    const params = useSearchParams();
    const isFirstRender = useRef(true);

    // Sync state with URL query search parameters safely on mount
    useEffect(() => {
        if (isFirstRender.current) {
            const initialTab = params.get('s');
            if (initialTab) {
                setActiveMealType(initialTab);
            }
            isFirstRender.current = false;
        }
    }, [params]);

    const activeMealTypeDescription = useMemo(() => {
        const foundMeal = meals.find(
            (mealType) => mealType.title.toLowerCase() === activeMealType.toLowerCase(),
        );
        return foundMeal?.description.nodes || [];
    }, [activeMealType, meals]);

    const filteredFoodItems = useMemo(() => {
        return (
            foodItems.filter((item) => {
                return item.type.find(
                    (e) => e.meta.en?.title.toLowerCase() === activeMealType.toLowerCase(),
                );
            }) || []
        );
    }, [activeMealType, foodItems]);

    return (
        <section className="relative bg-[#D7BDA6] pt-24 pb-20 overflow-hidden lg:pt-36 lg:pb-32 transition-colors duration-500">
            {/* Subtle background ambient reflections */}
            <div className="absolute top-[10%] left-[-15%] w-[45%] h-[45%] rounded-full bg-white/20 blur-[130px] pointer-events-none" />
            <div className="absolute bottom-[10%] right-[-15%] w-[45%] h-[45%] rounded-full bg-[#4C2B08]/5 blur-[130px] pointer-events-none" />

            <div className="container mx-auto px-4 max-w-[1240px] relative z-10">
                <ArchWithStar />
                
                {/* Header Copy segment */}
                <div className="relative px-4 max-w-xl lg:max-w-2xl mx-auto text-center mb-16">
                    {/* Index tag */}
                    <div className="inline-flex items-center gap-1.5 text-xs font-black tracking-widest text-[#4C2B08] uppercase mb-4 px-3 py-1 bg-[#4C2B08]/5 rounded-full border border-[#4C2B08]/15">
                        <span>✦ Culinary Offerings ✦</span>
                    </div>

                    {/* Headline styled in Gloock Serif */}
                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-black font-Gloock uppercase text-[#4C2B08] tracking-tight mb-6">
                        {meta.title || 'Our Premium Menus'}
                    </h1>

                    {/* Description styled in warm coffee */}
                    <div className="text-sm md:text-base leading-relaxed text-[#6D3914]/90 uppercase font-medium max-w-lg mx-auto mb-10">
                        {activeMealTypeDescription.length > 0 ? (
                            <ContentManager items={activeMealTypeDescription as BCMSNode[]} />
                        ) : (
                            <p>Discover our chef-crafted seasonal select items customized for gourmet standards.</p>
                        )}
                    </div>

                    {/* Espresso & Vanilla tab selector buttons */}
                    <div className="flex flex-wrap items-center justify-center gap-3 md:gap-4">
                        {meals.map((mealType, index) => {
                            const isTabActive = mealType.title.toLowerCase() === activeMealType.toLowerCase();
                            return (
                                <button
                                    key={index}
                                    className={classNames(
                                        'flex justify-center px-6 py-2.5 border rounded-full transition-all duration-300 text-xs font-black uppercase tracking-widest cursor-pointer shadow-sm hover:scale-[1.02] max-md:w-full max-md:max-w-xs',
                                        {
                                            'border-[#4C2B08] bg-[#4C2B08] text-white': isTabActive,
                                            'border-[#4C2B08]/20 text-[#4C2B08]/80 hover:text-[#4C2B08] hover:border-[#4C2B08]': !isTabActive,
                                        },
                                    )}
                                    onClick={() => setActiveMealType(mealType.title.toLowerCase())}
                                >
                                    <span>{mealType.title}</span>
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* THE CARD GRIDS: Customized for a luxury digital layout */}
                {filteredFoodItems.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
                        {filteredFoodItems.map((item, index) => (
                            <div
                                key={item.slug || index}
                                className="group relative bg-[#1a0c02] rounded-3xl overflow-hidden border border-white/5 shadow-[0_15px_30px_rgba(76,43,8,0.12)] hover:border-[#FFB03A]/30 hover:shadow-[0_25px_50px_rgba(76,43,8,0.25)] flex flex-col justify-between h-[380px] sm:h-[420px] transition-all duration-500 cursor-pointer"
                            >
                                {/* Photo Container with subtle Zoom */}
                                <div className="absolute inset-0 w-full h-full">
                                    <BCMSImage
                                        media={item.cover_image}
                                        clientConfig={bcmsConfig}
                                        className="w-full h-full object-cover transform scale-100 group-hover:scale-[1.03] transition-transform duration-[1000ms] ease-out"
                                    />
                                    {/* Cozy vignette overlay */}
                                    <div className="absolute inset-0 w-full h-full bg-gradient-to-t from-[#1C0F03] via-[#4C2B08]/40 to-transparent transition-opacity duration-500 group-hover:opacity-90" />
                                </div>

                                {/* Floating Premium Label Category */}
                                <div className="absolute top-5 left-5 z-20">
                                    <span className="text-[9px] font-black tracking-widest uppercase px-3 py-1 bg-[#4C2B08]/90 text-white rounded-full border border-white/10 backdrop-blur-md">
                                        ✦ {activeMealType} ✦
                                    </span>
                                </div>

                                {/* Bottom Typography Details */}
                                <div className="relative z-10 mt-auto p-6 flex flex-col text-left">
                                    {/* Platter Title */}
                                    <h3 className="text-lg md:text-xl font-black font-Gloock text-white leading-tight mb-2 uppercase group-hover:text-[#FFB03A] transition-colors">
                                        {item.title}
                                    </h3>
                                    
                                    {/* Platter Description */}
                                    <ContentManager
                                        items={item.description.nodes}
                                        className="text-xs text-[#D7BDA6] font-light leading-relaxed mb-4 line-clamp-2 group-hover:line-clamp-none transition-all duration-500"
                                    />

                                    {/* Price tag & Ordering details */}
                                    <div className="flex justify-between items-center pt-3 border-t border-white/10 mt-2">
                                        <div className="flex flex-col">
                                            <span className="text-[9px] font-bold uppercase tracking-widest text-white/50 leading-none">Price Starting At</span>
                                            <span className="text-base font-black font-Gloock text-[#FFB03A] mt-1">₦{item.price}</span>
                                        </div>
                                        
                                        {/* Action CTA */}
                                        <div className="text-[10px] font-black uppercase tracking-wider text-white bg-[#AB7743] hover:bg-[#966535] px-4 py-2 rounded-full shadow-md transition-all group-hover:translate-x-0.5">
                                            Select
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-sm leading-none tracking-[-0.41px] text-center text-[#4C2B08]/60 my-28 py-12 bg-[#4C2B08]/5 rounded-3xl border border-[#4C2B08]/10 max-w-md mx-auto">
                        No culinary items found in this category.
                    </div>
                )}
            </div>
        </section>
    );
};

export default MenuMeals;

