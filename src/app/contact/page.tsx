import 'swiper/css';
import {
    ContactPageEntry,
    ContactPageEntryMetaItem,
} from '@bcms-types/types/ts';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import ArchWithStar from '@/components/ArchWithStar';
import ContentManager from '@/components/ContentManager';
import { BCMSImage } from '@thebcms/components-react';
import Btn from '@/components/Btn';
import { bcmsPrivate } from '@/bcms-private';
import { bcmsPublic } from '@/bcms-public';

export async function generateMetadata(): Promise<Metadata> {
    const contactPageEntry = (await bcmsPrivate.entry.getBySlug(
        'contact',
        'contact-page',
    )) as ContactPageEntry;

    if (!contactPageEntry) {
        return notFound();
    }

    const contactPageMeta = contactPageEntry.meta
        .en as ContactPageEntryMetaItem;
    const pageTitle = `${contactPageMeta.seo?.title || contactPageMeta.title} - Cravenest`;

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

type BCMSNode = ContactPageEntryMetaItem['description']['nodes'][number];

const ContactPage: React.FC = async () => {
    const contactPageEntry = (await bcmsPrivate.entry.getBySlug(
        'contact',
        'contact-page',
    )) as ContactPageEntry;

    if (!contactPageEntry) {
        return notFound();
    }

    const contactPageMeta = contactPageEntry.meta
        .en as ContactPageEntryMetaItem;

    // Recursive node processor to seamlessly replace placeholders while preserving formatting, size, and style
    const replaceTextInNodes = (nodes: BCMSNode[]): BCMSNode[] => {
        if (!nodes) return [];
        return nodes.map((node) => {
            const newNode = { ...node } as BCMSNode;
            if (newNode && 'value' in newNode && typeof newNode.value === 'string') {
                let val = newNode.value;
                // Replace original address
                val = val.replace(/California\s*166166,\s*quai\s*de\s*Stalingrad\s*,?\s*92130\s*Issy-Les-Moulineaux/gi, 'Plot 14, Block III, Wole Ariyo Street, Lekki Phase 1, Lagos State, Nigeria');
                val = val.replace(/California\s*166166,\s*quai\s*de\s*Stalingrad\s*92130\s*Issy-Les-Moulineaux/gi, 'Plot 14, Block III, Wole Ariyo Street, Lekki Phase 1, Lagos State, Nigeria');
                // Replace emails
                val = val.replace(/tastyyy@mail\.com/gi, 'cravenestmail.com');
                val = val.replace(/tastyymail\.com/gi, 'cravenestmail.com');
                // Rebrand "tastyyy"
                val = val.replace(/tastyyy/gi, 'Cravenest');
                (newNode as { value?: string }).value = val;
            }
            if (newNode && 'nodes' in newNode && newNode.nodes && Array.isArray(newNode.nodes)) {
                (newNode as { nodes?: BCMSNode[] }).nodes = replaceTextInNodes(newNode.nodes as BCMSNode[]);
            }
            return newNode;
        });
    };

    const processedDescriptionNodes = replaceTextInNodes(contactPageMeta.description.nodes as BCMSNode[]);

    return (
        <div>
            {/* Inject a persistent style layer to ensure full-bleed vanilla alignment before the footer */}
            <style dangerouslySetInnerHTML={{__html: `
                body, html, main, #__next, .app-layout-wrapper {
                    background-color: #D7BDA6 !important;
                }
            `}} />

            <section className="pt-[108px] pb-10 overflow-hidden md:pb-20 lg:pt-[218px] lg:pb-[120px] bg-[#D7BDA6]">
                <div className="container max-w-[1198px]">
                    <ArchWithStar />
                    <div className="relative px-4 max-w-[400px] mx-auto lg:max-w-[560px] xl:px-0">
                        {/* Title: Unmodified text sizes, fonts, and colors */}
                        <h1 className="text-xl leading-none font-Gloock uppercase text-center mb-8 lg:text-5xl lg:leading-none lg:mb-20">
                            {contactPageMeta.title}
                        </h1>
                        <ContentManager
                            items={processedDescriptionNodes}
                            className="text-sm leading-[1.3] tracking-[-0.41px] uppercase text-center text-appGray-700 mb-8 lg:text-base lg:leading-[1.3] lg:mb-12"
                        />
                        <div className="bg-[#E5E4DA] rounded-2xl p-4 mb-8 lg:mb-10">
                            <BCMSImage
                                media={contactPageMeta.map_image}
                                clientConfig={bcmsPublic.getConfig()}
                                className="w-full h-auto cover rounded-[10px] overflow-hidden pointer-events-auto"
                            />
                        </div>
                        <Btn
                            to="https://www.google.com/maps"
                            className="uppercase max-w-max mx-auto"
                        >
                            <span>Open maps</span>
                        </Btn>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default ContactPage;
