import { useParams, useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import Heading from '../components/Heading';
import Footer from '../components/Footer';

const BlogDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { isDark } = useTheme();

    // Mock blog data - replace with API call later
    const blogData = {
        id: id,
        image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=600&fit=crop",
        tag: "Destination",
        date: "30 Jan 2024",
        readTime: "10 mins read",
        title: "Unveiling the Secrets Beyond the Tourist Trails",
        author: {
            name: "Seraphina Isabella",
            image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
            bio: "Travel enthusiast and storyteller, exploring the world one adventure at a time."
        },
        content: [
            {
                type: "paragraph",
                text: "Traveling is more than just visiting landmarks and ticking off bucket list items. It's about immersing yourself in the culture, connecting with locals, and discovering those hidden gems that guidebooks often miss. In this article, we'll take you beyond the typical tourist trails and show you how to experience destinations like a true local."
            },
            {
                type: "heading",
                text: "The Art of Wandering"
            },
            {
                type: "paragraph",
                text: "One of the best ways to discover a place is to simply wander. Leave your map behind (or at least don't rely on it too heavily) and let your curiosity guide you. Take that narrow alleyway, peek into that local market, or strike up a conversation with a street vendor. These spontaneous moments often lead to the most memorable experiences."
            },
            {
                type: "paragraph",
                text: "When you wander without a strict itinerary, you open yourself up to serendipity. You might stumble upon a charming café tucked away in a quiet corner, a local artisan's workshop, or a neighborhood festival that's not advertised to tourists. These are the moments that define authentic travel."
            },
            {
                type: "heading",
                text: "Embrace Local Cuisine"
            },
            {
                type: "paragraph",
                text: "Food is a window into a culture's soul. Skip the tourist restaurants and head where the locals eat. Look for places with no English menus, where families gather, and where the air is thick with the aromas of home-cooked meals. Don't be afraid to try dishes you can't pronounce – some of the best meals come from taking culinary risks."
            },
            {
                type: "paragraph",
                text: "Visit local markets early in the morning when they're bustling with activity. Chat with vendors, sample fresh produce, and observe how locals shop for their daily meals. Consider taking a cooking class to learn how to prepare traditional dishes – it's a skill you can take home and share with others."
            },
            {
                type: "heading",
                text: "Connect with Locals"
            },
            {
                type: "paragraph",
                text: "The best travel stories often involve the people you meet along the way. Be open to conversations, ask for recommendations, and show genuine interest in people's lives and stories. Many locals are proud of their hometown and eager to share their favorite spots with curious travelers."
            },
            {
                type: "paragraph",
                text: "Consider using platforms that connect travelers with locals for unique experiences – whether it's a home-cooked meal, a guided tour by a resident, or simply meeting up for coffee. These connections add depth to your travels and provide perspectives you'd never get from traditional tourism."
            },
            {
                type: "heading",
                text: "Travel Slowly"
            },
            {
                type: "paragraph",
                text: "Resist the urge to see everything in a short time. Slow travel allows you to develop a rhythm with a place, to notice subtle details, and to feel less like a tourist and more like a temporary resident. Spend extra days in smaller towns, rent an apartment instead of staying in hotels, and create a routine that includes morning coffee at the same café."
            },
            {
                type: "paragraph",
                text: "When you travel slowly, you'll discover that places reveal themselves layer by layer. What seemed ordinary on day one becomes meaningful by day five. You'll start recognizing faces, learning shortcuts, and understanding the local pace of life."
            },
            {
                type: "heading",
                text: "Final Thoughts"
            },
            {
                type: "paragraph",
                text: "The most rewarding travel experiences happen when you venture beyond the well-trodden path. It requires curiosity, openness, and a willingness to embrace the unexpected. So on your next adventure, dare to get lost, say yes to invitations, and remember that the best stories often begin where the guidebook ends."
            }
        ]
    };

    return (
        <div className={isDark ? 'dark' : ''}>
            <div className="min-h-screen bg-background text-foreground transition-colors">
                <Heading />

                {/* Back Button */}
                <div className="max-w-4xl mx-auto px-6 py-6">
                    <button
                        onClick={() => navigate('/')}
                        className="flex items-center gap-2 text-foreground hover:text-primary transition-colors font-medium border-2 border-border px-4 py-2 bg-card"
                        style={{ boxShadow: '4px 4px 0px 0px var(--shadow-color)' }}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={2}
                            stroke="currentColor"
                            className="w-5 h-5"
                        >
                            <path strokeLinecap="square" strokeLinejoin="miter" d="M15.75 19.5L8.25 12l7.5-7.5" />
                        </svg>
                        Back to Blogs
                    </button>
                </div>

                {/* Hero Image */}
                <div className="max-w-4xl mx-auto px-6 mb-8">
                    <div className="relative h-96 border-2 border-border overflow-hidden" style={{ boxShadow: '8px 8px 0px 0px var(--shadow-color)' }}>
                        <img
                            src={blogData.image}
                            alt={blogData.title}
                            className="w-full h-full object-cover"
                        />
                        {/* Tag Overlay */}
                        <div className="absolute top-6 left-6">
                            <span className="bg-muted text-muted-foreground px-4 py-2 text-sm font-bold border-2 border-border" style={{ boxShadow: '4px 4px 0px 0px var(--shadow-color)' }}>
                                {blogData.tag}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Article Content */}
                <article className="max-w-4xl mx-auto px-6 pb-16">
                    {/* Article Header */}
                    <header className="mb-8 pb-6 border-b-2 border-border">
                        <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                            {blogData.title}
                        </h1>

                        {/* Meta Information */}
                        <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-6">
                            <time dateTime="2024-01-30">{blogData.date}</time>
                            <span>•</span>
                            <span>{blogData.readTime}</span>
                        </div>

                        {/* Author Info */}
                        <div className="flex items-center gap-4 p-4 bg-card border-2 border-border" style={{ boxShadow: '4px 4px 0px 0px var(--shadow-color)' }}>
                            <div className="w-16 h-16 rounded-full bg-primary border-2 border-border overflow-hidden flex-shrink-0" style={{ boxShadow: '3px 3px 0px 0px var(--shadow-color)' }}>
                                <img
                                    src={blogData.author.image}
                                    alt={blogData.author.name}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div>
                                <p className="font-bold text-card-foreground">{blogData.author.name}</p>
                                <p className="text-sm text-muted-foreground">{blogData.author.bio}</p>
                            </div>
                        </div>
                    </header>

                    {/* Article Body */}
                    <div className="prose prose-lg max-w-none">
                        {blogData.content.map((section, index) => {
                            if (section.type === 'heading') {
                                return (
                                    <h2 key={index} className="text-2xl font-bold mt-8 mb-4 text-foreground">
                                        {section.text}
                                    </h2>
                                );
                            }
                            return (
                                <p key={index} className="mb-4 leading-relaxed text-foreground">
                                    {section.text}
                                </p>
                            );
                        })}
                    </div>

                    {/* Share Section */}
                    <div className="mt-12 pt-8 border-t-2 border-border">
                        <h3 className="text-xl font-bold mb-4">Share this article</h3>
                        <div className="flex gap-3">
                            <button className="px-6 py-3 bg-primary text-primary-foreground font-medium border-2 border-border hover:translate-y-[-2px] transition-transform" style={{ boxShadow: '4px 4px 0px 0px var(--shadow-color)' }}>
                                Twitter
                            </button>
                            <button className="px-6 py-3 bg-accent text-accent-foreground font-medium border-2 border-border hover:translate-y-[-2px] transition-transform" style={{ boxShadow: '4px 4px 0px 0px var(--shadow-color)' }}>
                                Facebook
                            </button>
                            <button className="px-6 py-3 bg-secondary text-secondary-foreground font-medium border-2 border-border hover:translate-y-[-2px] transition-transform" style={{ boxShadow: '4px 4px 0px 0px var(--shadow-color)' }}>
                                LinkedIn
                            </button>
                        </div>
                    </div>

                    {/* Related Posts */}
                    <div className="mt-12 pt-8 border-t-2 border-border">
                        <h3 className="text-2xl font-bold mb-6">Related Articles</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {[1, 2].map((item) => (
                                <div
                                    key={item}
                                    className="bg-card border-2 border-border overflow-hidden cursor-pointer hover:translate-y-[-4px] transition-transform"
                                    style={{ boxShadow: '6px 6px 0px 0px var(--shadow-color)' }}
                                    onClick={() => navigate(`/blog/${item}`)}
                                >
                                    <div className="h-40 bg-muted"></div>
                                    <div className="p-4">
                                        <span className="text-xs font-medium text-muted-foreground">Destination</span>
                                        <h4 className="text-lg font-bold mt-2 mb-2 text-card-foreground">
                                            Another Amazing Destination
                                        </h4>
                                        <p className="text-sm text-muted-foreground">
                                            Discover more incredible places to visit...
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </article>

                <Footer />
            </div>
        </div>
    );
};

export default BlogDetail;
