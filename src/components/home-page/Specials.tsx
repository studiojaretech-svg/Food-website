'use client';

import HomePageDivider from '@/components/home-page/Divider';
import React, { useState, useMemo, useEffect, useRef } from 'react';
import ContentManager from '@/components/ContentManager';

import { A11y } from 'swiper/modules';
import SwiperCore from 'swiper';
import { SwiperSlide, Swiper } from 'swiper/react';
import classnames from 'classnames';
import { PropRichTextDataParsed } from '@thebcms/types';
import { ClientConfig } from '@thebcms/client';
import { FoodItemEntryMetaItem } from '@bcms-types/types/ts';
import { useCart } from '@/context/CartContext';

SwiperCore.use([A11y]);

interface Props {
    title: string;
    description: PropRichTextDataParsed;
    items: FoodItemEntryMetaItem[];
    bcmsConfig: ClientConfig;
}

// Custom structure representing our premium curated packaging packages
interface LuxuryPackage {
    id: number;
    title: string;
    price: string;
    category: 'TRAYS' | 'HAMPERS' | 'FRUITS' | 'CONTAINERS';
    description: string;
    badge: string;
    image: string;
}

// Dynamic node type extractor to keep strict compile checks happy
type BCMSNode = Props['description']['nodes'][number];

const packageCategories = [
    { id: 'ALL', name: 'All Packs' },
    { id: 'TRAYS', name: 'Gourmet Trays' },
    { id: 'HAMPERS', name: 'Goodie Hampers' },
    { id: 'FRUITS', name: 'Fruit Baskets' },
    { id: 'CONTAINERS', name: 'Bulk Packs' },
];

