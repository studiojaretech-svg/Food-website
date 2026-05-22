'use client';

import React, { useState } from 'react';
import ContentManager from '@/components/ContentManager';
import Link from 'next/link';
import { ClientConfig } from '@thebcms/client';
import { PropRichTextDataParsed } from '@thebcms/types';

interface Props {
    title: string;
    description: PropRichTextDataParsed;
    seasons: unknown; // Safe generic structure to avoid any strict CMS type mapping mismatch
    bcmsConfig: ClientConfig;
}

// Dynamically extract the type of a single content node to maintain strict ESLint compliance
type BCMSNode = Props['description']['nodes'][number];

interface FoodCard {
    id: number;
    name: string;
    category: string;
    price: string;
    portion: string;
    badge?: string;
    image: string;
    ingredients: string;
}

const HomeSeasons: React.FC<Props> = ({
    title,
    description,
}) => {
    const [selectedCategory, setSelectedCategory] = useState('Trending');
    const [activeTooltipId, setActiveTooltipId] = useState<number | null>(2); // Starts with Card 2 active to mimic the reference shot
    const [addedItems, setAddedItems] = useState<number[]>([2]); // Card 2 starts checked/added

    const categories = ['Trending', 'Traditional Rice', 'Spiced Grills', 'Pastries'];

    // Authentic Nigerian gourmet plates with top-down photography
    const popularFoods: FoodCard[] = [
        {
            id: 1,
            name: 'Smoky Party Jollof',
            category: 'Traditional Rice',
            price: '₦4,500',
            portion: 'Single Platter',
            badge: 'New',
            image: 'https://images.unsplash.com/photo-1626700051175-6518c4793f4f?auto=format&fit=crop&w=400&h=400&q=80',
            ingredients: 'Long-grain parboiled rice, smoky tatashe tomato reduction, golden sweet plantains, bay leaf infusion.',
        },
        {
            id: 2,
            name: 'Smoked Beef Suya',
            category: 'Spiced Grills',
            price: '₦5,000',
            portion: 'Double Skewer',
            badge: 'Hit!',
            image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=400&h=400&q=80',
            ingredients: 'Tender thin-sliced beef flanks, roasted ground peanut dust, authentic hot yaji spice, sweet red onion rings.',
        },
        {
            id: 3,
            name: 'Golden Cardamom Puff Puff',
            category: 'Pastries',
            price: '₦2,500',
            portion: '6 pcs Portion',
            badge: 'Freshly Baked',
            image: 'https://images.unsplash.com/photo-1551024601-bec78aea704b?auto=format&fit=crop&w=400&h=400&q=80',
            ingredients: 'Sweet yeasted flour dough, organic cardamom seeds, raw cane sugar dusting, deep-fried to crisp perfection.',
        },
        {
            id: 4,
            name: 'Coconut Fried Rice',
            category: 'Traditional Rice',
            price: '₦4,800',
            portion: 'Gourmet Pack',
            image: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?auto=format&fit=crop&w=400&h=400&q=80',
            ingredients: 'Jasmine rice simmered in fresh coconut milk, sweet green peas, diced carrots, seasoned local white shrimp.',
        },
        {
            id: 5,
            name: 'Flaky Gourmet Meat Pie',
            category: 'Pastries',
            price: '₦3,000',
            portion: 'Large Pie',
            image: 'https://images.unsplash.com/photo-1608686207856-001b95cf60ca?auto=format&fit=crop&w=400&h=400&q=80',
            ingredients: 'Buttery shortcrust pastry shell, seasoned minced beef, soft-boiled potato cubes, rich culinary meat gravy.',
        },
        {
            id: 6,
            name: 'Peppered BBQ Croaker',
            category: 'Spiced Grills',
            price: '₦8,500',
            portion: 'Full Fish',
            badge: 'Chef Choice',
            image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=400&h=400&q=80',
            ingredients: 'Whole grilled river croaker, sweet scotch bonnet glaze, green bell pepper reduction, raw lime wedges.',
        },
        {
            id: 7,
            name: 'Scotch Bonnet Chicken',
            category: 'Spiced Grills',
            price: '₦4,200',
            portion: 'Single Drum',
            image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=400&h=400&q=80',
            ingredients: 'Succulent chicken drumstick marinated in roasted habaneros, sweet dark honey sauce, and organic ginger roots.',
        },
        {
            id: 8,
            name: 'Rich Efo Riro soup',
            category: 'Trending',
            price: '₦6,500',
            portion: 'Single Bowl',
            badge: 'Popular',
            image: 'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=400&h=400&q=80',
            ingredients: 'Freshly shredded shoko spinach leaves, cooked tripe and cowhide, local locust bean seasoning, red palm oil sauce.',
        },
    ];

    // Filter items based on selected category (Trending shows all highlights)
    const filteredFoods = selectedCategory === 'Trending' 
        ? popularFoods.filter(food => food.id === 1 || food.id === 2 || food.id === 3 || food.id === 8)
        : popularFoods.filter(food => food.category === selectedCategory);

    const toggleCart = (id: number) => {
        if (addedItems.includes(id)) {
            setAddedItems(addedItems.filter(item => item !== id));
        } else {
            setAddedItems([...addedItems, id]);
        }
    };

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

    return (
        <section className="relative py-20 lg:py-28 overflow-hidden bg-[#150a02]">
            {/* Soft Ambient Background Highlights */}
            <div className="absolute top-[10%] left-[-15%] w-[45%] h-[45%] rounded-full bg-[#FFB03A]/5 blur-3xl pointer-events-none" />
            <div className="absolute bottom-[10%] right-[-15%] w-[45%] h-[45%] rounded-full bg-[#AB7743]/5 blur-3xl pointer-events-none" />

            <div className="container mx-auto px-4 relative z-10">
                
                {/* 1. UPPER HEADER segment from screenshot (Title, Category navigation, Notice clock) */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12 pb-6 border-b border-white/10">
                    
                    {/* Left: Filter column */}
                    <div className="flex flex-col space-y-3">
                        <span className="text-[10px] uppercase tracking-widest font-black text-[#D7BDA6]/60">
                            Filter by:
                        </span>
                        <div className="flex flex-row md:flex-col gap-4 overflow-x-auto max-sm:w-full scrollbar-none">
                            {categories.map((cat) => (
                                <button
                                    key={cat}
                                    onClick={() => setSelectedCategory(cat)}
                                    className={`flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-left transition-colors whitespace-nowrap ${
                                        selectedCategory === cat 
                                            ? 'text-[#FFB03A]' 
                                            : 'text-[#D7BDA6]/40 hover:text-[#FFFDF4]'
                                    }`}
                                >
                                    <span className={`w-1 h-1 rounded-full bg-[#FFB03A] transition-transform duration-300 ${
                                        selectedCategory === cat ? 'scale-100 opacity-100' : 'scale-0 opacity-0'
                                    }`} />
                                    {cat}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Center: Title from screenshot */}
                    <div className="text-center md:absolute md:left-1/2 md:-translate-x-1/2 md:bottom-6 max-w-lg">
                        <h2 className="text-3xl lg:text-4xl font-black text-[#FFFDF4] tracking-wider font-Gloock uppercase drop-shadow-sm">
                            {title || 'CUSTOMER FAVOURITES'}
                        </h2>
                        <ContentManager
                            items={processedDescriptionNodes}
                            className="hidden lg:block text-[10px] tracking-widest uppercase text-[#D7BDA6]/50 mt-1 font-semibold"
                        />
                    </div>

                    {/* Right: Pick-up watch clock block from screenshot */}
                    <div className="flex items-center gap-3 bg-[#4C2B08]/25 border border-[#B7957F]/10 rounded-xl p-3 max-md:w-full">
                        <div className="p-2 bg-[#FFB03A]/10 rounded-lg text-[#FFB03A]">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <div className="text-left">
                            <p className="text-[10px] font-black uppercase text-[#FFB03A] tracking-wider leading-none mb-1">
                                Order Delivery window
                            </p>
                            <p className="text-[11px] font-medium text-[#D7BDA6] leading-tight">
                                Orders placed by 8:00 PM are packaged <br/>and shipped fresh the next morning.
                            </p>
                        </div>
                    </div>
                </div>

                {/* 2. THE GRID OF DELICACIES */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
                    {filteredFoods.map((food) => {
                        const isTooltipOpen = activeTooltipId === food.id;
                        const isItemAdded = addedItems.includes(food.id);
                        
                        // Food ID 2 matches the active featured Caramel backdrop from the screenshot
                        const isCaramelHighlighted = food.id === 2;

                        return (
                            <div 
                                key={food.id}
                                className={`group relative p-6 rounded-3xl transition-all duration-500 flex flex-col justify-between overflow-visible ${
                                    isCaramelHighlighted 
                                        ? 'bg-[#AB7743] text-white shadow-2xl scale-[1.01] border border-[#FFB03A]/30' 
                                        : 'bg-[#1a0c02] border border-white/5 shadow-lg hover:border-[#B7957F]/20'
                                }`}
                            >
                                {/* Top Badges & Information trigger */}
                                <div className="flex justify-between items-center mb-6">
                                    {food.badge ? (
                                        <span className={`text-[9px] font-black tracking-widest uppercase px-2 py-0.5 rounded-full ${
                                            isCaramelHighlighted 
                                                ? 'bg-[#4C2B08] text-white' 
                                                : 'bg-[#FFB03A]/10 border border-[#FFB03A]/20 text-[#FFB03A]'
                                        }`}>
                                            {food.badge}
                                        </span>
                                    ) : (
                                        <div />
                                    )}

                                    {/* Info Bubble Button */}
                                    <button 
                                        onClick={() => setActiveTooltipId(isTooltipOpen ? null : food.id)}
                                        className={`w-6 h-6 rounded-full flex items-center justify-center transition-colors cursor-pointer ${
                                            isCaramelHighlighted 
                                                ? 'bg-[#4C2B08]/40 text-white hover:bg-[#4C2B08]/60' 
                                                : 'bg-white/5 text-[#D7BDA6] hover:bg-white/10 hover:text-[#FFB03A]'
                                        }`}
                                    >
                                        <span className="text-xs font-semibold leading-none">i</span>
                                    </button>
                                </div>

                                {/* Top-Down Platter Photo Container */}
                                <div className="relative flex justify-center items-center h-44 mb-6">
                                    <div className="absolute w-[80%] h-[80%] rounded-full bg-black/25 blur-xl pointer-events-none" />
                                    <div className="relative w-36 h-36 rounded-full overflow-hidden border-4 border-white shadow-[0_15px_30px_rgba(0,0,0,0.35)] transition-transform duration-500 group-hover:scale-105">
                                        <img 
                                            src={food.image} 
                                            alt={food.name} 
                                            className="w-full h-full object-cover"
                                        />
                                    </div>

                                    {/* 3. POP-UP INGREDIENT TOOLTIP (Styled exactly like screenshot) */}
                                    {isTooltipOpen && (
                                        <div className="absolute inset-x-0 bottom-[-20px] mx-auto w-[90%] bg-[#361c07] border border-[#B7957F]/20 text-white rounded-xl p-3 shadow-2xl z-20 animate-fade-in">
                                            <p className="text-[10px] font-black uppercase tracking-wider text-[#FFB03A] mb-1">
                                                Ingredients
                                            </p>
                                            <p className="text-[11px] leading-relaxed text-[#D7BDA6]/95">
                                                {food.ingredients}
                                            </p>
                                            <button 
                                                onClick={() => setActiveTooltipId(null)}
                                                className="absolute top-2 right-2 text-xs text-[#D7BDA6]/50 hover:text-white"
                                            >
                                                ✕
                                            </button>
                                        </div>
                                    )}
                                </div>

                                {/* Food details */}
                                <div className="text-left mt-auto">
                                    <h3 className={`text-base font-black font-Gloock mb-4 tracking-tight uppercase leading-tight ${
                                        isCaramelHighlighted ? 'text-white' : 'text-[#FFFDF4]'
                                    }`}>
                                        {food.name}
                                    </h3>

                                    {/* Footer Details: Price, Portion, Action Capsule */}
                                    <div className="flex justify-between items-end">
                                        <div className="flex flex-col">
                                            <span className={`text-[10px] uppercase font-bold tracking-widest ${
                                                isCaramelHighlighted ? 'text-white/70' : 'text-[#D7BDA6]/55'
                                            }`}>
                                                {food.portion}
                                            </span>
                                            <span className={`text-base font-black tracking-tight ${
                                                isCaramelHighlighted ? 'text-white font-Gloock' : 'text-[#FFB03A]'
                                            }`}>
                                                {food.price}
                                            </span>
                                        </div>

                                        {/* Golden / Highlighted Action Button Capsule */}
                                        <button
                                            onClick={() => toggleCart(food.id)}
                                            className={`flex items-center justify-center rounded-lg px-3.5 py-1.5 transition-all text-[11px] font-black uppercase tracking-wider cursor-pointer shadow-md ${
                                                isItemAdded 
                                                    ? 'bg-emerald-500 hover:bg-emerald-600 text-white' 
                                                    : isCaramelHighlighted
                                                        ? 'bg-white text-neutral-950 hover:bg-white/90'
                                                        : 'bg-[#AB7743] hover:bg-[#966535] text-white'
                                            }`}
                                        >
                                            {isItemAdded ? (
                                                <span className="flex items-center gap-1">
                                                    ✓ Added
                                                </span>
                                            ) : (
                                                <span>Add</span>
                                            )}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* 3. VIEW ALL CTA (Linked directly to main menu router, not anchor index) */}
                <div className="mt-14 flex justify-center">
                    <Link
                        href="/menu"
                        className="inline-flex items-center gap-2 uppercase px-8 py-4 bg-[#AB7743] hover:bg-[#966535] text-white rounded-full text-xs font-black tracking-widest shadow-lg transition-transform hover:scale-[1.02] cursor-pointer"
                    >
                        <span>View All Dishes</span>
                        <span className="text-sm font-normal">→</span>
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default HomeSeasons;
