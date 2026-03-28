import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, ChevronRight, Phone } from 'lucide-react';
import { SERVICES, LIFESTYLE_PILLARS, PROCESS_STEPS } from '../constants';
import config from '../siteConfig';

interface ServiceDetailProps {
  serviceId: string;
  onNavigateToContact: () => void;
  onNavigateToService: (serviceId: string) => void;
  onNavigateHome: () => void;
}

const ServiceDetail = ({ serviceId, onNavigateToContact, onNavigateToService, onNavigateHome }: ServiceDetailProps) => {
  const service = SERVICES.find(s => s.id === serviceId);
  const otherServices = SERVICES.filter(s => s.id !== serviceId);

  if (!service) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-dark text-white">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Service not found</h2>
          <button onClick={onNavigateHome} className="btn-primary cursor-pointer">Go Home</button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="relative min-h-[60vh] flex items-center pt-24 pb-20 overflow-hidden bg-dark">
        <div className="absolute inset-0 z-0">
          <img
            src={service.image}
            alt={service.title}
            className="w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-dark via-dark/70 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-dark via-transparent to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-slate-400 text-sm mb-8" aria-label="Breadcrumb">
            <button onClick={onNavigateHome} className="hover:text-primary transition-colors cursor-pointer">
              Home
            </button>
            <ChevronRight className="w-4 h-4" />
            <span className="text-white font-medium">{service.title}</span>
          </nav>

          <div className="flex flex-col lg:flex-row items-start gap-8">
            <div className="w-20 h-20 rounded-3xl bg-primary/20 border border-primary/30 flex items-center justify-center flex-shrink-0">
              <service.icon className="w-10 h-10 text-primary" aria-hidden="true" />
            </div>
            <div>
              <h1 className="text-5xl lg:text-6xl font-bold text-white mb-6 tracking-tight leading-[1.1]">
                {service.title}
              </h1>
              <p className="text-xl text-slate-300 max-w-2xl leading-relaxed mb-8">
                {service.desc}
              </p>
              <div className="flex flex-wrap gap-4">
                <button
                  onClick={onNavigateToContact}
                  className="btn-primary py-4 px-8 text-lg cursor-pointer"
                >
                  Get a Free Quote <ArrowRight className="w-5 h-5" aria-hidden="true" />
                </button>
                <a
                  href={`tel:${config.contact.phone}`}
                  className="btn-outline py-4 px-8 text-lg"
                >
                  <Phone className="w-5 h-5" aria-hidden="true" /> {config.contact.phone}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="section-padding bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-primary font-bold tracking-widest text-sm uppercase mb-4">
              {config.sectionHeaders.lifestyleLabel}
            </h2>
            <h3 className="text-4xl lg:text-5xl font-bold text-slate-900 tracking-tight">
              {config.sectionHeaders.lifestyleTitle}
            </h3>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {LIFESTYLE_PILLARS.map((pillar, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center p-8 rounded-3xl bg-white border border-slate-100 shadow-sm"
              >
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mx-auto mb-5">
                  <pillar.icon className="w-7 h-7" aria-hidden="true" />
                </div>
                <h4 className="text-lg font-bold text-slate-900 mb-2">{pillar.title}</h4>
                <p className="text-slate-600 text-sm leading-relaxed">{pillar.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
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
            <button
              onClick={onNavigateToContact}
              className="btn-primary py-4 px-8 text-lg cursor-pointer"
            >
              Schedule Your Free Estimate <ArrowRight className="w-5 h-5" aria-hidden="true" />
            </button>
          </div>
        </div>
      </section>

      {/* Other Services */}
      {otherServices.length > 0 && (
        <section className="section-padding bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-primary font-bold tracking-widest text-sm uppercase mb-4">More Services</h2>
              <h3 className="text-4xl font-bold text-slate-900 tracking-tight">
                Explore our other services
              </h3>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {otherServices.slice(0, 6).map((s, i) => (
                <motion.div
                  key={s.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="group bg-slate-50 rounded-3xl overflow-hidden border border-slate-200 hover:shadow-lg transition-all duration-300 cursor-pointer"
                  onClick={() => onNavigateToService(s.id)}
                >
                  <div className="h-48 overflow-hidden">
                    <img
                      src={s.image}
                      alt={s.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      loading="lazy"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                        <s.icon className="w-5 h-5" aria-hidden="true" />
                      </div>
                      <h4 className="text-lg font-bold text-slate-900">{s.title}</h4>
                    </div>
                    <p className="text-slate-600 text-sm leading-relaxed mb-4 line-clamp-2">{s.desc}</p>
                    <span className="inline-flex items-center gap-2 text-primary font-bold text-sm group-hover:gap-3 transition-all">
                      Learn More <ChevronRight className="w-4 h-4" aria-hidden="true" />
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="section-padding bg-primary">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-4xl lg:text-5xl font-bold text-dark mb-6 tracking-tight">
            Ready to get started?
          </h2>
          <p className="text-dark/70 text-lg mb-10">
            Contact us today for a free estimate on your {service.title.toLowerCase()} project.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <button
              onClick={onNavigateToContact}
              className="bg-dark text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-dark/90 transition-colors flex items-center gap-2 cursor-pointer"
            >
              Get a Free Quote <ArrowRight className="w-5 h-5" />
            </button>
            <a
              href={`tel:${config.contact.phone}`}
              className="bg-white/20 text-dark px-8 py-4 rounded-full font-bold text-lg hover:bg-white/30 transition-colors flex items-center gap-2"
            >
              <Phone className="w-5 h-5" /> {config.contact.phone}
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ServiceDetail;
