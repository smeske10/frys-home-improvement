import { ArrowLeft } from 'lucide-react';
import config from '../siteConfig';

const businessName = `${config.business.nameLine1} ${config.business.nameLine2}`;
const phone = config.contact.phone;
const email = config.contact.email;
const effectiveDate = 'April 9, 2026';

interface Props {
    onNavigateHome: () => void;
}

export default function TermsOfService({ onNavigateHome }: Props) {
    return (
        <div className="min-h-screen bg-dark text-white">

            {/* Header */}
            <section className="bg-dark-accent border-b border-white/10 pt-32 pb-16">
                <div className="max-w-3xl mx-auto px-6">
                    <button
                        onClick={onNavigateHome}
                        className="flex items-center gap-2 text-slate-400 hover:text-white text-sm mb-8 transition-colors cursor-pointer"
                    >
                        <ArrowLeft className="w-4 h-4" /> Back to Home
                    </button>
                    <span className="inline-block bg-primary/15 text-primary text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-widest mb-6">
                        Legal
                    </span>
                    <h1 className="text-4xl lg:text-5xl font-bold text-white tracking-tight mb-4">
                        Terms of Service
                    </h1>
                    <p className="text-slate-400 text-sm">Effective Date: {effectiveDate}</p>
                </div>
            </section>

            {/* Content */}
            <section className="py-20">
                <div className="max-w-3xl mx-auto px-6 space-y-12 text-slate-300 leading-relaxed">

                    <div>
                        <h2 className="text-xl font-bold text-white mb-3">1. Acceptance of Terms</h2>
                        <p>
                            By accessing or using the {businessName} website, you agree to be bound by these Terms of Service.
                            If you do not agree, please do not use this website.
                        </p>
                    </div>

                    <div>
                        <h2 className="text-xl font-bold text-white mb-3">2. Services</h2>
                        <p>
                            {businessName} provides residential remodeling and home improvement services, including but not
                            limited to kitchen remodeling, bathroom renovations, and exterior projects.
                        </p>
                        <p className="mt-3">
                            Information provided on this website is for general informational purposes and does not constitute
                            a binding agreement unless confirmed in writing.
                        </p>
                    </div>

                    <div>
                        <h2 className="text-xl font-bold text-white mb-3">3. Estimates & Quotes</h2>
                        <ul className="list-disc list-inside space-y-2 text-slate-300">
                            <li>Requests submitted through the website are for free estimates only</li>
                            <li>Estimates are non-binding and subject to change after in-person evaluation</li>
                            <li>Final pricing will be provided in a formal agreement before work begins</li>
                        </ul>
                    </div>

                    <div>
                        <h2 className="text-xl font-bold text-white mb-3">4. User Responsibilities</h2>
                        <p>By submitting a form or contacting us, you agree to:</p>
                        <ul className="list-disc list-inside space-y-2 mt-3 text-slate-300">
                            <li>Provide accurate and truthful information</li>
                            <li>Not use the site for spam, abuse, or unlawful purposes</li>
                            <li>Not attempt to interfere with site functionality</li>
                        </ul>
                    </div>

                    <div>
                        <h2 className="text-xl font-bold text-white mb-3">5. Intellectual Property</h2>
                        <p>
                            All content on this website (text, images, branding, layout) is the property of {businessName} and
                            may not be copied, distributed, or reused without permission.
                        </p>
                    </div>

                    <div>
                        <h2 className="text-xl font-bold text-white mb-3">6. Limitation of Liability</h2>
                        <p>{businessName} is not liable for:</p>
                        <ul className="list-disc list-inside space-y-2 mt-3 text-slate-300">
                            <li>Any damages resulting from use of this website</li>
                            <li>Inaccuracies or omissions in website content</li>
                            <li>Temporary interruptions or technical issues</li>
                        </ul>
                    </div>

                    <div>
                        <h2 className="text-xl font-bold text-white mb-3">7. Third-Party Tools</h2>
                        <p>
                            This website may use third-party services (e.g., analytics tools) that operate independently.
                            {businessName} is not responsible for how these services handle data.
                        </p>
                    </div>

                    <div>
                        <h2 className="text-xl font-bold text-white mb-3">8. Changes to Terms</h2>
                        <p>
                            We reserve the right to update these Terms at any time. Continued use of the website constitutes
                            acceptance of updated terms.
                        </p>
                    </div>

                    <div>
                        <h2 className="text-xl font-bold text-white mb-3">9. Contact Information</h2>
                        <p>For questions regarding these Terms:</p>
                        <div className="mt-3 space-y-1">
                            <p className="font-semibold text-white">{businessName}</p>
                            <p>{phone}</p>
                            {email && <p>{email}</p>}
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
