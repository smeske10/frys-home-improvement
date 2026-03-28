import { motion } from 'motion/react';
import { ArrowLeft, MapPin, Calendar, Ruler, ArrowRight, Grid2x2 } from 'lucide-react';
import config from '../siteConfig';

interface Props {
    galleryId: string;
    onBack: () => void;
    onNavigateToContact: () => void;
}

const GalleryDetail = ({ galleryId, onBack, onNavigateToContact }: Props) => {
    const gallery = config.galleries?.find((g) => g.id === galleryId);

    if (!gallery) {
        return (
            <div className="min-h-screen bg-dark flex items-center justify-center pt-20">
                <div className="text-center">
                    <p className="text-slate-400 text-lg mb-4">Project not found.</p>
                    <button onClick={onBack} className="btn-primary">
                        Back to Gallery
                    </button>
                </div>
            </div>
        );
    }

    const [heroImage, ...restImages] = gallery.images;

    return (
        <div className="min-h-screen bg-dark">
            {/* Page Header */}
            <section className="bg-dark-accent border-b border-white/10 pt-32 pb-12">
                <div className="max-w-7xl mx-auto px-6">
                    <button
                        onClick={onBack}
                        className="flex items-center gap-2 text-slate-400 hover:text-white text-sm mb-8 transition-colors cursor-pointer"
                    >
                        <ArrowLeft className="w-4 h-4" /> Back to Gallery
                    </button>

                    <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
                        <div>
                            {/* Category pill */}
                            <span className="inline-block bg-primary/15 text-primary text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-widest mb-4">
                                {gallery.category}
                            </span>
                            <h1 className="text-4xl lg:text-5xl font-bold text-white tracking-tight mb-4">
                                {gallery.title}
                            </h1>
                            {/* Meta row */}
                            <div className="flex flex-wrap items-center gap-6 text-slate-400 text-sm">
                                <span className="flex items-center gap-2">
                                    <MapPin className="w-4 h-4 text-primary" />
                                    {gallery.location}
                                </span>
                                {gallery.completedYear && (
                                    <span className="flex items-center gap-2">
                                        <Calendar className="w-4 h-4 text-primary" />
                                        Completed {gallery.completedYear}
                                    </span>
                                )}
                                {gallery.projectSize && (
                                    <span className="flex items-center gap-2">
                                        <Ruler className="w-4 h-4 text-primary" />
                                        {gallery.projectSize}
                                    </span>
                                )}
                                <span className="flex items-center gap-2">
                                    <Grid2x2 className="w-4 h-4 text-primary" />
                                    {gallery.images.length} photos
                                </span>
                            </div>
                        </div>

                        <button
                            onClick={onNavigateToContact}
                            className="btn-primary py-3 px-6 flex-shrink-0"
                        >
                            Get a Free Estimate <ArrowRight className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </section>

            {/* Hero Image */}
            <div className="max-w-7xl mx-auto px-6 pt-12">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="relative rounded-3xl overflow-hidden"
                >
                    <img
                        src={heroImage.url}
                        alt={heroImage.alt}
                        className="w-full h-[480px] lg:h-[600px] object-cover"
                    />
                    {heroImage.caption && (
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-dark/80 to-transparent px-8 py-6">
                            <p className="text-slate-300 text-sm">{heroImage.caption}</p>
                        </div>
                    )}
                </motion.div>
            </div>

            {/* Description + Remaining Photos */}
            <div className="max-w-7xl mx-auto px-6 py-16">
                <div className="grid lg:grid-cols-3 gap-12">
                    {/* Description sidebar */}
                    <div className="lg:col-span-1">
                        <h2 className="text-primary font-bold tracking-widest text-xs uppercase mb-4">
                            Project Overview
                        </h2>
                        <p className="text-slate-300 text-lg leading-relaxed mb-8">
                            {gallery.description}
                        </p>
                        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-4">
                            <div>
                                <p className="text-slate-500 text-xs uppercase tracking-widest mb-1">Service Type</p>
                                <p className="text-white font-semibold">{gallery.category}</p>
                            </div>
                            <div className="border-t border-white/10" />
                            <div>
                                <p className="text-slate-500 text-xs uppercase tracking-widest mb-1">Location</p>
                                <p className="text-white font-semibold">{gallery.location}</p>
                            </div>
                            {gallery.projectSize && (
                                <>
                                    <div className="border-t border-white/10" />
                                    <div>
                                        <p className="text-slate-500 text-xs uppercase tracking-widest mb-1">
                                            Project Size
                                        </p>
                                        <p className="text-white font-semibold">{gallery.projectSize}</p>
                                    </div>
                                </>
                            )}
                            {gallery.completedYear && (
                                <>
                                    <div className="border-t border-white/10" />
                                    <div>
                                        <p className="text-slate-500 text-xs uppercase tracking-widest mb-1">
                                            Year Completed
                                        </p>
                                        <p className="text-white font-semibold">{gallery.completedYear}</p>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>

                    {/* Remaining photos grid */}
                    {restImages.length > 0 && (
                        <div className="lg:col-span-2">
                            <h2 className="text-primary font-bold tracking-widest text-xs uppercase mb-6">
                                Project Photos
                            </h2>
                            <div
                                className={`grid gap-4 ${
                                    restImages.length === 1 ? 'grid-cols-1' : 'grid-cols-2'
                                }`}
                            >
                                {restImages.map((img, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, scale: 0.97 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: 0.1 + i * 0.08 }}
                                        className={`relative rounded-2xl overflow-hidden group ${
                                            restImages.length === 3 && i === 2
                                                ? 'col-span-2'
                                                : ''
                                        }`}
                                    >
                                        <img
                                            src={img.url}
                                            alt={img.alt}
                                            className="w-full h-56 object-cover transition-transform duration-500 group-hover:scale-105"
                                            loading="lazy"
                                        />
                                        {img.caption && (
                                            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-dark/80 to-transparent px-4 py-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                                                <p className="text-slate-300 text-xs">{img.caption}</p>
                                            </div>
                                        )}
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* CTA */}
            <section className="bg-dark-accent border-t border-white/10 py-20">
                <div className="max-w-2xl mx-auto px-6 text-center">
                    <h2 className="text-3xl font-bold text-white mb-4">
                        Want results like this?
                    </h2>
                    <p className="text-slate-400 mb-8 text-lg">
                        Get a free, no-obligation on-site estimate for your project.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button onClick={onNavigateToContact} className="btn-primary py-4 px-8 text-lg">
                            Get a Free Estimate <ArrowRight className="w-5 h-5" />
                        </button>
                        <button onClick={onBack} className="btn-outline py-4 px-8 text-lg">
                            View More Projects
                        </button>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default GalleryDetail;
