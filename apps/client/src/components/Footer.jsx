import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

export default function Footer() {
    const currentYear = new Date().getFullYear();
    const [email, setEmail] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubscribe = async (e) => {
        e.preventDefault();

        if (!email) {
            toast.error('Please enter your email address');
            return;
        }

        setIsSubmitting(true);

        try {
            const { data } = await axios.post('http://localhost:8080/api/subscribe', {
                email
            });

            if (data.success) {
                toast.success(data.message);
                setEmail('');
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            const errorMessage = error.response?.data?.message || 'Failed to subscribe. Please try again later.';
            toast.error(errorMessage);
            console.error('Subscription error:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <footer className="bg-background border-t-4 border-border">
            <div className="px-10 py-12">
                {/* Main Footer Content */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
                    {/* Brand Section */}
                    <div className="md:col-span-1">
                        <h3 className="text-foreground font-bold text-2xl mb-4">Blog.</h3>
                        <p className="text-foreground/80 text-sm mb-4">
                            Discover stories, thinking, and expertise from writers on any topic.
                        </p>
                        {/* Social Links */}
                        <div className="flex gap-3">
                            <a
                                href="#"
                                className="w-10 h-10 bg-blue-500 border-2 border-border flex items-center justify-center hover:bg-blue-500/80 transition-colors"
                                style={{ boxShadow: '3px 3px 0px 0px var(--shadow-color)' }}
                                aria-label="Twitter"
                            >
                                <svg className="w-5 h-5 text-primary-foreground" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                                </svg>
                            </a>
                            <a
                                href="#"
                                className="w-10 h-10 bg-blue-600 border-2 border-border flex items-center justify-center hover:bg-blue-600/80 transition-colors"
                                style={{ boxShadow: '3px 3px 0px 0px var(--shadow-color)' }}
                                aria-label="LinkedIn"
                            >
                                <svg className="w-5 h-5 text-accent-foreground" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                                </svg>
                            </a>
                            <a
                                href="#"
                                className="w-10 h-10 bg-gray-800 border-2 border-border flex items-center justify-center hover:bg-gray-800/80 transition-colors"
                                style={{ boxShadow: '3px 3px 0px 0px var(--shadow-color)' }}
                                aria-label="GitHub"
                            >
                                <svg className="w-5 h-5 text-secondary-foreground" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                                </svg>
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-foreground font-bold text-lg mb-4">Quick Links</h4>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <a href="#" className="text-foreground/80 hover:text-primary transition-colors">Home</a>
                            </li>
                            <li>
                                <a href="#" className="text-foreground/80 hover:text-primary transition-colors">About Us</a>
                            </li>
                            <li>
                                <a href="#" className="text-foreground/80 hover:text-primary transition-colors">Blog</a>
                            </li>
                            <li>
                                <a href="#" className="text-foreground/80 hover:text-primary transition-colors">Contact</a>
                            </li>
                            <li>
                                <a href="#" className="text-foreground/80 hover:text-primary transition-colors">Advertise</a>
                            </li>
                        </ul>
                    </div>

                    {/* Categories */}
                    <div>
                        <h4 className="text-foreground font-bold text-lg mb-4">Categories</h4>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <a href="#" className="text-foreground/80 hover:text-primary transition-colors">Destination</a>
                            </li>
                            <li>
                                <a href="#" className="text-foreground/80 hover:text-primary transition-colors">Culinary</a>
                            </li>
                            <li>
                                <a href="#" className="text-foreground/80 hover:text-primary transition-colors">Lifestyle</a>
                            </li>
                            <li>
                                <a href="#" className="text-foreground/80 hover:text-primary transition-colors">Tips & Hacks</a>
                            </li>
                            <li>
                                <a href="#" className="text-foreground/80 hover:text-primary transition-colors">Technology</a>
                            </li>
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div>
                        <h4 className="text-foreground font-bold text-lg mb-4">Newsletter</h4>
                        <p className="text-foreground/80 text-sm mb-4">
                            Subscribe to get the latest articles and updates.
                        </p>
                        <form onSubmit={handleSubscribe} className="space-y-3">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                disabled={isSubmitting}
                                className="w-full px-4 py-2 border-2 border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed"
                                style={{ boxShadow: '3px 3px 0px 0px var(--shadow-color)' }}
                            />
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full px-4 py-2 bg-primary text-primary-foreground border-2 border-border font-medium hover:bg-primary/80 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                style={{ boxShadow: '3px 3px 0px 0px var(--shadow-color)' }}
                            >
                                {isSubmitting ? 'Subscribing...' : 'Subscribe'}
                            </button>
                        </form>
                    </div>
                </div>

                {/* Bottom Footer */}
                <div className="pt-8 border-t-2 border-border">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        <p className="text-foreground/80 text-sm">
                            © {currentYear} Blog. All rights reserved.
                        </p>
                        <div className="flex gap-6 text-sm">
                            <a href="#" className="text-foreground/80 hover:text-primary transition-colors">
                                Privacy Policy
                            </a>
                            <a href="#" className="text-foreground/80 hover:text-primary transition-colors">
                                Terms of Service
                            </a>
                            <a href="#" className="text-foreground/80 hover:text-primary transition-colors">
                                Cookie Policy
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