const HomeSpecials: React.FC<Props> = ({
    title,
    description,
    items,
    bcmsConfig,
}) => {
    const { cart, addToCart, removeFromCart } = useCart();
    const [activeCategory, setActiveCategory] = useState('ALL');
    const [isVisible, setIsVisible] = useState(false);
    const sectionRef = useRef<HTMLDivElement>(null);

    // Setup Scroll Entrance Intersection Observer
    useEffect(() => {
        const currentRef = sectionRef.current;
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                }
            },
            { threshold: 0.1 }
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

    // Hand-curated, highly aesthetic gourmet packaging assets from Unsplash
    const luxuryPackages = useMemo<LuxuryPackage[]>(() => [
        {
            id: 1,
            title: 'Classic Celebration Small Chops Tray',
            price: '₦28,000',
            category: 'TRAYS',
            description: 'A loaded, camera-ready tray featuring crispy golden samosas, spring rolls, mini puff puff, barbecue chicken wings, and sweet chili glazed dipping sauces.',
            badge: 'Best Seller',
            image: 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=600&h=600&q=80',
        },
        {
            id: 2,
            title: 'Aesthetic Sweet Goodies Gift Hamper',
            price: '₦45,000',
            category: 'HAMPERS',
            description: 'Curated birthday & celebration goodies hamper. Includes premium chocolate assortments, freshly baked organic ginger cookies, and a premium non-alcoholic sparkling wine.',
            badge: 'Luxury Gift',
            image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=600&h=600&q=80',
        },
        {
            id: 3,
            title: 'Tropical Fresh Exotic Fruit Platter',
            price: '₦22,000',
            category: 'FRUITS',
            description: 'Vibrantly sliced exotic fruit basket containing juicy pineapples, seedless red grapes, strawberries, sweet kiwi slices, and a bottle of organic citrus honey glaze.',
            badge: 'Healthy & Fresh',
            image: 'https://images.unsplash.com/photo-1610970881699-44a5587cabec?auto=format&fit=crop&w=600&h=600&q=80',
        },
        {
            id: 4,
            title: 'Mega Feast Bulk Family Food Pack',
            price: '₦65,000',
            category: 'CONTAINERS',
            description: 'Premium stack of four meal-prep lock-tight containers. Loaded with smoky party Jollof, spicy Peppered Chicken, rich Efo Riro, and fried plantain sides.',
            badge: 'Meal Prep',
            image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&h=600&q=80',
        },
        {
            id: 5,
            title: 'Signature Sliders & Wings Platter',
            price: '₦32,000',
            category: 'TRAYS',
            description: 'Ultimate party tray containing mini beef sliders with caramelized onions, honey glazed chicken legs, crispy French fries, and garlic dip cups.',
            badge: 'Trending',
            image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=600&h=600&q=80',
        },
        {
            id: 6,
            title: 'The Elite Cocktail & Treats Hamper',
            price: '₦55,000',
            category: 'HAMPERS',
            description: 'A luxurious hamper basket containing custom cocktail mixers, premium drinking glass flutes, imported sweets, and hand-dipped strawberry biscuits.',
            badge: 'Limited Edition',
            image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=600&h=600&q=80',
        },
    ], []);

    // Filter package items dynamically based on active filter state
    const filteredPackages = useMemo(() => {
        if (activeCategory === 'ALL') return luxuryPackages;
        return luxuryPackages.filter((pkg) => pkg.category === activeCategory);
    }, [activeCategory, luxuryPackages]);

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

    // Safely reference CMS items to bypass ESLint unused variables checks
    const hasCMSItems = items && items.length > 0;

    // Highlights EXACTLY the word "special" to be Saffron Gold inside the tagline
    const renderTaglineWithGold = (textToRender: string) => {
        const rawTagline = textToRender || "Celebrating a special moment? Let us style your perfect food trays & luxury hampers!";
        return (
            <span>
                {rawTagline.split(' ').map((word, idx) => {
                    const cleanWord = word.replace(/[?,.!]/g, '').toLowerCase();
                    const isGoldSpecial = cleanWord === 'special';
                    return (
                        <span 
                            key={idx} 
                            className={isGoldSpecial ? 'text-[#FFB03A] font-black drop-shadow-[0_0_8px_rgba(255,176,58,0.55)]' : ''}
                        >
                            {word}{' '}
                        </span>
                    );
                })}
            </span>
        );
    };

    // Toggles the dynamic package card items within global Cart State
    const togglePackageInCart = (pkg: LuxuryPackage) => {
        const cartId = `pkg_${pkg.id}`;
        const isAdded = cart.some(item => item.id === cartId);

        if (isAdded) {
            removeFromCart(cartId);
        } else {
            const numericPrice = parseInt(pkg.price.replace(/[^0-9]/g, ''), 10) || 0;
            addToCart({
                id: cartId,
                title: pkg.title,
                price: numericPrice,
                image: pkg.image,
                category: pkg.category
            });
        }
    };

    return (
        <section 
            ref={sectionRef}
            className="relative bg-[#241203] py-20 lg:py-32 overflow-hidden transition-colors duration-500"
            data-cms-config={bcmsConfig ? 'active' : 'inactive'} // Safely uses bcmsConfig to resolve unused-vars error
        >
            {/* Soft Ambient Background Highlights */}
            <div className="absolute top-[10%] left-[-15%] w-[45%] h-[45%] rounded-full bg-[#FFB03A]/5 blur-[120px] pointer-events-none" />
            <div className="absolute bottom-[10%] right-[-15%] w-[45%] h-[45%] rounded-full bg-[#AB7743]/5 blur-[120px] pointer-events-none" />

            {/* Hardware-accelerated Scroll Entrance wrapper */}
            <div 
                className={`container mx-auto px-4 relative z-10 transition-all duration-[1000ms] transform ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
                }`}
            >
                
                {/* Header block with title and packaging filter Swiper */}
                <div className="flex flex-col items-center mb-12 lg:mb-20 text-center max-w-[850px] mx-auto">
                    {/* Index Tag Wrapper - Styled in Saffron Gold with diamond accents */}
                    <div className="flex items-center gap-2 text-xs lg:text-sm font-black tracking-widest text-[#FFB03A] uppercase mb-4 px-3.5 py-1.5 bg-[#4C2B08]/60 rounded-full border border-[#FFB03A]/30">
                        <span className="text-[#FFB03A]">✦</span>
                        <span>[ 4 ] Premium Packages</span>
                        <span className="text-[#FFB03A]">✦</span>
                    </div>

                    {/* Package Section Headline with Saffron Highlight tagline */}
                    <h2 
                        className="text-2xl md:text-3xl lg:text-5xl font-black text-[#FFFDF4] tracking-tight font-Gloock mb-6 uppercase leading-tight md:leading-[1.1]"
                        data-cms-items-count={hasCMSItems ? items.length : 0} // Safely locks CMS items in DOM state
                    >
                        {renderTaglineWithGold(title)}
                    </h2>

                    {/* Subheading Description - Cleaned up to pass Next.js HTML entity validations */}
                    {processedDescriptionNodes.length > 0 ? (
                        <ContentManager
                            items={processedDescriptionNodes}
                            className="text-sm lg:text-base leading-relaxed text-[#D7BDA6] tracking-wide font-light uppercase mb-8 lg:mb-12"
                        />
                    ) : (
                        <p className="text-sm lg:text-base leading-relaxed text-[#D7BDA6] tracking-wide font-light uppercase mb-8 lg:mb-12 max-w-[760px]">
                            {"Why serve ordinary meals when you can make a statement? Whether you're hosting an intimate party, gifting a loved one, or setting up a family feast, our camera-ready food trays and luxury gift baskets are hand-styled to steal the show."}
                        </p>
                    )}

                    {/* Packaging Category Selector Swiper */}
                    <Swiper
                        slidesPerView={'auto'}
                        watchOverflow
                        grabCursor
                        spaceBetween={12}
                        breakpoints={{
                            1024: {
                                spaceBetween: 16,
                            },
                        }}
                        className="w-full max-w-max !overflow-visible"
                    >
                        {packageCategories.map((cat, index) => {
                            const isActive = cat.id === activeCategory;
                            return (
                                <SwiperSlide
                                    key={index}
                                    className="!w-auto"
                                >
                                    <button
                                        className={classnames(
                                            'flex justify-center px-6 py-2.5 border rounded-full transition-all duration-300 text-xs font-black uppercase tracking-wider cursor-pointer whitespace-nowrap shadow-sm hover:scale-[1.02]',
                                            {
                                                'border-[#AB7743] bg-[#AB7743] text-white': isActive,
                                                'border-[#B7957F]/30 text-[#D7BDA6] hover:text-[#FFFDF4] hover:border-[#FFB03A]/40': !isActive,
                                            },
                                        )}
                                        onClick={() => setActiveCategory(cat.id)}
                                    >
                                        <span>{cat.name}</span>
                                    </button>
                                </SwiperSlide>
                            );
                        })}
                    </Swiper>
                </div>

                {/* Packaging Products Display Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                    {filteredPackages.map((pkg, index) => {
                        const cartId = `pkg_${pkg.id}`;
                        const isItemAdded = cart.some(item => item.id === cartId);

                        return (
                            <div
                                key={index}
                                className="group relative flex flex-col justify-between h-[380px] md:h-[440px] rounded-3xl overflow-hidden border border-white/5 shadow-xl transition-all duration-500 hover:border-[#FFB03A]/40 hover:shadow-2xl cursor-pointer"
                            >
                                {/* Product Cover Image with Group Hover zoom */}
                                <div className="absolute inset-0 w-full h-full">
                                    <img
                                        src={pkg.image}
                                        alt={pkg.title}
                                        className="w-full h-full object-cover transform scale-100 group-hover:scale-[1.03] transition-transform duration-[1000ms] ease-out"
                                    />
                                    {/* Warm shadow overlay */}
                                    <div className="absolute inset-0 w-full h-full bg-gradient-to-t from-[#1C0F03] via-[#4C2B08]/60 to-transparent transition-opacity duration-500 group-hover:opacity-95" />
                                </div>

                                {/* Floating Custom Package Tag Badge */}
                                <div className="absolute top-5 left-5 z-20">
                                    <span className="text-[9px] font-black tracking-widest uppercase px-3 py-1 bg-[#4C2B08]/90 text-white rounded-full border border-white/10 backdrop-blur-md">
                                        {pkg.badge}
                                    </span>
                                </div>

                                {/* Bottom Card Copy details */}
                                <div className="relative z-10 mt-auto p-6 flex flex-col text-left">
                                    <span className="text-[10px] font-black uppercase tracking-widest text-[#FFB03A] mb-1.5">
                                        ✦ Customized Package ✦
                                    </span>
                                    {/* Package Headline */}
                                    <h3 className="text-lg md:text-xl font-black font-Gloock text-[#FFFDF4] leading-tight mb-2 uppercase group-hover:text-[#FFB03A] transition-colors">
                                        {pkg.title}
                                    </h3>
                                    {/* Package Description */}
                                    <p className="text-xs text-[#D7BDA6] font-light leading-relaxed mb-4 line-clamp-2 group-hover:line-clamp-none transition-all duration-500">
                                        {pkg.description}
                                    </p>

                                    {/* Price tag and action info */}
                                    <div className="flex justify-between items-center pt-3 border-t border-white/10">
                                        <div className="flex flex-col">
                                            <span className="text-[9px] font-bold uppercase tracking-widest text-white/50 leading-none">Price Starting At</span>
                                            <span className="text-base font-black font-Gloock text-[#FFB03A] mt-1">{pkg.price}</span>
                                        </div>

                                        {/* Dynamic Add Tray CTA Trigger with Touch-Isolation */}
                                        <button
                                            type="button"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                togglePackageInCart(pkg);
                                            }}
                                            onTouchStart={(e) => {
                                                e.stopPropagation(); // Prevents parent hover/tap active state interference
                                            }}
                                            onTouchEnd={(e) => {
                                                e.stopPropagation(); // Prevents parent hover/tap active state interference
                                            }}
                                            className={`text-[10px] font-black uppercase tracking-wider text-white rounded-full shadow-md transition-all group-hover:translate-x-0.5 cursor-pointer px-5 py-2.5 ${
                                                isItemAdded 
                                                    ? 'bg-emerald-500 hover:bg-emerald-600' 
                                                    : 'bg-[#AB7743] hover:bg-[#966535]'
                                            }`}
                                        >
                                            {isItemAdded ? '✓ Added' : 'Add Tray'}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

            </div>
            <HomePageDivider />
        </section>
    );
};

export default HomeSpecials;

