import { LucideIcon } from 'lucide-react';
import {
    ShieldCheck, Clock, Award, Hammer, Sun, Layers,
    Users, CheckCircle2, Sparkles, Home, Droplets
} from 'lucide-react';

export interface ProjectGallery {
    id: string; title: string; category: string; location: string;
    coverImage: string; description: string;
    images: Array<{ url: string; alt: string; caption?: string }>;
    completedYear?: number; projectSize?: string;
}

export interface SiteConfig {
    business: {
        nameLine1: string; nameLine2: string; pageTitle: string;
        metaDescription: string; tagline: string; taglineAccent: string;
        heroSubheadline: string; heroBadgeText: string;
        heroBackgroundImage: string; foundedYear: number;
        description: string; logoUrl?: string;
        ogImageUrl?: string; siteUrl?: string;
        socialLinks: { instagram?: string; facebook?: string; houzz?: string; youtube?: string };
    };
    theme: { primary: string; primaryHover: string; dark: string; darkAccent: string };
    services: Array<{
        id: string;
        title: string;
        icon: LucideIcon;
        desc: string;
        image: string;
        seoHeading?: string;
        longDescription?: string;
        features?: string[];
    }>;
    lifestylePillars: Array<{ title: string; desc: string; icon: LucideIcon }>;
    processSteps: Array<{ title: string; desc: string; icon: LucideIcon }>;
    testimonials: {
        reviewCount: string; averageRating: string;
        reviews: Array<{ quote: string; name: string; location: string; rating: number }>;
        stats: Array<{ value: string; label: string }>;
    };
    contact: {
        phone: string; email?: string; googleReviewsUrl?: string; googlePlaceId?: string; highlevelWebhookUrl?: string;
        locations: Array<{ city: string; address: string; phone: string }>;
        serviceAreaDescription: string; serviceAreaHeadline: string;
    };
    partners: string[];
    trustBadges: Array<{ icon: LucideIcon; label: string }>;
    title?: [string, string];
    financing?: { startingPrice: string; pricePeriod: string; benefits: string[]; headline: string; subheadline: string };
    sectionHeaders: {
        lifestyleLabel: string; lifestyleTitle: string; servicesLabel: string;
        servicesTitle: string; servicesSubtitle: string; processLabel: string;
        processTitle: string; testimonialsLabel: string; testimonialsTitle: string;
        testimonialsSubtitle: string; partnersLabel: string;
    };
    beforeAfterImages: { before: string; after: string; altBefore: string; altAfter: string };
    serviceOptions: string[];
    galleries?: ProjectGallery[];
    about?: {
        pageTitle: string;
        metaDescription: string;
        headline: string;
        intro: string;
        serviceHighlights: Array<{ title: string; desc: string }>;
        whyUs: string[];
        commitment: string;
        ctaHeading: string;
        ctaBody: string;
    };
    tracking?: {
        gtmId?: string;
        ghlTrackingScriptUrl?: string;
    };
}

