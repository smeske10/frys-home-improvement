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
        phone: string; googleReviewsUrl?: string;
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
    theme: { primary: '#2f6838c9', primaryHover: '#2f6838c9', dark: '#020617', darkAccent: '#0f172a' },
    services: [
        { id: 'kitchen-remodeling', title: 'Kitchen Remodeling', icon: Sparkles, desc: 'From cabinet replacement and countertop installation to full kitchen gut renovations — we design and build kitchens that combine beauty, function, and lasting quality.', image: 'https://ik.imagekit.io/i6kon7cps/Contractors/Frys/After%20Kitchen.jpg' },
        { id: 'bathroom-remodeling', title: 'Bathroom Remodeling', icon: Droplets, desc: 'Update your bathroom with a new vanity, tile, shower, or full renovation. We handle every detail from plumbing rough-in to the final coat of paint.', image: 'https://ik.imagekit.io/i6kon7cps/Contractors/Frys/bathroom.jpg' },
        { id: 'room-additions', title: 'Room Additions', icon: Home, desc: 'Need more space? We design and build seamless room additions that match your existing home\'s style and structure — from sunrooms and master suites to garages.', image: 'https://ik.imagekit.io/i6kon7cps/Contractors/Frys/homeadditions.jpg' },
        { id: 'deck-building', title: 'Deck Building', icon: Sun, desc: 'Expand your living space outdoors with a custom-built deck. We work with pressure-treated lumber, composite, and hardwood decking to build decks that last.', image: 'https://ik.imagekit.io/i6kon7cps/Contractors/Frys/deck%20building.jpeg' },
        { id: 'interior-renovations', title: 'Interior Renovations', icon: Layers, desc: 'Flooring, trim, drywall, painting, and more. We handle all aspects of interior renovation to refresh, modernize, or completely transform any room in your home.', image: 'https://ik.imagekit.io/i6kon7cps/Contractors/Frys/interior%20reno.jpeg' },
        { id: 'custom-carpentry', title: 'Custom Carpentry', icon: Hammer, desc: 'Built-ins, shelving, wainscoting, crown molding, and custom woodwork crafted to fit your space perfectly and elevate the character of your home.', image: 'https://ik.imagekit.io/i6kon7cps/Contractors/Frys/custom%20carpentry.jpg' },
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
            { quote: 'Fry\'s did a complete kitchen remodel for us and the results are stunning. Excellent craftsmanship, great communication, and finished on time. Couldn\'t be happier!', name: 'Karen M.', location: 'Pennsylvania', rating: 5 },
            { quote: 'Had them build a deck and do some interior work. Both came out beautifully. Very professional team that clearly takes pride in their work.', name: 'Jim & Sue H.', location: 'Pennsylvania', rating: 5 },
            { quote: 'Bathroom remodel came out exactly as we envisioned. Fair pricing, clean crew, and the quality of the tile and trim work is exceptional.', name: 'Rachel B.', location: 'Pennsylvania', rating: 5 },
        ],
        stats: [
            { value: '5.0★', label: 'Google Rating' },
            { value: '9', label: 'Reviews' },
            { value: '10+', label: 'Years Experience' },
            { value: 'All PA', label: 'Service Area' },
        ],
    },
    contact: {
        phone: '570-419-7032',
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
    financing: {
        startingPrice: '$499',
        pricePeriod: '/mo',
        benefits: [
            'Flexible Payment Plans',
            'No Hidden Fees',
        ],
        headline: 'Your home improvement project is more affordable than you think.',
        subheadline: 'We offer flexible financing and payment plans for residential projects. Get started with a free estimate — no obligation.',
    },
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
        before: 'https://ik.imagekit.io/i6kon7cps/Contractors/Frys/After%20Kitchen.jpg',
        after: 'https://ik.imagekit.io/i6kon7cps/Contractors/Frys/Before%20Kitchen.jpg',
        altBefore: 'Kitchen before renovation — dated cabinets and worn countertops',
        altAfter: 'Kitchen after Fry\'s remodel — modern, bright, and stunning',
    },
    serviceOptions: ['Kitchen Remodeling', 'Bathroom Remodeling', 'Room Addition', 'Deck Building', 'Interior Renovations', 'Custom Carpentry', 'Other'],
    galleries: [
        {
            id: 'kitchen-remodel',
            title: 'Kitchen Remodel',
            category: 'Kitchen Remodel',
            location: 'Danville, PA',
            coverImage: 'https://ik.imagekit.io/i6kon7cps/Contractors/Frys/kitchen-remodel.jpg',
            description: 'Our most recent full kitchen remodel showcases the beauty of natural stained wood cabinets accented with thoughtful contrasts, colors and designs that completely transformed this kitchen and dining space!',
            images: [
                { url: 'https://ik.imagekit.io/i6kon7cps/Contractors/Frys/kitchen-1.jpg', alt: 'Kitchen with natural stained wood cabinets and white countertops', caption: 'Totally remodeled kitchen with natural stained wood cabinets and white countertops' },
                { url: 'https://ik.imagekit.io/i6kon7cps/Contractors/Frys/kitchen-2.jpg', alt: 'Stunning integrated range and fume hood', caption: 'Stunning integrated range and fume hood' },
                { url: 'https://ik.imagekit.io/i6kon7cps/Contractors/Frys/kitchen-3.jpg', alt: 'Beautiful backsplash', caption: 'Hand crafted backsplash' },
            ],
            completedYear: 2025,
            projectSize: '500 sq ft',
        }
    ],
};

export default config;
