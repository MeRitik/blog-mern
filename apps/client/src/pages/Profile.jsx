import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BlogCard from '../components/BlogCard';
import Footer from '../components/Footer';
import Heading from '../components/Heading';

export default function Profile() {
    const navigate = useNavigate();
    // Hardcoded user data
    const [user] = useState({
        id: '1',
        username: 'johndoe',
        email: 'john.doe@example.com',
        bio: 'Full-stack developer passionate about React and Node.js. Writing about web development, best practices, and new technologies.',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop',
        isVerified: true,
        role: 'Author',
        createdAt: '2024-01-15T10:00:00Z',
        lastLogin: '2024-12-20T15:30:00Z'
    });

    // Hardcoded posts data
    const [posts] = useState([
        {
            id: '1',
            title: 'Getting Started with React Hooks',
            description: 'A comprehensive guide to understanding and using React Hooks in your applications.',
            image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=400&fit=crop',
            category: 'React',
            tags: ['React', 'JavaScript', 'Hooks'],
            author: { username: 'johndoe', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop' },
            views: 1250,
            status: 'published',
            createdAt: '2024-11-10T10:00:00Z',
            readTime: 8
        },
        {
            id: '2',
            title: 'Building RESTful APIs with Node.js',
            description: 'Learn how to create scalable and secure REST APIs using Node.js and Express.',
            image: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=800&h=400&fit=crop',
            category: 'Node.js',
            tags: ['Node.js', 'Express', 'API'],
            author: { username: 'johndoe', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop' },
            views: 980,
            status: 'published',
            createdAt: '2024-10-25T14:30:00Z',
            readTime: 10
        },
        {
            id: '3',
            title: 'Understanding JavaScript Closures',
            description: 'Deep dive into JavaScript closures and how they work under the hood.',
            image: 'https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?w=800&h=400&fit=crop',
            category: 'JavaScript',
            tags: ['JavaScript', 'Closures', 'Functions'],
            author: { username: 'johndoe', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop' },
            views: 756,
            status: 'published',
            createdAt: '2024-09-15T09:00:00Z',
            readTime: 6
        },
        {
            id: '4',
            title: 'Modern CSS Grid Layouts',
            description: 'Master CSS Grid and create responsive layouts with ease.',
            image: 'https://images.unsplash.com/photo-1507721999472-8ed4421c4af2?w=800&h=400&fit=crop',
            category: 'CSS',
            tags: ['CSS', 'Grid', 'Layout'],
            author: { username: 'johndoe', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop' },
            views: 634,
            status: 'published',
            createdAt: '2024-08-20T11:15:00Z',
            readTime: 7
        },
        {
            id: '5',
            title: 'Upcoming: TypeScript Best Practices',
            description: 'A comprehensive guide to writing clean and maintainable TypeScript code.',
            image: 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=800&h=400&fit=crop',
            category: 'TypeScript',
            tags: ['TypeScript', 'JavaScript', 'Best Practices'],
            author: { username: 'johndoe', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop' },
            views: 0,
            status: 'draft',
            createdAt: '2024-12-01T16:45:00Z',
            readTime: 12
        }
    ]);

    const [activeTab, setActiveTab] = useState('posts');

    const formatDate = (date) => {
        return new Date(date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    const totalViews = posts.reduce((acc, post) => acc + post.views, 0);
    const publishedPosts = posts.filter(post => post.status === 'published').length;
    const draftPosts = posts.filter(post => post.status === 'draft').length;

    return (
        <div className="min-h-screen bg-background">
            <Heading />

            {/* Minimal Profile Header */}
            <div className="bg-card border-b max-w-7xl mx-auto border-border">
                <div className="max-w-7xl mx-auto px-6 py-12">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-6">
                            {/* Avatar */}
                            {user.avatar ? (
                                <img
                                    src={user.avatar}
                                    alt={user.username}
                                    className="w-28 h-28 rounded-full object-cover border-4 border-primary shadow-lg"
                                />
                            ) : (
                                <div className="w-28 h-28 rounded-full bg-primary flex items-center justify-center border-4 border-primary shadow-lg">
                                    <span className="text-primary-foreground text-3xl font-bold">
                                        {user.username.charAt(0).toUpperCase()}
                                    </span>
                                </div>
                            )}

                            {/* Basic Info */}
                            <div>
                                <div className="flex items-center gap-3 mb-2">
                                    <h1 className="text-3xl font-bold text-foreground font-sans">
                                        {user.username}
                                    </h1>
                                    {user.isVerified && (
                                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary border border-primary/20">
                                            ✓ Verified
                                        </span>
                                    )}
                                </div>
                                {user.bio && (
                                    <p className="text-muted-foreground max-w-2xl">
                                        {user.bio}
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* Animated Create Post Button */}
                        <button
                            onClick={() => navigate('/new-post')}
                            className="group relative px-6 py-3 bg-primary text-primary-foreground rounded-full font-semibold overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-lg hover:ring-4 hover:ring-primary/30"
                        >
                            <span className="relative z-10 flex items-center gap-2">
                                <svg
                                    className="w-5 h-5 transition-transform group-hover:rotate-90 duration-300"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                </svg>
                                Create Post
                            </span>
                            <div className="absolute inset-0 bg-accent transform scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100 rounded-full"></div>
                        </button>
                    </div>
                </div>
            </div>

            {/* Tabs */}
            <div className="max-w-7xl mx-auto px-6 mt-8">
                <div className="border-b border-border">
                    <nav className="flex gap-8">
                        <button
                            onClick={() => setActiveTab('posts')}
                            className={`pb-4 px-1 border-b-2 font-medium text-sm transition-colors ${activeTab === 'posts'
                                ? 'border-primary text-primary'
                                : 'border-transparent text-muted-foreground hover:text-foreground'
                                }`}
                        >
                            Posts ({posts.length})
                        </button>
                        <button
                            onClick={() => setActiveTab('about')}
                            className={`pb-4 px-1 border-b-2 font-medium text-sm transition-colors ${activeTab === 'about'
                                ? 'border-primary text-primary'
                                : 'border-transparent text-muted-foreground hover:text-foreground'
                                }`}
                        >
                            About
                        </button>
                    </nav>
                </div>

                {/* Tab Content */}
                <div className="py-8 pb-16">
                    {activeTab === 'posts' && (
                        <div>
                            {posts.length === 0 ? (
                                <div className="text-center py-16 bg-card rounded-lg border border-border">
                                    <div className="text-muted-foreground text-5xl mb-4">📝</div>
                                    <h3 className="text-lg font-medium text-foreground mb-2">
                                        No posts yet
                                    </h3>
                                    <p className="text-muted-foreground">
                                        This user hasn't published any posts yet.
                                    </p>
                                </div>
                            ) : (
                                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                                    {posts.map((post) => (
                                        <BlogCard key={post.id} post={post} />
                                    ))}
                                </div>
                            )}
                        </div>
                    )}

                    {activeTab === 'about' && (
                        <div className="max-w-3xl">
                            <div className="bg-card rounded-lg border border-border p-8 shadow-sm">
                                <h2 className="text-2xl font-bold text-foreground mb-6 font-sans">
                                    About {user.username}
                                </h2>

                                <div className="space-y-6">
                                    {/* Profile Stats Grid */}
                                    <div className="grid grid-cols-2 gap-4 p-4 bg-secondary rounded-lg">
                                        <div className="text-center">
                                            <p className="text-3xl font-bold text-primary font-sans">{posts.length}</p>
                                            <p className="text-sm text-muted-foreground mt-1">Total Posts</p>
                                        </div>
                                        <div className="text-center">
                                            <p className="text-3xl font-bold text-primary font-sans">{totalViews.toLocaleString()}</p>
                                            <p className="text-sm text-muted-foreground mt-1">Total Views</p>
                                        </div>
                                        <div className="text-center">
                                            <p className="text-3xl font-bold text-accent font-sans">{publishedPosts}</p>
                                            <p className="text-sm text-muted-foreground mt-1">Published</p>
                                        </div>
                                        <div className="text-center">
                                            <p className="text-3xl font-bold text-accent font-sans">{draftPosts}</p>
                                            <p className="text-sm text-muted-foreground mt-1">Drafts</p>
                                        </div>
                                    </div>

                                    <div className="h-px bg-border"></div>

                                    {/* User Details */}
                                    <div className="space-y-4">
                                        <div>
                                            <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                                                Email Address
                                            </h3>
                                            <p className="text-foreground">{user.email}</p>
                                        </div>

                                        {user.bio && (
                                            <div>
                                                <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                                                    Bio
                                                </h3>
                                                <p className="text-foreground leading-relaxed">{user.bio}</p>
                                            </div>
                                        )}

                                        <div>
                                            <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                                                Role
                                            </h3>
                                            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-accent/20 text-accent-foreground border border-accent/30">
                                                {user.role}
                                            </span>
                                        </div>

                                        <div>
                                            <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                                                Account Status
                                            </h3>
                                            <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${user.isVerified
                                                ? 'bg-primary/10 text-primary border border-primary/20'
                                                : 'bg-muted text-muted-foreground border border-border'
                                                }`}>
                                                {user.isVerified ? '✓ Verified Account' : 'Unverified Account'}
                                            </span>
                                        </div>

                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                                                    Member Since
                                                </h3>
                                                <p className="text-foreground">{formatDate(user.createdAt)}</p>
                                            </div>

                                            {user.lastLogin && (
                                                <div>
                                                    <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                                                        Last Active
                                                    </h3>
                                                    <p className="text-foreground">{formatDate(user.lastLogin)}</p>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <Footer />
        </div>
    );
}