const config: SiteConfig = {
    business: {
        nameLine1: "Fry's Home",
        nameLine2: "Improvement",
        pageTitle: "Fry's Home Improvement | Kitchen & Home Remodeling | Williamsport, PA",
        metaDescription:
            "Kitchen remodeling, bathroom renovations, and home improvement in Williamsport, PA and surrounding areas. Contact for an estimate.",
        tagline: "Your Home, ",
        taglineAccent: "Reimagined.",
        heroSubheadline:
            "Home remodeling and improvements in Lycoming County. Kitchens, bathrooms, interior and exterior projects done with attention to detail and clear communication.",
        heroBadgeText: "5★ Rated · 9 Google Reviews",
        heroBackgroundImage:
            "https://ik.imagekit.io/i6kon7cps/Contractors/Frys/Frys/kitchen%20after%202.jpg?updatedAt=1774828024316",
        foundedYear: 2015,
        description:
            "Fry’s Home Improvement is a trusted home remodeling contractor serving Williamsport, PA. We handle kitchen remodeling, bathroom renovations, and full interior and exterior improvements — delivered with quality craftsmanship and personal service.",
        logoUrl:
            "https://ik.imagekit.io/i6kon7cps/Contractors/Frys/Frys.png",
        ogImageUrl:
            "https://ik.imagekit.io/i6kon7cps/Contractors/Frys/Frys.png",
        siteUrl: "https://www.fryshomeimprovement.com",
        socialLinks: {
            facebook:
                "https://www.facebook.com/profile.php?id=100088428143218",
        },
    },

    theme: {
        primary: "#00b91f9f",
        primaryHover: "#1f7e2dc9",
        dark: "#020617",
        darkAccent: "#0f172a",
    },

    services: [
        {
            id: "kitchen-remodeling",
            title: "Kitchen Remodeling",
            icon: Sparkles,
            desc:
                "Full kitchen remodels including cabinets, countertops, flooring, and layout changes.",
            image:
                "https://ik.imagekit.io/i6kon7cps/Contractors/Frys/Frys/kitchen%20after.jpg?updatedAt=1774828024549",
            seoHeading: "Kitchen Remodeling in Williamsport, PA",
            longDescription:
                "We handle kitchen remodels from start to finish — demo, cabinetry, countertops, flooring, lighting, and final details. Whether you're updating finishes or changing the layout, we focus on building a space that works for how you actually use it. \n\nWe work closely with homeowners across Lycoming County and Central Pennsylvania to design kitchens that are both beautiful and highly functional. Whether you want to open up a closed-off floor plan, upgrade to custom cabinetry, or install new tile and hardwood flooring, our team brings the skills and attention to detail needed to do it right.",
            features: [
                "Cabinet installation and replacement",
                "Countertops (quartz, granite, laminate)",
                "Flooring and tile backsplash",
                "Lighting and electrical updates",
                "Layout changes and full remodels",
                "Appliance install and finish work",
            ],
        },
        {
            id: "bathroom-remodeling",
            title: "Bathroom Remodeling",
            icon: Droplets,
            desc:
                "Bathroom updates and full remodels including tile, showers, vanities, and fixtures.",
            image:
                "https://ik.imagekit.io/i6kon7cps/Contractors/Frys/Frys/bathroom%20after%202.jpg?updatedAt=1774828024564",
            seoHeading: "Bathroom Remodeling in Lycoming County and Williamsport, PA",
            longDescription:
                "Bathroom projects range from simple updates to full remodels. Our bathroom remodeling services cover everything from simple vanity upgrades to complete gut renovations — including custom tile showers, soaking tubs, new flooring, vanities, mirrors, and lighting. \n\nWe serve homeowners across Williamsport and Lycoming County with professional bathroom renovation services that prioritize quality materials, clean finishes, and lasting durability.",
            features: [
                'Walk-in shower design and installation',
                'Tub-to-shower conversions',
                'Tile work (floor, walls, shower surround)',
                'Vanity, sink, and faucet installation',
                'Lighting and ventilation upgrades',
                'Full bathroom remodels',
            ],
        },
        {
            id: "siding-exterior",
            title: "Siding & Exterior",
            icon: Home,
            desc:
                "Siding replacement and exterior work to protect and update your home.",
            image:
                "https://ik.imagekit.io/i6kon7cps/Contractors/Frys/Frys/siding%20after.jpg?updatedAt=1774828024371",
            seoHeading: "Siding & Exterior Work in Lycoming County and Williamsport, PA",
            longDescription:
                "Your home's exterior is the first thing people see — and your first line of defense against the elements. We handle siding replacement, trim, and exterior updates that improve durability and appearance. Work is done with materials that hold up to the local climate and everyday use.\n\nWe serve homeowners across Williamsport and Lycoming County with professional exterior renovation services that prioritize quality materials, clean finishes, and lasting durability.",
            features: [
                "Vinyl and fiber cement siding",
                "Trim, soffit, and fascia",
                "Gutter intallation and replacement",
                "Entry and porch updates",
                'Window and door replacement',
                "Exterior repairs and upgrades",
            ],
        },
        {
            id: "interior-renovations",
            title: "Interior Renovations",
            icon: Layers,
            desc:
                "Flooring, drywall, trim, and material updates to refresh or transform any room in your home.",
            image:
                "https://ik.imagekit.io/i6kon7cps/Contractors/Frys/Frys/attic%20after%201.jpg?updatedAt=1774828024566",
            seoHeading: "Interior Renovations in Lycoming County and Williamsport, PA",
            longDescription:
                "From flooring and drywall to paint and trim, our interior renovation services refresh and modernize any room in your home.We take on interior projects of all sizes — from small updates to full room renovations. Work includes flooring, drywall, trim, and general improvements that clean up and modernize a space. \n\nWe serve homeowners across Williamsport and Lycoming County with professional interior renovation services that prioritize quality materials, clean finishes, and lasting durability.",
            features: [
                "Hardwood, LVP, and tile flooring",
                "Drywall install and finishing",
                "Trim and interior carpentry",
                "Painting and finishing work",
                "Basement and attic updates",
                "General repairs and upgrades",
            ],
        },
    ],

    lifestylePillars: [
        {
            title: "Local",
            desc:
                "Based in Lycoming County and working in surrounding areas.",
            icon: Award,
        },
        {
            title: "Quality Craftsmanship",
            desc:
                "Every detail matters. We take pride in work that stands the test of time.",
            icon: Sparkles,
        },
        {
            title: "Clear Estimates",
            desc:
                "Scope and pricing are outlined up front. Any changes are discussed and approved before moving forward.",
            icon: ShieldCheck,
        },
        {
            title: "Seamless Process",
            desc:
                "You’ll know what’s happening and what to expect as the project moves forward.",
            icon: Clock,
        },
    ],

    processSteps: [
        {
            title: "Walkthrough",
            desc:
                "We meet at your home, discuss your vision, and discuss what's possible.",
            icon: Users,
        },
        {
            title: "Estimate",
            desc:
                "You’ll get a detailed estimate with scope, materials, and any allowances clearly outlined.",
            icon: CheckCircle2,
        },
        {
            title: "Build",
            desc:
                "Work is completed in phases depending on the project, with regular communication along the way.",
            icon: Hammer,
        },
        {
            title: "Final Reveal",
            desc:
                "We walk through the finished space with you to make sure everything is done right and meets your expectations.",
            icon: Sparkles,
        },
    ],

    testimonials: {
        reviewCount: "9",
        averageRating: "5.0",
        reviews: [
            { quote: 'Fry’s Home Improvement did an excellent job remodeling a bedroom in our home. From start to finish, Jonathan was professional, responsive, and incredibly helpful throughout the process. The final result exceeded our expectations—it turned out perfect. We’re very happy with the work and would highly recommend them!', name: 'Carl Galantino', location: 'Pennsylvania', rating: 5 },
            { quote: 'Jonathan was wonderful to work with!! First, he listened to what my vision was for the renovation. We discussed materials, colors and cost. The turnaround with a quote with all the details was done timely and professionally!!', name: 'Debra Stiber', location: 'Pennsylvania', rating: 5 },
            { quote: 'We recently worked with Fry’s Home Improvement to reinstall our veterinary exam room tables after discovering they had been improperly mounted and were beginning to pull out of the wall. From start to finish, the team at Fry’s was exceptional.', name: 'Mckenzie O', location: 'Pennsylvania', rating: 5 },
        ],
        stats: [
            { value: "5.0★", label: "Google Rating" },
            { value: "9", label: "Reviews" },
            { value: "Lycoming County", label: "Service Area" },
        ],
    },

    contact: {
        phone: "570-419-7032",
        email: "fryshomeimprovement@gmail.com",
        highlevelWebhookUrl:
            "https://services.leadconnectorhq.com/hooks/2elBgdn2sRdrfHAEc3P5/webhook-trigger/b6765e59-7ebb-429e-b088-418e3ec9610c",
        googleReviewsUrl:
            "https://www.google.com/search?q=frys+home+improvement",
        locations: [
            {
                city: "Williamsport",
                address: "Williamsport, PA",
                phone: "570-419-7032",
            },
        ],
        serviceAreaDescription:
            "Serving Williamsport and surrounding areas. Reach out to confirm your location.",
        serviceAreaHeadline:
            "Home improvement in Lycoming County, PA",
    },

    partners: [],

    trustBadges: [
        { icon: Award, label: "Trusted Local Contractor" },
        { icon: Sparkles, label: "Quality Craftsmanship" },
    ],

    title: ["Registered Contractor", "PA178656"],

    // financing: {
    //     startingPrice: '$499',
    //     pricePeriod: '/mo',
    //     benefits: [
    //         'Flexible Payment Plans',
    //         'No Hidden Fees',
    //     ],
    //     headline: 'Your home improvement project is more affordable than you think.',
    //     subheadline: 'We offer flexible financing and payment plans for residential projects. Get started with a free estimate — no obligation.',
    // },

    sectionHeaders: {
        lifestyleLabel: "Why Work With Us",
        lifestyleTitle: "Solid work. Clear communication.",
        servicesLabel: "Services",
        servicesTitle: "What we do",
        servicesSubtitle:
            "From kitchens, bathrooms and general interior work to exterior improvements and siding, we take on projects where we can do the job right.",
        processLabel: "Process",
        processTitle: "How it works",
        testimonialsLabel: "Reviews",
        testimonialsTitle: "What customers say",
        testimonialsSubtitle:
            "Feedback from homeowners we’ve worked with locally.",
        partnersLabel: "Our Partners",
    },

    beforeAfterImages: {
        before: "https://ik.imagekit.io/i6kon7cps/Contractors/Frys/Frys/kitchen%20before.jpg",
        after: "https://ik.imagekit.io/i6kon7cps/Contractors/Frys/Frys/kitchen%20after.jpg?updatedAt=1774828024549",
        altBefore: "Kitchen before remodeling",
        altAfter: "Kitchen after remodeling by Fry's Home Improvement",
    },

    serviceOptions: [
        "Kitchen Remodeling",
        "Bathroom Remodeling",
        "Siding & Exterior",
        "Interior Work",
        "Other",
    ],

    about: {
        pageTitle: "About Fry's Home Improvement | Williamsport, PA Home Remodeling Contractor",
        metaDescription: "Fry's Home Improvement offers kitchen remodeling, bathroom renovations, and exterior home improvement services in Williamsport, PA. Contact us for a free estimate.",
        headline: "About Fry's Home Improvement",
        intro: "At Fry's Home Improvement, we know your home is more than just a place to live—it's where your family gathers, where your lifestyle takes shape, and where memories are made.\n\nAs a trusted home improvement contractor in Williamsport, PA and the greater Lycoming County area, we are committed to delivering high-quality craftsmanship, reliable service, and results that enhance the beauty and functionality of your home.\n\nWith deep local roots, we understand the needs of homeowners in our community. Every project we take on, whether it's a full renovation or a small upgrade, is done with attention to detail, clear communication, and a focus on long-lasting results.",
        serviceHighlights: [
            { title: 'Kitchen Remodeling', desc: "Full kitchen remodels including cabinets, countertops, flooring, and layout changes." },
            { title: 'Bathroom Remodeling', desc: "Bathroom updates and full remodels including tile, showers, vanities, and fixtures." },
            { title: 'Exterior & Outdoor Renovations', desc: "Exterior improvements including siding, windows, doors, and outdoor living spaces." },
            { title: 'Interior Renovations', desc: "Interior improvements including flooring, drywall, trim, and material updates to refresh or transform any room." },
        ],
        whyUs: [
            "Local to Lycoming County",
            "Focused on doing the job right",
            "Clear communication throughout the project",
            'Experienced in kitchen, bathroom, and exterior remodeling',
            'Projects completed with care, precision, and attention to detail',
        ],
        commitment: "At Fry's Home Improvement, our work reflects our values. We take pride in helping homeowners across Williamsport and surrounding areas bring their vision to life, whether it's a modern kitchen, a fully renovated bathroom, or a simple upgrade that makes everyday life better. \n\n Every project is approached with the same goal — solid work that holds up over time and a process that makes sense from start to finish.",
        ctaHeading: 'Ready to start your project?',
        ctaBody: "We’re here to help. Contact us today for a free estimate.",
    },

    galleries: [
        {
            id: 'bathroom-remodel',
            title: 'Bathroom Remodel with Walk-In Shower & Modern Vanity Installation',
            category: 'Bathroom Remodel',
            location: 'Muncy, PA',
            coverImage: 'https://ik.imagekit.io/i6kon7cps/Contractors/Frys/Frys/bathroom%20after%201.jpg?updatedAt=1774828024540',
            description: 'We transformed this outdated bathroom into a sleek, modern space with a full interior bathroom renovation. The original bathroom featured older finishes, limited space, and poor lighting. Our team installed a custom tile shower, frameless glass doors, upgraded vanity, and new flooring to create a clean, contemporary design. The result is a bright, low-maintenance bathroom built for both comfort and long-term durability. Whether you need a shower replacement, vanity upgrade, or full bathroom remodel, this project demonstrates the impact of quality materials and expert craftsmanship.',
            images: [
                { url: 'https://ik.imagekit.io/i6kon7cps/Contractors/Frys/Frys/bathroom%20before%201.jpg?updatedAt=1774828024377', alt: 'Outdated bathroom with old shower, sink, and poor lighting before renovation', caption: 'Original bathroom with outdated fixtures and limited space' },
                { url: 'https://ik.imagekit.io/i6kon7cps/Contractors/Frys/Frys/bathroom%20after%202.jpg?updatedAt=1774828024564', alt: 'Modern walk-in shower with glass doors and white tile surround after bathroom remodel', caption: 'New walk-in shower with glass doors and clean tile finish' },
                { url: 'https://ik.imagekit.io/i6kon7cps/Contractors/Frys/Frys/bathroom%20after%201.jpg?updatedAt=1774828024540', alt: 'Updated bathroom with new vanity, modern lighting, and tile flooring after renovation', caption: 'Modern vanity and lighting upgrade with bright, open layout' },
            ],
            completedYear: 2025,
            projectSize: '200 sq ft',
        },
        {
            id: 'tile-cabinets-appliances',
            title: 'Kitchen Remodel & Interior Renovation Transformation',
            category: 'Kitchen Remodel',
            location: 'Muncy, PA',
            coverImage: 'https://ik.imagekit.io/i6kon7cps/Contractors/Frys/Frys/kitchen%20after.jpg',
            description: 'We transformed this outdated kitchen into a modern, functional space with a full interior remodel. The original design featured limited lighting, older cabinetry, and worn flooring. Our team installed custom cabinetry, durable tile flooring, upgraded countertops, and energy-efficient lighting to completely refresh the space. The result is a bright, open kitchen designed for both everyday use and entertaining. Whether you are planning a kitchen upgrade, flooring replacement, or full interior renovation, this project highlights the impact of quality craftsmanship and thoughtful design.',
            images: [
                { url: 'https://ik.imagekit.io/i6kon7cps/Contractors/Frys/Frys/kitchen%20after.jpg', alt: 'Modern kitchen remodel with navy cabinets, quartz countertops, and tile flooring', caption: 'Bright, modern kitchen with custom cabinetry and upgraded finishes' },
                { url: 'https://ik.imagekit.io/i6kon7cps/Contractors/Frys/Frys/kitchen%20before%203.jpg', alt: 'Outdated interior hallway with dark wood paneling before home renovation', caption: 'Dark, outdated interior with wood paneling and limited lighting. Closed-off layout before renovation.' },
                { url: 'https://ik.imagekit.io/i6kon7cps/Contractors/Frys/Frys/kitchen%20after%203.jpg', alt: 'Open concept kitchen and living area after interior renovation with modern finishes', caption: 'Open concept living area with new flooring and recessed lighting' },
                { url: 'https://ik.imagekit.io/i6kon7cps/Contractors/Frys/Frys/kitchen%20before%202.jpg', alt: 'Old kitchen with outdated wallpaper and flooring before remodel', caption: 'Original kitchen with worn flooring and dated finishes' },
                { url: 'https://ik.imagekit.io/i6kon7cps/Contractors/Frys/Frys/kitchen%20after%202.jpg', alt: 'Adding overhead lighting and new paint freshened the space', caption: 'Clean layout with new flooring, appliances, and improved functionality' },
            ],
            completedYear: 2025,
            projectSize: '500 sq ft',
        },
        {
            id: 'siding',
            title: 'Exterior Siding Replacement & Front Porch Renovation',
            category: 'Siding & Exterior',
            location: 'Hughesville, PA',
            coverImage: 'https://ik.imagekit.io/i6kon7cps/Contractors/Frys/Frys/siding%20after.jpg',
            description: 'This project showcases a full exterior siding replacement and front porch renovation designed to dramatically improve curb appeal, durability, and long-term value.\n\nThe home originally featured outdated siding and a minimal entryway that lacked structure and visual appeal. Our team installed new high-quality siding, updated trim, and rebuilt the front porch with a covered entry, creating a more functional and inviting entrance.',
            images: [
                { url: 'https://ik.imagekit.io/i6kon7cps/Contractors/Frys/Frys/siding%20before.jpg', alt: 'Before exterior siding replacement showing outdated siding and unfinished front porch structure', caption: 'Outdated siding and an unfinished entryway before the exterior renovation' },
                { url: 'https://ik.imagekit.io/i6kon7cps/Contractors/Frys/Frys/siding%20after.jpg?updatedAt=1774828024371', alt: 'After exterior renovation with new siding installation and covered front porch improving curb appeal', caption: 'Modern siding and a newly built covered porch dramatically improve curb appeal' },
                { url: 'https://ik.imagekit.io/i6kon7cps/Contractors/Frys/siding%20before%202.jpg?updatedAt=1774829377985', alt: 'Beautiful backsplash', caption: 'Hand crafted backsplash' },
                { url: 'https://ik.imagekit.io/i6kon7cps/Contractors/Frys/siding%20after%202.jpg?updatedAt=1774829377985', alt: 'Beautiful backsplash', caption: 'Hand crafted backsplash' },
            ],
            completedYear: 2025,
            projectSize: '500 sq ft',
        }
    ],

    tracking: {
        gtmId: "GTM-XXXXXXX",
        ghlTrackingScriptUrl: "",
    },
};

export default config;
