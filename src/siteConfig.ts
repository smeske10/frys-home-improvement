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
        socialLinks: { instagram?: string; facebook?: string; houzz?: string; youtube?: string };
    };
    theme: { primary: string; primaryHover: string; dark: string; darkAccent: string };
    services: Array<{ id: string; title: string; icon: LucideIcon; desc: string; image: string }>;
    lifestylePillars: Array<{ title: string; desc: string; icon: LucideIcon }>;
    processSteps: Array<{ title: string; desc: string; icon: LucideIcon }>;
    testimonials: {
        reviewCount: string; averageRating: string;
        reviews: Array<{ quote: string; name: string; location: string; rating: number }>;
        stats: Array<{ value: string; label: string }>;
    };
    contact: {
        phone: string; googleReviewsUrl?: string; googlePlaceId?: string; highlevelWebhookUrl?: string;
        locations: Array<{ state: string; city: string; address: string; phone: string }>;
        serviceAreaDescription: string; serviceAreaHeadline: string;
    };
    partners: string[];
    trustBadges: Array<{ icon: LucideIcon; label: string }>;
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
        nameLine1: 'Fry\'s Home',
        nameLine2: 'Improvement',
        pageTitle: 'Fry\'s Home Improvement | Kitchen & Home Remodeling | Pennsylvania',
        metaDescription: 'Expert kitchen remodeling, bathroom renovations, and home improvement in Pennsylvania. 5★ rated with 9 Google reviews. Free estimates.',
        tagline: 'Your Home, ',
        taglineAccent: 'Reimagined.',
        heroSubheadline:
            'Trusted home improvement and kitchen remodeling specialists serving Pennsylvania. With 9 five-star reviews and a reputation for quality craftsmanship, we transform houses into dream homes.',
        heroBadgeText: '5★ Rated · 9 Google Reviews',
        heroBackgroundImage:
            'https://images.unsplash.com/photo-1556909211-6c024b7e2b04?auto=format&fit=crop&w=1920&q=80',
        foundedYear: 2015,
        description:
            'Fry\'s Home Improvement is a trusted home remodeling contractor serving Pennsylvania. We specialize in kitchen remodeling, bathroom renovations, additions, and full interior and exterior improvements — delivered with quality craftsmanship and personal service.',
        logoUrl: 'https://ik.imagekit.io/i6kon7cps/Contractors/Frys/Frys.png',
        socialLinks: { facebook: 'https://www.facebook.com/profile.php?id=100088428143218' },
    },
    theme: { primary: '#00b91f9f', primaryHover: '#1f7e2dc9', dark: '#020617', darkAccent: '#0f172a' },
    services: [
        { id: 'kitchen-remodeling', title: 'Kitchen Remodeling', icon: Sparkles, desc: 'From cabinet replacement and countertop installation to full kitchen gut renovations. We design and build kitchens that combine beauty, function, and lasting quality.', image: 'https://ik.imagekit.io/i6kon7cps/Contractors/Frys/Frys/kitchen%20after.jpg?updatedAt=1774828024549' },
        { id: 'bathroom-remodeling', title: 'Bathroom Remodeling', icon: Droplets, desc: 'Update your bathroom with a new vanity, tile, shower, or full renovation. We handle every detail from plumbing rough-in to the final coat of paint.', image: 'https://ik.imagekit.io/i6kon7cps/Contractors/Frys/Frys/bathroom%20after%202.jpg?updatedAt=1774828024564' },
        { id: 'siding-exterior', title: 'Siding & Exterior', icon: Home, desc: 'Protect and beautify your home with new siding and exterior updates. We install high-quality vinyl, fiber cement, and wood siding. Plus exterior trim, soffit, fascia, and gutter systems to enhance curb appeal and weather resistance.', image: 'https://ik.imagekit.io/i6kon7cps/Contractors/Frys/Frys/siding%20after.jpg?updatedAt=1774828024371' },
        { id: 'interior-renovations', title: 'Interior Renovations', icon: Layers, desc: 'Flooring, trim, drywall, painting, and more. We handle all aspects of interior renovation to refresh, modernize, or completely transform any room in your home.', image: 'https://ik.imagekit.io/i6kon7cps/Contractors/Frys/Frys/attic%20after%201.jpg?updatedAt=1774828024566' },
    ],
    lifestylePillars: [
        { title: '5★ Rated', desc: '9 five-star Google reviews from Pennsylvania homeowners who love their results.', icon: Award },
        { title: 'Quality Craftsmanship', desc: 'Every detail matters. We take pride in finish work that stands the test of time and daily use.', icon: Sparkles },
        { title: 'Transparent Pricing', desc: 'Clear, detailed estimates with no hidden costs or surprise add-ons. You know exactly what you\'re getting.', icon: ShieldCheck },
        { title: 'On-Time & On-Budget', desc: 'We respect your time and your home. Projects are completed on schedule and within the agreed budget.', icon: Clock },
    ],
    processSteps: [
        { title: 'Free Consultation', desc: 'We meet at your home, discuss your vision, and assess what\'s possible within your space and budget.', icon: Users },
        { title: 'Design & Planning', desc: 'We develop a clear scope of work, material selections, and a project timeline — all documented before we break ground.', icon: CheckCircle2 },
        { title: 'Expert Construction', desc: 'Our skilled tradespeople execute the project with precision, keeping your home clean and livable throughout.', icon: Hammer },
        { title: 'Final Reveal', desc: 'We walk through the finished project with you, address any touch-ups, and ensure you\'re 100% satisfied.', icon: Sparkles },
    ],
    testimonials: {
        reviewCount: '9',
        averageRating: '5.0',
        reviews: [
            { quote: 'Fry’s Home Improvement did an excellent job remodeling a bedroom in our home. From start to finish, Jonathan was professional, responsive, and incredibly helpful throughout the process. The final result exceeded our expectations—it turned out perfect. We’re very happy with the work and would highly recommend them!', name: 'Carl Galantino', location: 'Pennsylvania', rating: 5 },
            { quote: 'Jonathan was wonderful to work with!! First, he listened to what my vision was for the renovation. We discussed materials, colors and cost. The turnaround with a quote with all the details was done timely and professionally!!', name: 'Debra Stiber', location: 'Pennsylvania', rating: 5 },
            { quote: 'We recently worked with Fry’s Home Improvement to reinstall our veterinary exam room tables after discovering they had been improperly mounted and were beginning to pull out of the wall. From start to finish, the team at Fry’s was exceptional.', name: 'Mckenzie O', location: 'Pennsylvania', rating: 5 },
        ],
        stats: [
            { value: '5.0★', label: 'Google Rating' },
            { value: '9', label: 'Reviews' },
            { value: '10+', label: 'Years Experience' },
            { value: 'PA178656', label: 'Licensed & Insured' },
        ],
    },
    contact: {
        phone: '570-419-7032',
        highlevelWebhookUrl: 'https://services.leadconnectorhq.com/hooks/2elBgdn2sRdrfHAEc3P5/webhook-trigger/b6765e59-7ebb-429e-b088-418e3ec9610c',
        googleReviewsUrl: 'https://www.google.com/search?q=frys+home+improvement&rlz=1C1ONGR_enUS979US980&oq=frys+home+improvement&gs_lcrp=EgZjaHJvbWUyBggAEEUYOTIJCAEQABgNGIAEMggIAhAAGBYYHjIHCAMQABjvBTIHCAQQABjvBTIGCAUQRRg8MgYIBhBFGDwyBggHEEUYPNIBCDQwMTVqMGoxqAIAsAIA&sourceid=chrome&ie=UTF-8#lrd=0xaa80f8a17084cd8d:0x4273dee71d78ebd3,1,,,,',
        locations: [{ state: 'Pennsylvania', city: 'Pennsylvania', address: 'Pennsylvania', phone: '570-419-7032' }],
        serviceAreaDescription: 'Serving homeowners across Pennsylvania. Contact us to confirm service to your area.',
        serviceAreaHeadline: 'Pennsylvania\'s trusted home improvement specialists',
    },
    partners: ['Sherwin-Williams', 'Moen', 'Kohler', 'Armstrong Flooring', 'Andersen Windows', 'AZEK Decking'],
    trustBadges: [
        { icon: Award, label: '5★ on Google' },
        { icon: ShieldCheck, label: 'Licensed & Insured' },
        { icon: Clock, label: '10+ Years Experience' },
    ],
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
        lifestyleLabel: 'Why Choose Fry\'s', lifestyleTitle: 'Craftsmanship that transforms homes',
        servicesLabel: 'Our Services', servicesTitle: 'Complete home improvement, inside and out',
        servicesSubtitle: 'From a kitchen overhaul to a custom deck, we bring the skills, materials, and vision to turn your home improvement dreams into reality.',
        processLabel: 'How We Work', processTitle: 'A smooth process from vision to reality',
        testimonialsLabel: 'Client Reviews', testimonialsTitle: 'Dream homes, delighted homeowners',
        testimonialsSubtitle: 'See what Pennsylvania homeowners are saying after their remodel with Fry\'s.',
        partnersLabel: 'Brands We Trust',
    },
    beforeAfterImages: {
        before: 'https://ik.imagekit.io/i6kon7cps/Contractors/Frys/Frys/kitchen%20after.jpg',
        after: 'https://ik.imagekit.io/i6kon7cps/Contractors/Frys/Frys/kitchen%20before.jpg',
        altBefore: 'Kitchen before renovation — dated cabinets and worn countertops',
        altAfter: 'Kitchen after Fry\'s remodel — modern, bright, and stunning',
    },
    serviceOptions: ['Kitchen Remodeling', 'Bathroom Remodeling', 'Room Addition', 'Interior Renovations', 'Siding & Exterior', 'Other'],
    about: {
        pageTitle: "About Fry's Home Improvement | Williamsport, PA Home Remodeling Contractor",
        metaDescription: "Fry's Home Improvement offers kitchen remodeling, bathroom renovations, and exterior home improvement services in Williamsport, PA. Contact us for a free estimate.",
        headline: "About Fry's Home Improvement",
        intro: "At Fry's Home Improvement, we believe your home is one of the most important investments you'll ever make. It's more than just a place to live—it's where your family gathers, where your lifestyle takes shape, and where long-term value is built.\n\nAs a trusted home improvement contractor in Williamsport, PA and the greater Lycoming County area, we are committed to delivering high-quality craftsmanship, reliable service, and results that enhance both the beauty and functionality of your home.\n\nWith deep local roots, we understand the needs of homeowners in our community. Every project we take on—whether it's a full renovation or a small upgrade—is approached with attention to detail, clear communication, and a focus on long-lasting results.",
        serviceHighlights: [
            { title: 'Kitchen Remodeling', desc: "We design and build custom kitchen renovations that combine style, efficiency, and durability. Whether you're updating finishes or completing a full remodel, we create kitchens that are both functional and visually stunning." },
            { title: 'Bathroom Remodeling', desc: "Our bathroom remodeling services transform outdated spaces into clean, modern, and comfortable environments. From walk-in showers to full bathroom renovations, we focus on quality materials and thoughtful design." },
            { title: 'Exterior & Outdoor Renovations', desc: "Boost your home's curb appeal and protection with our exterior home improvement services, including siding, windows, doors, and outdoor living upgrades. We help homeowners improve energy efficiency while creating spaces they're proud of." },
            { title: 'General Home Improvements & Small Projects', desc: "Not every project needs to be large to make an impact. We handle small home improvement projects, repairs, and upgrades that improve your home's comfort, convenience, and value." },
        ],
        whyUs: [
            'Local, family-rooted business in Lycoming County, PA',
            'Experienced in kitchen, bathroom, and exterior remodeling',
            'Focused on quality craftsmanship and long-term durability',
            'Personalized service with clear communication',
            'Projects completed with care, precision, and attention to detail',
        ],
        commitment: "At Fry's Home Improvement, our work reflects our values. We take pride in helping homeowners across Williamsport and surrounding areas bring their vision to life—whether it's a modern kitchen, a fully renovated bathroom, or a simple upgrade that makes everyday life better.",
        ctaHeading: 'Start Your Home Improvement Project Today',
        ctaBody: "From full renovations to small upgrades, Fry's Home Improvement is here to help. Contact us today to schedule a consultation and bring your vision to life.",
    },
    tracking: {
        gtmId: 'GTM-XXXXXXX', // Replace with your GTM container ID
        ghlTrackingScriptUrl: '', // Add your HighLevel external tracking script URL here
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
};

export default config;
