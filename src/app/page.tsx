import HomeHero from '@/components/home-page/Hero';
import HomeServices from '@/components/home-page/Services';
import HomeMenu from '@/components/home-page/Menu';
import HomeSeasons from '@/components/home-page/Seasons';
import HomeAmbience from '@/components/home-page/Ambience';
import HomeSpecials from '@/components/home-page/Specials';
import HomeEvents from '@/components/home-page/Events';
import HomeTestimonials from '@/components/home-page/Testimonials';
import 'swiper/css';
import {
    FoodItemEntry,
    FoodItemEntryMetaItem,
    HomePageEntry,
    HomePageEntryMetaItem,
} from '@bcms-types/types/ts';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { bcmsPrivate } from '@/bcms-private';
import { bcmsPublic } from '@/bcms-public';

export async function generateMetadata(): Promise<Metadata> {
    const homePageEntry = (await bcmsPrivate.entry.getBySlug(
        'home',
        'home-page',
    )) as HomePageEntry;

    if (!homePageEntry) {
        return notFound();
    }

    const homePageMeta = homePageEntry.meta.en as HomePageEntryMetaItem;
    const pageTitle = `${homePageMeta.seo?.title || homePageMeta.title} - Cravenest`;

    return {
        title: pageTitle,
        openGraph: {
            title: pageTitle,
        },
        twitter: {
            title: pageTitle,
        },
    };
}

const HomePage: React.FC = async () => {
    const homePageEntry = (await bcmsPrivate.entry.getBySlug(
        'home',
        'home-page',
    )) as HomePageEntry;

    if (!homePageEntry) {
        return notFound();
    }

    const homePageMeta = homePageEntry.meta.en as HomePageEntryMetaItem;

    const foodItems = (await bcmsPrivate.entry.getAll(
        'food-item',
    )) as FoodItemEntry[];

    return (
        <div>
            {/* 1. Hero Section */}
            <HomeHero
                title={homePageMeta.hero_title}
                open_time={homePageMeta.hero_open_time}
                address={homePageMeta.hero_address}
                map={homePageMeta.hero_map_image}
                description={homePageMeta.description}
                bcmsConfig={bcmsPublic.getConfig()}
            />

            {/* 2. Brand Services */}
            <HomeServices />

            {/* 3. Menus Categories (Vanilla background) */}
            <HomeMenu
                title={homePageMeta.menu_title}
                description={homePageMeta.menu_description}
                meals={homePageMeta.menu_meals}
                bcmsConfig={bcmsPublic.getConfig()}
            />

            {/* 4. Customer Favourites Delicacies (Mocca/Espresso background) */}
            <HomeSeasons
                title={homePageMeta.seasons_title}
                description={homePageMeta.seasons_description}
                seasons={homePageMeta.seasons}
                bcmsConfig={bcmsPublic.getConfig()}
            />

            {/* 5. Ambience Architectural Spread (Almond background) */}
            <HomeAmbience
                title={homePageMeta.ambience_title}
                description={homePageMeta.ambience_description}
                items={homePageMeta.ambience_items}
                bcmsConfig={bcmsPublic.getConfig()}
            />

            {/* 6. Specials & Hampers Packages (Coffee background) */}
            <HomeSpecials
                title={homePageMeta.specials_title}
                description={homePageMeta.specials_description}
                items={foodItems.map((e) => e.meta.en as FoodItemEntryMetaItem)}
                bcmsConfig={bcmsPublic.getConfig()}
            />

            {/* 7. Home Testimonials (Vanilla Background - Swapped order to render before Promo) */}
            <HomeTestimonials
                title={homePageMeta.testimonials_title}
                description={homePageMeta.testimonials_description}
                testimonials={homePageMeta.testimonials}
                bcmsConfig={bcmsPublic.getConfig()}
            />

            {/* 8. Sizzling Food Promo Section (Formerly Events - Placed as final showcase) */}
            <HomeEvents
                title={homePageMeta.events_title}
                description={homePageMeta.events_description}
                events={homePageMeta.events}
                bcmsConfig={bcmsPublic.getConfig()}
            />
        </div>
    );
};

export default HomePage;

