import { ArrowLeft } from 'lucide-react';
import config from '../siteConfig';

const businessName = `${config.business.nameLine1} ${config.business.nameLine2}`;
const phone = config.contact.phone;
const email = config.contact.email;
const effectiveDate = 'April 9, 2026';

interface Props {
    onNavigateHome: () => void;
}

export default function PrivacyPolicy({ onNavigateHome }: Props) {
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
                        Privacy Policy
                    </h1>
                    <p className="text-slate-400 text-sm">Effective Date: {effectiveDate}</p>
                </div>
            </section>

            {/* Content */}
            <section className="py-20">
                <div className="max-w-3xl mx-auto px-6 space-y-12 text-slate-300 leading-relaxed">

                    <div>
                        <h2 className="text-xl font-bold text-white mb-3">1. Information We Collect</h2>
                        <h3 className="text-base font-semibold text-slate-200 mb-2">Personal Information</h3>
                        <p>When you submit a form (e.g., request a free estimate), we may collect:</p>
                        <ul className="list-disc list-inside space-y-2 mt-3 text-slate-300">
                            <li>Name</li>
                            <li>Phone number</li>
                            <li>Email address</li>
                            <li>Project details or message content</li>
                        </ul>
                        <h3 className="text-base font-semibold text-slate-200 mt-6 mb-2">Automatically Collected Data</h3>
                        <p>We may collect limited technical data through cookies, including:</p>
                        <ul className="list-disc list-inside space-y-2 mt-3 text-slate-300">
                            <li>Browser type</li>
                            <li>Device type</li>
                            <li>Pages visited</li>
                            <li>Interaction data</li>
                        </ul>
                    </div>

                    <div>
                        <h2 className="text-xl font-bold text-white mb-3">2. How We Use Your Information</h2>
                        <p>We use collected information to:</p>
                        <ul className="list-disc list-inside space-y-2 mt-3 text-slate-300">
                            <li>Respond to inquiries and provide estimates</li>
                            <li>Communicate about services</li>
                            <li>Improve website performance and user experience</li>
                            <li>Follow up on service requests</li>
                        </ul>
                        <p className="mt-4">
                            We do not sell, rent, or share your personal information with third parties for marketing purposes.
                        </p>
                    </div>

                    <div>
                        <h2 className="text-xl font-bold text-white mb-3">3. Cookies & Tracking Technologies</h2>
                        <p>This website uses cookies and tracking tools (such as Google Tag Manager) to:</p>
                        <ul className="list-disc list-inside space-y-2 mt-3 text-slate-300">
                            <li>Analyze website traffic</li>
                            <li>Improve performance and usability</li>
                            <li>Measure marketing effectiveness</li>
                        </ul>
                        <p className="mt-4">You can disable cookies in your browser settings if preferred.</p>
                    </div>

                    <div>
                        <h2 className="text-xl font-bold text-white mb-3">4. Data Sharing</h2>
                        <p>We do not sell your data.</p>
                        <p className="mt-3">We may share limited information only when necessary to:</p>
                        <ul className="list-disc list-inside space-y-2 mt-3 text-slate-300">
                            <li>Operate essential website tools (analytics, hosting, forms)</li>
                            <li>Comply with legal obligations</li>
                        </ul>
                    </div>

                    <div>
                        <h2 className="text-xl font-bold text-white mb-3">5. Data Security</h2>
                        <p>
                            We take reasonable measures to protect your information from unauthorized access, misuse, or
                            disclosure. However, no system is 100% secure.
                        </p>
                    </div>

                    <div>
                        <h2 className="text-xl font-bold text-white mb-3">6. Your Rights</h2>
                        <p>You may:</p>
                        <ul className="list-disc list-inside space-y-2 mt-3 text-slate-300">
                            <li>Request access to your data</li>
                            <li>Request correction or deletion of your information</li>
                            <li>Opt out of communications at any time</li>
                        </ul>
                        <p className="mt-4">To make a request, contact us using the information below.</p>
                    </div>

                    <div>
                        <h2 className="text-xl font-bold text-white mb-3">7. Third-Party Services</h2>
                        <p>
                            Our website may use third-party tools (e.g., analytics providers). These services may collect
                            data in accordance with their own privacy policies.
                        </p>
                    </div>

                    <div>
                        <h2 className="text-xl font-bold text-white mb-3">8. Children's Privacy</h2>
                        <p>
                            This website is not intended for individuals under the age of 13. We do not knowingly collect
                            data from children.
                        </p>
                    </div>

                    <div>
                        <h2 className="text-xl font-bold text-white mb-3">9. Updates to This Policy</h2>
                        <p>
                            We may update this Privacy Policy periodically. Updates will be posted on this page with a
                            revised effective date.
                        </p>
                    </div>

                    <div>
                        <h2 className="text-xl font-bold text-white mb-3">10. Contact Information</h2>
                        <p>For privacy-related questions or requests:</p>
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
