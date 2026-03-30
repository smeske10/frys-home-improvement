import { motion } from 'motion/react';
import { ArrowRight, CheckCircle2, Hammer, Wrench, Bath, Home, Layers } from 'lucide-react';
import config from '../siteConfig';

interface Props {
    onNavigateToContact: () => void;
    onNavigateHome: () => void;
}

const serviceIcons = [Wrench, Bath, Home, Layers];

const AboutUs = ({ onNavigateToContact, onNavigateHome }: Props) => {
    const about = config.about;
    if (!about) return null;

    const introParagraphs = about.intro.split('\n\n');

    return (
        <div className="min-h-screen bg-dark">

            {/* Header */}
            <section className="bg-dark-accent border-b border-white/10 pt-32 pb-16">
                <div className="max-w-4xl mx-auto px-6 text-center">
                    <span className="inline-block bg-primary/15 text-primary text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-widest mb-6">
                        Who We Are
                    </span>
                    <h1 className="text-4xl lg:text-5xl font-bold text-white tracking-tight mb-6">
                        {about.headline}
                    </h1>
                </div>
            </section>

            {/* Intro */}
            <section className="py-20">
                <div className="max-w-3xl mx-auto px-6">
                    {introParagraphs.map((para, i) => (
                        <motion.p
                            key={i}
                            initial={{ opacity: 0, y: 16 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="text-slate-300 text-lg leading-relaxed mb-6"
                        >
                            {para}
                        </motion.p>
                    ))}
                </div>
            </section>

            {/* Service Highlights */}
            <section className="py-16 bg-dark-accent border-y border-white/10">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-12">
                        <h2 className="text-primary font-bold tracking-widest text-xs uppercase mb-3">What We Do</h2>
                        <h3 className="text-3xl font-bold text-white tracking-tight">Our Services</h3>
                    </div>
                    <div className="grid md:grid-cols-2 gap-6">
                        {about.serviceHighlights.map((s, i) => {
                            const Icon = serviceIcons[i] ?? Hammer;
                            return (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.1 }}
                                    className="bg-white/5 border border-white/10 rounded-3xl p-8 flex gap-5"
                                >
                                    <div className="w-11 h-11 rounded-xl bg-primary/15 flex items-center justify-center flex-shrink-0 mt-1">
                                        <Icon className="w-5 h-5 text-primary" />
                                    </div>
                                    <div>
                                        <h4 className="text-white font-bold text-lg mb-2">{s.title}</h4>
                                        <p className="text-slate-400 leading-relaxed">{s.desc}</p>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Why Us */}
            <section className="py-20">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid lg:grid-cols-2 gap-16 items-start">
                        <div>
                            <h2 className="text-primary font-bold tracking-widest text-xs uppercase mb-4">Why Choose Us</h2>
                            <h3 className="text-3xl font-bold text-white tracking-tight mb-8">
                                Why Homeowners Choose Us
                            </h3>
                            <ul className="space-y-4">
                                {about.whyUs.map((item, i) => (
                                    <motion.li
                                        key={i}
                                        initial={{ opacity: 0, x: -16 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: i * 0.08 }}
                                        className="flex items-start gap-3 text-slate-300 text-lg"
                                    >
                                        <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                                        <span>{item}</span>
                                    </motion.li>
                                ))}
                            </ul>
                        </div>

                        <div className="bg-white/5 border border-white/10 rounded-3xl p-8">
                            <h3 className="text-white font-bold text-xl mb-4">Our Commitment</h3>
                            <p className="text-slate-300 text-lg leading-relaxed">{about.commitment}</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="bg-dark-accent border-t border-white/10 py-20">
                <div className="max-w-2xl mx-auto px-6 text-center">
                    <h2 className="text-3xl font-bold text-white mb-4">{about.ctaHeading}</h2>
                    <p className="text-slate-400 text-lg mb-8">{about.ctaBody}</p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button onClick={onNavigateToContact} className="btn-primary py-4 px-8 text-lg">
                            Get a Free Estimate <ArrowRight className="w-5 h-5" />
                        </button>
                        <button onClick={onNavigateHome} className="btn-outline py-4 px-8 text-lg">
                            View Our Work
                        </button>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default AboutUs;
