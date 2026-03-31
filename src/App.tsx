import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useGoogleReviews, type GoogleReview } from './hooks/useGoogleReviews';
import { motion, AnimatePresence } from 'motion/react';
import {
  ArrowRight,
  Menu,
  X,
  ChevronRight,
  Star,
  MapPin,
  Phone,
  CheckCircle2,
  DollarSign
} from 'lucide-react';
import {
  SERVICES,
  PROCESS_STEPS,
  TESTIMONIALS,
  LOCATIONS,
  TRUST_BADGES,
  STATS,
  PARTNERS,
  LIFESTYLE_PILLARS
} from './constants';
import config from './siteConfig';
import ConsentBanner from './components/ConsentBanner';
import GalleryCatalog from './pages/GalleryCatalog';
import GalleryDetail from './pages/GalleryDetail';
import ServiceDetail from './pages/ServiceDetail';
import AboutUs from './pages/AboutUs';
import { SocialIcons } from './SocialIcons';

// ─── Routing ─────────────────────────────────────────────────────────

type PageState =
  | { id: 'home' }
  | { id: 'about' }
  | { id: 'gallery' }
  | { id: 'gallery-detail'; galleryId: string }
  | { id: 'service-detail'; serviceId: string };

const Navbar = ({ onGalleryClick, onAboutClick, onLogoClick, onNavLinkClick }: { onGalleryClick: () => void; onAboutClick: () => void; onLogoClick: () => void; onNavLinkClick: (section: string) => void }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      role="navigation"
      aria-label="Main navigation"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-dark/90 backdrop-blur-md border-b border-white/10 py-3' : 'bg-transparent py-6'
        }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <button onClick={onLogoClick} className="flex items-center gap-3 cursor-pointer" aria-label="Go to home page">
          {config.business.logoUrl ? (
            <img src={config.business.logoUrl} alt={`${config.business.nameLine1} ${config.business.nameLine2} logo`} className="h-15 w-auto object-contain" />
          ) : (
            <div className="flex flex-col">
              <span className="text-primary font-bold tracking-[0.2em] text-xs uppercase">{config.business.nameLine1}</span>
              <span className="text-white font-semibold text-lg tracking-tight">{config.business.nameLine2}</span>
            </div>
          )}
        </button>

        <div className="hidden md:flex items-center gap-8">
          <button
            onClick={onAboutClick}
            className="text-slate-300 hover:text-white text-sm font-medium transition-colors cursor-pointer"
          >
            About
          </button>
          {['Services', 'Process', 'Testimonials'].map((item) => (
            <button
              key={item}
              onClick={() => onNavLinkClick(item.toLowerCase())}
              className="text-slate-300 hover:text-white text-sm font-medium transition-colors cursor-pointer"
            >
              {item}
            </button>
          ))}
          <button
            onClick={onGalleryClick}
            className="text-slate-300 hover:text-white text-sm font-medium transition-colors cursor-pointer"
          >
            Gallery
          </button>
          <a href={`tel:${config.contact.phone}`} className="hidden lg:flex items-center gap-2 text-slate-300 hover:text-white text-sm font-medium transition-colors">
            <Phone className="w-4 h-4 text-primary" aria-hidden="true" /> {config.contact.phone}
          </a>
          <button onClick={() => onNavLinkClick('contact')} className="btn-primary text-sm py-2 px-5" aria-label="Schedule a free estimate">
            Free Estimate
          </button>
        </div>

        <button
          className="md:hidden text-white p-2 cursor-pointer"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label={isMobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={isMobileMenuOpen}
        >
          {isMobileMenuOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-dark-accent border-b border-white/10 overflow-hidden"
          >
            <div className="px-6 py-8 flex flex-col gap-6">
              <button
                onClick={() => { onAboutClick(); setIsMobileMenuOpen(false); }}
                className="text-left text-slate-300 text-lg font-medium cursor-pointer"
              >
                About
              </button>
              {['Services', 'Process', 'Testimonials'].map((item) => (
                <button
                  key={item}
                  onClick={() => { onNavLinkClick(item.toLowerCase()); setIsMobileMenuOpen(false); }}
                  className="text-left text-slate-300 text-lg font-medium cursor-pointer"
                >
                  {item}
                </button>
              ))}
              <button
                onClick={() => { onGalleryClick(); setIsMobileMenuOpen(false); }}
                className="text-left text-slate-300 text-lg font-medium cursor-pointer"
              >
                Gallery
              </button>
              <a href={`tel:${config.contact.phone}`} className="flex items-center gap-2 text-primary text-lg font-semibold">
                <Phone className="w-5 h-5" aria-hidden="true" /> {config.contact.phone}
              </a>
              <button onClick={() => { onNavLinkClick('contact'); setIsMobileMenuOpen(false); }} className="btn-primary w-full justify-center">
                Schedule Your Free Estimate
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

// Image Comparison Slider (inspired by 21st.dev/thanh/image-comparison-slider)
interface ImageComparisonProps {
  beforeImage: string;
  afterImage: string;
  altBefore?: string;
  altAfter?: string;
}

const ImageComparisonSlider = ({
  beforeImage,
  afterImage,
  altBefore = 'Before',
  altAfter = 'After',
}: ImageComparisonProps) => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = useCallback(
    (clientX: number) => {
      if (!isDragging || !containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = clientX - rect.left;
      const position = Math.max(0, Math.min(100, (x / rect.width) * 100));
      setSliderPosition(position);
    },
    [isDragging]
  );

  const handleMouseMove = useCallback((e: React.MouseEvent) => handleMove(e.clientX), [handleMove]);
  const handleTouchMove = useCallback(
    (e: React.TouchEvent) => {
      if (e.touches.length > 0) handleMove(e.touches[0].clientX);
    },
    [handleMove]
  );

  const handleStart = () => setIsDragging(true);
  const handleEnd = () => setIsDragging(false);

  useEffect(() => {
    const stop = () => setIsDragging(false);
    if (isDragging) {
      window.addEventListener('mouseup', stop);
      window.addEventListener('touchend', stop);
    }
    return () => {
      window.removeEventListener('mouseup', stop);
      window.removeEventListener('touchend', stop);
    };
  }, [isDragging]);

  return (
    <div
      ref={containerRef}
      className="relative w-full aspect-video select-none rounded-2xl overflow-hidden cursor-ew-resize"
      onMouseMove={handleMouseMove}
      onMouseUp={handleEnd}
      onMouseLeave={handleEnd}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleEnd}
    >
      {/* Before Image (Bottom Layer) */}
      <img
        src={beforeImage}
        alt={altBefore}
        className="block h-full w-full object-cover"
        draggable="false"
      />

      {/* After Image (Top Layer — clipped) */}
      <div
        className="absolute top-0 left-0 h-full w-full overflow-hidden"
        style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
      >
        <img
          src={afterImage}
          alt={altAfter}
          className="h-full w-full object-cover"
          draggable="false"
        />
      </div>

      {/* Before / After Labels */}
      <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-sm text-white text-xs font-bold px-3 py-1 rounded-full pointer-events-none">Before</div>
      <div className="absolute top-3 right-3 bg-primary/80 backdrop-blur-sm text-dark text-xs font-bold px-3 py-1 rounded-full pointer-events-none">After</div>

      {/* Slider Handle */}
      <div
        className="absolute top-0 bottom-0 w-1 bg-white/80"
        style={{ left: `calc(${sliderPosition}% - 2px)` }}
        onMouseDown={handleStart}
        onTouchStart={handleStart}
      >
        <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-full h-10 w-10 flex items-center justify-center shadow-lg transition-transform duration-200 ${isDragging ? 'scale-110 shadow-xl' : ''}`}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-gray-700">
            <path d="m15 18-6-6 6-6" />
            <path d="m9 18 6-6-6-6" />
          </svg>
        </div>
      </div>
    </div>
  );
};

const Hero = () => {
  return (
    <section className="relative min-h-[90vh] lg:min-h-0 flex items-center pt-20 pb-12 lg:py-28 overflow-hidden bg-dark">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={config.business.heroBackgroundImage}
          alt="Luxury outdoor living space with deck and pool overlooking a scenic backyard"
          className="w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-dark via-dark/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-dark via-transparent to-transparent" />
      </div>

      {/* Grid Overlay */}
      <div className="absolute inset-0 opacity-10 pointer-events-none"
        style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '40px 40px' }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-wider mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            {config.business.heroBadgeText}
          </div>
          <h1 className="text-5xl lg:text-7xl font-bold text-white leading-[1.1] mb-6 tracking-tight">
            {config.business.tagline}<span className="text-primary">{config.business.taglineAccent}</span>
          </h1>
          <p className="text-xl text-slate-300 mb-10 leading-relaxed max-w-xl mx-auto">
            {config.business.heroSubheadline}
          </p>
          <div className="flex flex-wrap gap-4 mb-12 justify-center">
            <a href="#contact" className="btn-primary py-4 px-8 text-lg">
              Schedule Your Free Estimate <ArrowRight className="w-5 h-5" aria-hidden="true" />
            </a>
            <a href="#services" className="btn-outline py-4 px-8 text-lg">
              View Our Services
            </a>
          </div>

          <div className="flex items-center gap-8 justify-center">
            {TRUST_BADGES.map((badge, i) => (
              <div key={i} className="flex items-center gap-2 text-slate-400">
                <badge.icon className="w-5 h-5 text-primary" aria-hidden="true" />
                <span className="text-sm font-medium">{badge.label}</span>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="hidden lg:block"
        >
          <div className="relative">
            <div className="absolute -inset-4 bg-primary/20 blur-3xl rounded-full" />
            <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-3xl">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-white font-bold text-xl">Recent Transformation</h3>
                <span className="text-primary font-bold text-sm">Drag to Compare</span>
              </div>
              <ImageComparisonSlider
                beforeImage={config.beforeAfterImages.before}
                afterImage={config.beforeAfterImages.after}
                altBefore={config.beforeAfterImages.altBefore}
                altAfter={config.beforeAfterImages.altAfter}
              />
              <div className="grid grid-cols-3 gap-4 mt-6">
                <div className="text-center">
                  <div className="text-white font-bold text-2xl">12</div>
                  <div className="text-slate-400 text-xs uppercase tracking-wider">Weeks</div>
                </div>
                <div className="text-center border-x border-white/10">
                  <div className="text-white font-bold text-2xl">{config.testimonials.averageRating}</div>
                  <div className="text-slate-400 text-xs uppercase tracking-wider">Rating</div>
                </div>
                <div className="text-center">
                  <div className="text-white font-bold text-2xl">100%</div>
                  <div className="text-slate-400 text-xs uppercase tracking-wider">Custom</div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const StatsBar = () => {
  return (
    <section className="bg-dark-accent border-y border-white/10">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {STATS.map((stat, i) => (
            <motion.div
              key={i}
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <div className="text-primary font-bold text-3xl lg:text-4xl mb-1">{stat.value}</div>
              <div className="text-slate-400 text-sm uppercase tracking-wider font-medium">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const LifestylePillars = () => {
  return (
    <section className="section-padding bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-primary font-bold tracking-widest text-sm uppercase mb-4">{config.sectionHeaders.lifestyleLabel}</h2>
          <h3 className="text-4xl lg:text-5xl font-bold text-slate-900 tracking-tight">
            {config.sectionHeaders.lifestyleTitle}
          </h3>
        </div>
        <div className="grid md:grid-cols-4 gap-8">
          {LIFESTYLE_PILLARS.map((pillar, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="text-center p-10 rounded-3xl bg-slate-50 border border-slate-100 transition-shadow duration-200 hover:shadow-lg"
            >
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mx-auto mb-6">
                <pillar.icon className="w-8 h-8" aria-hidden="true" />
              </div>
              <h4 className="text-2xl font-bold text-slate-900 mb-3">{pillar.title}</h4>
              <p className="text-slate-600 leading-relaxed">{pillar.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Services = ({ onNavigateToService }: { onNavigateToService: (serviceId: string) => void }) => {
  return (
    <section id="services" className="section-padding bg-slate-50">
      <div className="max-w-7xl mx-auto px-2">
        <div className="text-center mb-20">
          <h2 className="text-primary font-bold tracking-widest text-sm uppercase mb-4">{config.sectionHeaders.servicesLabel}</h2>
          <h3 className="text-4xl lg:text-5xl font-bold text-slate-900 tracking-tight">
            {config.sectionHeaders.servicesTitle}
          </h3>
          <p className="text-slate-600 text-lg mt-6 max-w-2xl mx-auto">
            {config.sectionHeaders.servicesSubtitle}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {SERVICES.map((service, i) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer"
              onClick={() => onNavigateToService(service.id)}
            >
              <div className="h-64 overflow-hidden relative">
                <img
                  src={service.image}
                  alt={`${service.title} — ${service.desc}`}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm p-3 rounded-2xl text-primary shadow-lg">
                  <service.icon className="w-6 h-6" aria-hidden="true" />
                </div>
              </div>
              <div className="p-8">
                <h4 className="text-2xl font-bold text-slate-900 mb-3">{service.title}</h4>
                <p className="text-slate-600 mb-6 leading-relaxed">
                  {service.desc}
                </p>
                <button onClick={() => onNavigateToService(service.id)} className="inline-flex items-center gap-2 text-primary font-bold hover:gap-3 transition-all cursor-pointer" aria-label={`Learn more about ${service.title}`}>
                  Learn More <ChevronRight className="w-4 h-4" aria-hidden="true" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-16">
          <a href="#contact" className="btn-primary py-4 px-8 text-lg">
            Schedule Your Free Estimate <ArrowRight className="w-5 h-5" aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
};

const HowItWorks = () => {
  return (
    <section className="section-padding bg-dark text-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-primary font-bold tracking-widest text-sm uppercase mb-4">
            {config.sectionHeaders.processLabel}
          </h2>
          <h3 className="text-4xl lg:text-5xl font-bold tracking-tight">
            {config.sectionHeaders.processTitle}
          </h3>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {PROCESS_STEPS.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="text-center"
            >
              <div className="relative w-20 h-20 rounded-3xl bg-white/5 border border-white/10 flex items-center justify-center mx-auto mb-6">
                <step.icon className="w-10 h-10 text-primary" aria-hidden="true" />
                <span className="absolute -top-3 -left-3 w-8 h-8 rounded-full bg-primary text-dark flex items-center justify-center font-bold text-sm">
                  0{i + 1}
                </span>
              </div>
              <h4 className="text-xl font-bold mb-3">{step.title}</h4>
              <p className="text-slate-400 leading-relaxed text-sm">{step.desc}</p>
            </motion.div>
          ))}
        </div>
        <div className="text-center mt-16">
          <a href="#contact" className="btn-primary py-4 px-8 text-lg">
            Schedule Your Free Estimate <ArrowRight className="w-5 h-5" aria-hidden="true" />
          </a>
        </div>
      </div>
    </section >
  );
};

const Testimonials = () => {
  const { reviews: liveReviews, rating, userRatingCount, loading } = useGoogleReviews(config.contact.googlePlaceId);

  const reviews: GoogleReview[] = liveReviews.length > 0
    ? liveReviews
    : TESTIMONIALS.map(t => ({ quote: t.quote, name: t.name, rating: t.rating, profilePhoto: null, relativeTime: t.location }));

  const displayRating = rating?.toFixed(1) ?? config.testimonials.averageRating;
  const displayCount = userRatingCount?.toString() ?? config.testimonials.reviewCount;

  return (
    <section id="testimonials" className="section-padding bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="text-primary font-bold tracking-widest text-sm uppercase mb-4">{config.sectionHeaders.testimonialsLabel}</h2>
          <h3 className="text-4xl lg:text-5xl font-bold text-slate-900 tracking-tight">
            {config.sectionHeaders.testimonialsTitle}
          </h3>
          <p className="text-slate-500 text-lg mt-4">
            Join <span className="text-primary font-bold">{config.sectionHeaders.testimonialsSubtitle}</span> who gave us a perfect 5-star rating on Google
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {loading
            ? [...Array(3)].map((_, i) => (
              <div key={i} className="p-10 rounded-[2.5rem] bg-slate-50 border border-slate-100 animate-pulse h-64" />
            ))
            : reviews.slice(0, 3).map((t, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="p-10 rounded-[2.5rem] bg-slate-50 border border-slate-100 flex flex-col transition-shadow duration-200 hover:shadow-lg"
              >
                <div className="flex gap-1 mb-6">
                  {[...Array(t.rating)].map((_, j) => (
                    <Star key={j} className="w-5 h-5 fill-primary text-primary" />
                  ))}
                </div>
                <p className="text-lg text-slate-700 italic mb-8 flex-grow leading-relaxed">
                  "{t.quote}"
                </p>
                <div className="flex items-center gap-4">
                  {t.profilePhoto
                    ? <img src={t.profilePhoto} alt={t.name} className="w-12 h-12 rounded-full object-cover" />
                    : <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">{t.name.charAt(0)}</div>
                  }
                  <div>
                    <h5 className="font-bold text-slate-900">{t.name}</h5>
                    <div className="flex items-center gap-1 text-slate-500 text-sm">
                      {t.relativeTime
                        ? t.relativeTime
                        : <><MapPin className="w-3 h-3" aria-hidden="true" /> {'location' in t ? (t as any).location : 'Google Review'}</>
                      }
                    </div>
                  </div>
                </div>
              </motion.div>
            ))
          }
        </div>

        <div className="text-center mt-12">
          <a href={config.contact.googleReviewsUrl ?? '#'} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-primary font-bold text-lg hover:gap-3 transition-all cursor-pointer">
            Read All {displayCount} Reviews ({displayRating}★) <ChevronRight className="w-5 h-5" aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
};

const TrustedPartners = () => {
  return (
    <section className="py-20 bg-dark relative overflow-hidden">
      {/* Inline styles for Glowing Shadow (CSS Houdini @property) */}
      <style>{`
        @property --glow-blur {
          syntax: "<number>";
          inherits: true;
          initial-value: 20;
        }
        @property --glow-opacity {
          syntax: "<number>";
          inherits: true;
          initial-value: 0.35;
        }
        @property --glow-scale {
          syntax: "<number>";
          inherits: true;
          initial-value: 1.05;
        }
        @property --glow-rotate {
          syntax: "<number>";
          inherits: true;
          initial-value: 0;
        }
        @property --glow-hue {
          syntax: "<number>";
          inherits: true;
          initial-value: 155;
        }

        .partner-glow {
          --glow-blur: 20;
          --glow-opacity: 0.35;
          --glow-scale: 1.05;
          position: relative;
          display: inline-flex;
          border-radius: 1rem;
          transition: --glow-blur 0.5s, --glow-opacity 0.5s, --glow-scale 0.5s;
        }

        .partner-glow:hover {
          --glow-blur: 50;
          --glow-opacity: 0.7;
          --glow-scale: 1.25;
        }

        .partner-glow-effect {
          position: absolute;
          inset: 0;
          z-index: 0;
          pointer-events: none;
        }

        .partner-glow-effect::after {
          content: "";
          position: absolute;
          top: 50%;
          left: 50%;
          width: 100%;
          height: 100%;
          background: hsl(calc(var(--glow-hue)), 80%, 55%);
          transform: translate(-50%, -50%) rotate(calc(var(--glow-rotate) * 1deg)) scale(var(--glow-scale));
          filter: blur(calc(var(--glow-blur) * 1px));
          opacity: var(--glow-opacity);
          animation: partner-rotate 6s linear infinite, partner-hue 10s linear infinite;
          border-radius: 1rem;
        }

        .partner-glow-content {
          position: relative;
          z-index: 1;
          background: rgba(10, 10, 10, 0.95);
          border-radius: 1rem;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 1px solid rgba(255, 255, 255, 0.08);
        }

        @keyframes partner-rotate {
          from { --glow-rotate: 0; }
          to { --glow-rotate: 360; }
        }

        @keyframes partner-hue {
          0% { --glow-hue: 140; }
          50% { --glow-hue: 180; }
          100% { --glow-hue: 140; }
        }
      `}</style>

      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-center text-sm font-bold text-primary uppercase tracking-widest mb-12">
          {config.sectionHeaders.partnersLabel}
        </h2>
        <div className="flex flex-wrap items-center justify-center gap-6">
          {PARTNERS.map((partner, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="partner-glow"
            >
              <span className="partner-glow-effect" />
              <div className="partner-glow-content px-8 py-4">
                <span className="text-white font-bold text-lg tracking-tight">{partner}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// const Financing = () => {
//   return (
//     <section className="section-padding bg-primary">
//       <div className="max-w-7xl mx-auto px-6">
//         <div className="bg-dark rounded-[3rem] p-8 lg:p-20 flex flex-col lg:flex-row items-center gap-12 overflow-hidden relative">
//           <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none"
//             style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '30px 30px' }}
//           />

//           <div className="flex-1 relative z-10">
//             <div className="inline-flex items-center gap-2 text-primary font-bold uppercase tracking-widest text-sm mb-6">
//               <DollarSign className="w-5 h-5" aria-hidden="true" /> Smart Financing
//             </div>
//             <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
//               {config.financing?.headline}
//             </h2>
//             <p className="text-slate-400 text-lg mb-10 max-w-xl">
//               {config.financing?.subheadline}
//             </p>
//             <div className="flex flex-wrap gap-6">
//               {config.financing?.benefits.map((benefit, i) => (
//                 <div key={i} className="flex items-center gap-3">
//                   <CheckCircle2 className="text-primary w-6 h-6" aria-hidden="true" />
//                   <span className="text-white font-medium">{benefit}</span>
//                 </div>
//               ))}
//             </div>
//           </div>

//           <div className="lg:w-1/3 relative z-10">
//             <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-3xl text-center">
//               <div className="text-slate-400 text-sm uppercase tracking-widest mb-2">Starting at</div>
//               <div className="text-white text-5xl font-bold mb-6">{config.financing?.startingPrice}<span className="text-lg font-normal text-slate-400">{config.financing?.pricePeriod}</span></div>
//               <a href="#contact" className="btn-primary w-full justify-center py-4">
//                 Check Your Rate
//               </a>
//               <p className="text-slate-500 text-xs mt-4">
//                 *Subject to credit approval. Terms and conditions apply.
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

const Locations = () => {
  return (
    <section id="locations" className="section-padding bg-slate-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <div>
            <h2 className="text-primary font-bold tracking-widest text-sm uppercase mb-4">Service Areas</h2>
            <h3 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-8 tracking-tight">
              {config.contact.serviceAreaHeadline}
            </h3>
            <p className="text-slate-600 text-lg mb-12 leading-relaxed">
              {config.contact.serviceAreaDescription}
            </p>

            <div className="space-y-6">
              {LOCATIONS.map((loc, i) => (
                <div key={i} className="flex items-start gap-4 p-6 bg-white rounded-2xl border border-slate-200 shadow-sm transition-shadow duration-200 hover:shadow-md">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
                    <MapPin className="w-6 h-6" aria-hidden="true" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-lg">{loc.state}</h4>
                    <p className="text-slate-500 text-sm mb-2">{loc.address}</p>
                    <a href={`tel:${loc.phone}`} className="text-primary font-semibold flex items-center gap-2 hover:underline">
                      <Phone className="w-4 h-4" aria-hidden="true" /> {loc.phone}
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="aspect-square rounded-[3rem] overflow-hidden shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1524813686514-a57563d77965?auto=format&fit=crop&q=80&w=1000"
                alt="Scenic East Coast outdoor living area showcasing our service regions"
                className="w-full h-full object-cover"
                loading="lazy"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="absolute -bottom-10 -left-10 bg-white p-8 rounded-3xl shadow-xl max-w-xs hidden md:block">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-10 h-10 rounded-full bg-emerald-500 flex items-center justify-center text-white">
                  <CheckCircle2 className="w-6 h-6" aria-hidden="true" />
                </div>
                <span className="font-bold text-slate-900">Fully Licensed & Insured</span>
              </div>
              <p className="text-slate-500 text-sm">
                We handle all local permits and zoning requirements for your specific municipality.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Footer = ({
  onNavigateToAbout,
  onNavigateToSection,
  onNavigateToGallery,
  onNavigateToService,
}: {
  onNavigateToAbout: () => void;
  onNavigateToSection: (section: string) => void;
  onNavigateToGallery: () => void;
  onNavigateToService: (serviceId: string) => void;
}) => {
  return (
    <footer className="bg-dark text-white pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12 mb-20">
          <div className="lg:col-span-1">
            <div className="mb-8">
              {config.business.logoUrl ? (
                <img src={config.business.logoUrl} alt={`${config.business.nameLine1} ${config.business.nameLine2} logo`} className="h-12 w-auto object-contain mb-4" />
              ) : (
                <div className="flex flex-col">
                  <span className="text-primary font-bold tracking-[0.2em] text-xs uppercase">{config.business.nameLine1}</span>
                  <span className="text-white font-semibold text-2xl tracking-tight">{config.business.nameLine2}</span>
                </div>
              )}
            </div>
            <p className="text-slate-400 leading-relaxed mb-8">
              {config.business.description}
            </p>
            <SocialIcons />
          </div>

          <div>
            <h4 className="font-bold text-lg mb-8">Services</h4>
            <ul className="space-y-4 text-slate-400">
              {SERVICES.map(s => (
                <li key={s.id}>
                  <button onClick={() => onNavigateToService(s.id)} className="hover:text-primary transition-colors duration-200 text-left cursor-pointer">
                    {s.title}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-8">Company</h4>
            <ul className="space-y-4 text-slate-400">
              <li><button onClick={onNavigateToAbout} className="hover:text-primary transition-colors duration-200 cursor-pointer">About Us</button></li>
              <li><button onClick={() => onNavigateToSection('process')} className="hover:text-primary transition-colors duration-200 cursor-pointer">Our Process</button></li>
              <li><button onClick={onNavigateToGallery} className="hover:text-primary transition-colors duration-200 cursor-pointer">Project Gallery</button></li>
              <li><button onClick={() => onNavigateToSection('testimonials')} className="hover:text-primary transition-colors duration-200 cursor-pointer">Reviews</button></li>
              <li><button onClick={() => onNavigateToSection('contact')} className="hover:text-primary transition-colors duration-200 cursor-pointer">Careers</button></li>
              <li><button onClick={() => onNavigateToSection('contact')} className="hover:text-primary transition-colors duration-200 cursor-pointer">Contact</button></li>
            </ul>
          </div>


        </div>

        <div className="pt-10 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6 text-slate-500 text-sm">
          <p>© {new Date().getFullYear()} {config.business.nameLine1} {config.business.nameLine2}. All rights reserved.</p>
          <div className="flex gap-8">
            <a href="#" className="hover:text-white transition-colors duration-200">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors duration-200">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

const FORM_STEPS = [
  { id: 0, label: 'Contact Info' },
  { id: 1, label: 'Project Details' },
  { id: 2, label: 'Budget & Timeline' },
  { id: 3, label: 'Review & Submit' }
];

const ContactForm = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    projectType: '',
    services: [] as string[],
    description: '',
    propertyType: '',
    budget: '',
    timeline: '',
    financing: '',
    hearAbout: ''
  });

  const updateField = (field: string, value: string | string[]) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const toggleService = (service: string) => {
    setFormData(prev => ({
      ...prev,
      services: prev.services.includes(service)
        ? prev.services.filter(s => s !== service)
        : [...prev.services, service]
    }));
  };

  const next = () => {
    if (currentStep < FORM_STEPS.length - 1) {
      setDirection(1);
      setCurrentStep(prev => prev + 1);
    }
  };

  const back = () => {
    if (currentStep > 0) {
      setDirection(-1);
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setSubmitError(false);

    try {
      const res = await fetch('/.netlify/functions/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName: formData.fullName.split(' ')[0] ?? formData.fullName,
          lastName: formData.fullName.split(' ').slice(1).join(' ') || '',
          email: formData.email,
          phone: formData.phone,
          address: formData.address,
          services: formData.services.join(', '),
          projectType: formData.projectType,
          propertyType: formData.propertyType,
          description: formData.description,
          budget: formData.budget,
          timeline: formData.timeline,
          financing: formData.financing,
          hearAbout: formData.hearAbout,
          source: `${config.business.nameLine1} ${config.business.nameLine2} Website`,
        }),
      });
      if (!res.ok) throw new Error('Submission failed');
      setIsSubmitted(true);
    } catch {
      setSubmitError(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const progressWidth = `${(currentStep / (FORM_STEPS.length - 1)) * 100}%`;

  const serviceOptions = config.serviceOptions;

  if (isSubmitted) {
    return (
      <section id="contact" className="section-padding bg-dark">
        <div className="max-w-2xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-12 text-center"
          >
            <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="w-10 h-10 text-primary" />
            </div>
            <h3 className="text-3xl font-bold text-white mb-4">Thank You, {formData.fullName}!</h3>
            <p className="text-slate-400 text-lg mb-8">
              Your project inquiry has been received. A member of our design team will reach out within 24 hours to schedule your free in-home estimate.
            </p>
            <div className="inline-flex items-center gap-2 text-primary font-semibold">
              <Phone className="w-5 h-5" />
              Need us sooner? Call {config.contact.phone}
            </div>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section id="contact" className="section-padding bg-dark overflow-hidden">
      <div className="max-w-3xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-primary font-bold tracking-widest text-sm uppercase mb-4">Get Started Today</h2>
          <h3 className="text-4xl lg:text-5xl font-bold text-white tracking-tight mb-4">
            Request your free estimate
          </h3>
          <p className="text-slate-400 text-lg">
            Tell us about your dream project. We'll follow up within 24 hours.
          </p>
        </div>

        {/* Step Indicators */}
        <div className="mb-10">
          <div className="flex items-center justify-between relative mb-3">
            {/* Progress line background */}
            <div className="absolute top-4 left-0 right-0 h-[2px] bg-white/10" />
            <motion.div
              className="absolute top-4 left-0 h-[2px] bg-primary"
              animate={{ width: progressWidth }}
              transition={{ duration: 0.4, ease: 'easeInOut' }}
            />

            {FORM_STEPS.map((step) => (
              <div key={step.id} className="relative z-10 flex flex-col items-center">
                <motion.div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold border-2 transition-colors duration-300 ${step.id < currentStep
                    ? 'bg-primary border-primary text-dark'
                    : step.id === currentStep
                      ? 'bg-dark border-primary text-primary'
                      : 'bg-dark border-white/20 text-slate-500'
                    }`}
                  animate={step.id === currentStep ? { scale: [1, 1.1, 1] } : {}}
                  transition={{ duration: 0.3 }}
                >
                  {step.id < currentStep ? (
                    <CheckCircle2 className="w-4 h-4" />
                  ) : (
                    step.id + 1
                  )}
                </motion.div>
                <span className={`text-xs mt-2 font-medium hidden sm:block ${step.id <= currentStep ? 'text-primary' : 'text-slate-500'
                  }`}>
                  {step.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Form Card */}
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={currentStep}
              custom={direction}
              initial={{ opacity: 0, x: direction * 80 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: direction * -80 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="p-8 lg:p-10"
            >
              {/* Step 1: Contact Info */}
              {currentStep === 0 && (
                <div>
                  <h4 className="text-2xl font-bold text-white mb-2">Tell us about yourself</h4>
                  <p className="text-slate-400 mb-8">Let's start with some basic information</p>

                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-semibold text-slate-300 mb-2">Full Name *</label>
                      <input
                        type="text"
                        placeholder="John & Sarah Smith"
                        value={formData.fullName}
                        onChange={(e) => updateField('fullName', e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-slate-500 focus:outline-none focus:border-primary transition-colors"
                      />
                    </div>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-semibold text-slate-300 mb-2">Email Address *</label>
                        <input
                          type="email"
                          placeholder="john@example.com"
                          value={formData.email}
                          onChange={(e) => updateField('email', e.target.value)}
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-slate-500 focus:outline-none focus:border-primary transition-colors"
                          autoComplete="email"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-slate-300 mb-2">Phone Number *</label>
                        <input
                          type="tel"
                          placeholder="(555) 123-4567"
                          value={formData.phone}
                          onChange={(e) => updateField('phone', e.target.value)}
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-slate-500 focus:outline-none focus:border-primary transition-colors"
                          autoComplete="tel"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-slate-300 mb-2">Property Address</label>
                      <input
                        type="text"
                        placeholder="123 Main St, West Chester, PA 19380"
                        value={formData.address}
                        onChange={(e) => updateField('address', e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-slate-500 focus:outline-none focus:border-primary transition-colors"
                        autoComplete="street-address"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Step 2: Project Details */}
              {currentStep === 1 && (
                <div>
                  <h4 className="text-2xl font-bold text-white mb-2">Tell us about your project</h4>
                  <p className="text-slate-400 mb-8">Select all the features you're interested in</p>

                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-semibold text-slate-300 mb-3">Services Interested In *</label>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        {serviceOptions.map((service) => (
                          <button
                            key={service}
                            type="button"
                            onClick={() => toggleService(service)}
                            className={`px-4 py-3 rounded-xl border text-sm font-medium transition-all duration-200 cursor-pointer ${formData.services.includes(service)
                              ? 'bg-primary/20 border-primary text-primary'
                              : 'bg-white/5 border-white/10 text-slate-400 hover:border-white/30'
                              }`}
                          >
                            {service}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-slate-300 mb-2">Property Type</label>
                      <select
                        value={formData.propertyType}
                        onChange={(e) => updateField('propertyType', e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors appearance-none cursor-pointer"
                      >
                        <option value="" className="bg-dark">Select property type</option>
                        <option value="single-family" className="bg-dark">Single Family Home</option>
                        <option value="townhouse" className="bg-dark">Townhouse</option>
                        <option value="estate" className="bg-dark">Estate / Large Property</option>
                        <option value="commercial" className="bg-dark">Commercial Property</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-slate-300 mb-2">Project Description</label>
                      <textarea
                        placeholder="Tell us about your vision — what you'd like your outdoor space to look and feel like..."
                        value={formData.description}
                        onChange={(e) => updateField('description', e.target.value)}
                        rows={4}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-slate-500 focus:outline-none focus:border-primary transition-colors resize-none"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Step 3: Budget & Timeline */}
              {currentStep === 2 && (
                <div>
                  <h4 className="text-2xl font-bold text-white mb-2">Budget & Timeline</h4>
                  <p className="text-slate-400 mb-8">Help us tailor the right solution for you</p>

                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-semibold text-slate-300 mb-2">Estimated Budget *</label>
                      <select
                        value={formData.budget}
                        onChange={(e) => updateField('budget', e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors appearance-none cursor-pointer"
                      >
                        <option value="" className="bg-dark">Select a budget range</option>
                        <option value="0-5k" className="bg-dark">$0 – $5,000</option>
                        <option value="5k-10k" className="bg-dark">$5,000 – $10,000</option>
                        <option value="10k-20k" className="bg-dark">$10,000 – $20,000</option>
                        <option value="20k-50k" className="bg-dark">$20,000 – $50,000</option>
                        <option value="50k+" className="bg-dark">$50,000+</option>
                        <option value="unsure" className="bg-dark">Not sure yet</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-slate-300 mb-2">Desired Timeline</label>
                      <select
                        value={formData.timeline}
                        onChange={(e) => updateField('timeline', e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors appearance-none cursor-pointer"
                      >
                        <option value="" className="bg-dark">When would you like to start?</option>
                        <option value="asap" className="bg-dark">As soon as possible</option>
                        <option value="1-3months" className="bg-dark">Within 1–3 months</option>
                        <option value="3-6months" className="bg-dark">Within 3–6 months</option>
                        <option value="6-12months" className="bg-dark">Within 6–12 months</option>
                        <option value="planning" className="bg-dark">Just planning / exploring</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-slate-300 mb-2">Interested in Financing?</label>
                      <div className="flex gap-4">
                        {['Yes', 'No', 'Maybe'].map((option) => (
                          <button
                            key={option}
                            type="button"
                            onClick={() => updateField('financing', option)}
                            className={`flex-1 py-3 rounded-xl border text-sm font-medium transition-all duration-200 cursor-pointer ${formData.financing === option
                              ? 'bg-primary/20 border-primary text-primary'
                              : 'bg-white/5 border-white/10 text-slate-400 hover:border-white/30'
                              }`}
                          >
                            {option}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-slate-300 mb-2">How did you hear about us?</label>
                      <select
                        value={formData.hearAbout}
                        onChange={(e) => updateField('hearAbout', e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors appearance-none cursor-pointer"
                      >
                        <option value="" className="bg-dark">Select an option</option>
                        <option value="google" className="bg-dark">Google Search</option>
                        <option value="referral" className="bg-dark">Friend / Neighbor Referral</option>
                        <option value="social" className="bg-dark">Social Media</option>
                        <option value="showroom" className="bg-dark">Visited Our Showroom</option>
                        <option value="event" className="bg-dark">Home Show / Event</option>
                        <option value="other" className="bg-dark">Other</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 4: Review & Submit */}
              {currentStep === 3 && (
                <div>
                  <h4 className="text-2xl font-bold text-white mb-2">Review your project details</h4>
                  <p className="text-slate-400 mb-8">Make sure everything looks good before submitting</p>

                  <div className="space-y-4">
                    <div className="bg-white/5 rounded-xl p-5 border border-white/10">
                      <h5 className="text-xs uppercase tracking-widest text-primary font-bold mb-3">Contact Information</h5>
                      <div className="grid md:grid-cols-2 gap-3 text-sm">
                        <div><span className="text-slate-500">Name:</span> <span className="text-white">{formData.fullName || '—'}</span></div>
                        <div><span className="text-slate-500">Email:</span> <span className="text-white">{formData.email || '—'}</span></div>
                        <div><span className="text-slate-500">Phone:</span> <span className="text-white">{formData.phone || '—'}</span></div>
                        <div><span className="text-slate-500">Address:</span> <span className="text-white">{formData.address || '—'}</span></div>
                      </div>
                    </div>

                    <div className="bg-white/5 rounded-xl p-5 border border-white/10">
                      <h5 className="text-xs uppercase tracking-widest text-primary font-bold mb-3">Project Details</h5>
                      <div className="space-y-3 text-sm">
                        <div>
                          <span className="text-slate-500">Services:</span>{' '}
                          <span className="text-white">{formData.services.length > 0 ? formData.services.join(', ') : '—'}</span>
                        </div>
                        <div><span className="text-slate-500">Property:</span> <span className="text-white">{formData.propertyType || '—'}</span></div>
                        {formData.description && (
                          <div>
                            <span className="text-slate-500">Description:</span>{' '}
                            <span className="text-white">{formData.description}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="bg-white/5 rounded-xl p-5 border border-white/10">
                      <h5 className="text-xs uppercase tracking-widest text-primary font-bold mb-3">Budget & Timeline</h5>
                      <div className="grid md:grid-cols-2 gap-3 text-sm">
                        <div><span className="text-slate-500">Budget:</span> <span className="text-white">{formData.budget || '—'}</span></div>
                        <div><span className="text-slate-500">Timeline:</span> <span className="text-white">{formData.timeline || '—'}</span></div>
                        <div><span className="text-slate-500">Financing:</span> <span className="text-white">{formData.financing || '—'}</span></div>
                        <div><span className="text-slate-500">Referral:</span> <span className="text-white">{formData.hearAbout || '—'}</span></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Navigation Footer */}
          <div className="px-8 lg:px-10 py-6 border-t border-white/10 flex items-center justify-between">
            <button
              onClick={back}
              disabled={currentStep === 0}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium transition-all duration-200 cursor-pointer ${currentStep === 0
                ? 'text-slate-600 cursor-not-allowed'
                : 'text-slate-300 hover:text-white hover:bg-white/5'
                }`}
            >
              <ChevronRight className="w-4 h-4 rotate-180" aria-hidden="true" /> Back
            </button>

            <span className="text-slate-500 text-sm hidden sm:block">
              Step {currentStep + 1} of {FORM_STEPS.length}: {FORM_STEPS[currentStep].label}
            </span>

            {currentStep < FORM_STEPS.length - 1 ? (
              <motion.button
                onClick={next}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 bg-primary hover:bg-primary-hover text-dark px-6 py-2.5 rounded-xl font-bold transition-colors duration-200 cursor-pointer"
              >
                Next <ChevronRight className="w-4 h-4" aria-hidden="true" />
              </motion.button>
            ) : (
              <div className="flex flex-col items-end gap-2">
                {submitError && (
                  <p className="text-red-400 text-xs">Something went wrong — please try again.</p>
                )}
                <motion.button
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-2 bg-primary hover:bg-primary-hover text-dark px-6 py-2.5 rounded-xl font-bold transition-colors duration-200 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Sending…' : 'Submit Request'}
                  {!isSubmitting && <ArrowRight className="w-4 h-4" aria-hidden="true" />}
                </motion.button>
              </div>
            )}
          </div>
        </div>

        <p className="text-center text-slate-500 text-sm mt-6">
          Your information is secure and will never be shared. We'll respond within 24 hours.
        </p>
      </div>
    </section>
  );
};

export default function App() {
  const [page, setPage] = useState<PageState>({ id: 'home' });

  // Inject GTM and HighLevel tracking scripts once on mount
  useEffect(() => {
    const { gtmId, ghlTrackingScriptUrl } = config.tracking ?? {};

    if (gtmId && gtmId !== 'GTM-XXXXXXX') {
      const script = document.createElement('script');
      script.async = true;
      script.src = `https://www.googletagmanager.com/gtm.js?id=${gtmId}`;
      document.head.appendChild(script);

      // Update GTM noscript iframe ID
      const ns = document.querySelector('noscript iframe') as HTMLIFrameElement | null;
      if (ns) ns.src = `https://www.googletagmanager.com/ns.html?id=${gtmId}`;
    }

    if (ghlTrackingScriptUrl) {
      const script = document.createElement('script');
      script.async = true;
      script.src = ghlTrackingScriptUrl;
      document.head.appendChild(script);
    }
  }, []);

  const navigate = useCallback((next: PageState) => {
    setPage(next);
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  }, []);

  const navigateToContact = useCallback(() => {
    setPage({ id: 'home' });
    // Defer scroll until home sections are rendered
    setTimeout(() => {
      document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
    }, 80);
  }, []);

  const handleNavLinkClick = useCallback((section: string) => {
    setPage({ id: 'home' });
    setTimeout(() => {
      document.getElementById(section)?.scrollIntoView({ behavior: 'smooth' });
    }, 80);
  }, []);

  const navigateToService = useCallback((serviceId: string) => {
    setPage({ id: 'service-detail', serviceId });
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  }, []);

  const navigateToAbout = useCallback(() => {
    navigate({ id: 'about' });
  }, [navigate]);

  return (
    <div className="min-h-screen bg-white">
      <a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:bg-primary focus:text-white focus:px-4 focus:py-2 focus:rounded-full focus:font-semibold">
        Skip to main content
      </a>
      <Navbar
        onGalleryClick={() => navigate({ id: 'gallery' })}
        onAboutClick={navigateToAbout}
        onLogoClick={() => navigate({ id: 'home' })}
        onNavLinkClick={handleNavLinkClick}
      />
      <main id="main-content">
        {page.id === 'home' && (
          <>
            <Hero />
            <StatsBar />
            <LifestylePillars />
            <Services onNavigateToService={navigateToService} />
            <HowItWorks />
            <Testimonials />
            <TrustedPartners />
            {/* <Financing /> */}
            <Locations />
            <ContactForm />
          </>
        )}
        {page.id === 'gallery' && (
          <GalleryCatalog
            onNavigateToDetail={(galleryId) => navigate({ id: 'gallery-detail', galleryId })}
            onNavigateHome={() => navigate({ id: 'home' })}
            onNavigateToContact={navigateToContact}
          />
        )}
        {page.id === 'gallery-detail' && (
          <GalleryDetail
            galleryId={page.galleryId}
            onBack={() => navigate({ id: 'gallery' })}
            onNavigateToContact={navigateToContact}
          />
        )}
        {page.id === 'service-detail' && (
          <ServiceDetail
            serviceId={page.serviceId}
            onNavigateToContact={navigateToContact}
            onNavigateToService={navigateToService}
            onNavigateHome={() => navigate({ id: 'home' })}
          />
        )}
        {page.id === 'about' && (
          <AboutUs
            onNavigateToContact={navigateToContact}
            onNavigateHome={() => navigate({ id: 'home' })}
          />
        )}
      </main>
      <Footer
        onNavigateToAbout={navigateToAbout}
        onNavigateToSection={handleNavLinkClick}
        onNavigateToGallery={() => navigate({ id: 'gallery' })}
        onNavigateToService={navigateToService}
      />
      <ConsentBanner />
    </div>
  );
}
