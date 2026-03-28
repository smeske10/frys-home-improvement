import { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, MapPin, Calendar, ChevronRight, Images, ArrowRight } from 'lucide-react';
import config from '../siteConfig';

interface Props {
    onNavigateToDetail: (galleryId: string) => void;
    onNavigateHome: () => void;
    onNavigateToContact: () => void;
}

const GalleryCatalog = ({ onNavigateToDetail, onNavigateHome, onNavigateToContact }: Props) => {
    const [activeCategory, setActiveCategory] = useState('All');
    const galleries = config.galleries ?? [];

    const categories = ['All', ...Array.from(new Set(galleries.map((g) => g.category)))];
    const filtered =
        activeCategory === 'All'
            ? galleries
            : galleries.filter((g) => g.category === activeCategory);

    return (
        <div className="min-h-screen bg-dark">
            {/* Page Header */}
            <section className="bg-dark-accent border-b border-white/10 pt-32 pb-16">
                <div className="max-w-7xl mx-auto px-6">
                    <button
                        onClick={onNavigateHome}
                        className="flex items-center gap-2 text-slate-400 hover:text-white text-sm mb-8 transition-colors cursor-pointer"
                    >
                        <ArrowLeft className="w-4 h-4" /> Back to Home
                    </button>
                    <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
                        <div>
                            <p className="text-primary font-bold tracking-widest text-sm uppercase mb-4">Our Work</p>
                            <h1 className="text-5xl lg:text-6xl font-bold text-white tracking-tight mb-4">
                                Project <span className="text-primary">Gallery</span>
                            </h1>
                            <p className="text-slate-400 text-xl max-w-2xl leading-relaxed">
                                Browse completed projects — from commercial parking lots to residential driveways
                                across Pennsylvania and the East Coast.
                            </p>
                        </div>
                        <div className="flex items-center gap-3 text-slate-400 text-sm flex-shrink-0">
                            <Images className="w-5 h-5 text-primary" />
                            <span>{galleries.length} projects</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Category Filter */}
            <div className="sticky top-0 z-40 bg-dark/95 backdrop-blur-md border-b border-white/10">
                <div className="max-w-7xl mx-auto px-6 py-4 flex gap-3 overflow-x-auto">
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setActiveCategory(cat)}
                            className={`flex-shrink-0 px-5 py-2 rounded-full text-sm font-semibold transition-all cursor-pointer ${
                                activeCategory === cat
                                    ? 'bg-primary text-white'
                                    : 'bg-white/5 text-slate-300 hover:bg-white/10 border border-white/10'
                            }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </div>

            {/* Gallery Grid */}
            <section className="max-w-7xl mx-auto px-6 py-16">
                {filtered.length > 0 ? (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filtered.map((gallery, i) => (
                            <motion.div
                                key={gallery.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.08 }}
                                className="group bg-white/5 border border-white/10 rounded-3xl overflow-hidden cursor-pointer hover:border-primary/40 transition-all duration-300 hover:shadow-xl hover:shadow-primary/10"
                                onClick={() => onNavigateToDetail(gallery.id)}
                            >
                                {/* Cover Image */}
                                <div className="h-56 overflow-hidden relative">
                                    <img
                                        src={gallery.coverImage}
                                        alt={gallery.title}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                        loading="lazy"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-dark/70 to-transparent" />
                                    {/* Category badge */}
                                    <div className="absolute top-4 left-4">
                                        <span className="bg-primary text-white text-xs font-bold px-3 py-1.5 rounded-full">
                                            {gallery.category}
                                        </span>
                                    </div>
                                    {/* Photo count */}
                                    <div className="absolute top-4 right-4 flex items-center gap-1.5 bg-black/50 backdrop-blur-sm px-2.5 py-1.5 rounded-full">
                                        <Images className="w-3 h-3 text-white" />
                                        <span className="text-white text-xs font-medium">
                                            {gallery.images.length}
                                        </span>
                                    </div>
                                </div>

                                {/* Card Body */}
                                <div className="p-6">
                                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-primary transition-colors">
                                        {gallery.title}
                                    </h3>
                                    <div className="flex items-center gap-4 text-slate-400 text-sm mb-4">
                                        <span className="flex items-center gap-1.5">
                                            <MapPin className="w-3.5 h-3.5" />
                                            {gallery.location}
                                        </span>
                                        {gallery.completedYear && (
                                            <span className="flex items-center gap-1.5">
                                                <Calendar className="w-3.5 h-3.5" />
                                                {gallery.completedYear}
                                            </span>
                                        )}
                                    </div>
                                    {gallery.projectSize && (
                                        <p className="text-slate-500 text-sm mb-5">{gallery.projectSize}</p>
                                    )}
                                    <div className="flex items-center gap-2 text-primary font-semibold text-sm group-hover:gap-3 transition-all">
                                        View Gallery <ChevronRight className="w-4 h-4" />
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-24 text-slate-500">
                        <Images className="w-12 h-12 mx-auto mb-4 opacity-30" />
                        <p className="text-lg">No projects in this category yet.</p>
                    </div>
                )}
            </section>

            {/* CTA */}
            <section className="bg-dark-accent border-t border-white/10 py-20">
                <div className="max-w-2xl mx-auto px-6 text-center">
                    <h2 className="text-3xl font-bold text-white mb-4">
                        Ready to start your project?
                    </h2>
                    <p className="text-slate-400 mb-8 text-lg">
                        Contact us today for a free on-site estimate with no obligation.
                    </p>
                    <button onClick={onNavigateToContact} className="btn-primary py-4 px-8 text-lg">
                        Get a Free Estimate <ArrowRight className="w-5 h-5" />
                    </button>
                </div>
            </section>
        </div>
    );
};

export default GalleryCatalog;
