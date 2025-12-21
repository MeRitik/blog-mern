import { useTheme } from '../context/ThemeContext';
import { useNavigate } from 'react-router-dom';

const BlogCard = ({
    id = 1,
    image = "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop",
    tag = "Destination",
    date = "30 Jan 2024",
    readTime = "10 mins read",
    title = "Unveiling the Secrets Beyond the Tourist Trails",
    description = "Dive into the local culture, discover hidden spots, and experience the authentic charm that often...",
    authorName = "Seraphina Isabella",
    authorImage = "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop"
}) => {
    const { isDark } = useTheme();
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/blog/${id}`);
    };

    return (
        <div className={isDark ? 'dark' : ''}>
            <div className="p-8 bg-background flex items-center justify-center transition-colors">
                <div className="w-full max-w-xs">
                    {/* Card Container */}
                    <div
                        className="bg-card border-2 border-border overflow-hidden cursor-pointer hover:translate-y-[-4px] transition-transform"
                        style={{ boxShadow: '6px 6px 0px 0px var(--shadow-color)' }}
                        onClick={handleClick}
                    >
                        {/* Image Container */}
                        <div className="relative h-36 overflow-hidden">
                            <img
                                src={image}
                                alt={title}
                                className="w-full h-full object-cover"
                            />
                            {/* Tag */}
                            <div className="absolute top-3 left-3">
                                <span className="bg-muted text-muted-foreground px-3 py-1.5 text-xs font-medium border-2 border-border" style={{ boxShadow: '2px 2px 0px 0px var(--shadow-color)' }}>
                                    {tag}
                                </span>
                            </div>
                        </div>

                        {/* Content */}
                        <div className="p-4 space-y-3">
                            {/* Meta Info */}
                            <div className="flex items-center gap-2 text-xs text-muted-foreground font-medium">
                                <span>{date}</span>
                                <span>•</span>
                                <span>{readTime}</span>
                            </div>

                            {/* Title */}
                            <h2 className="text-lg font-bold text-card-foreground leading-tight">
                                {title}
                            </h2>

                            {/* Description */}
                            <p className="text-sm text-muted-foreground leading-relaxed">
                                {description}
                            </p>

                            {/* Author */}
                            <div className="flex items-center gap-2 pt-1">
                                <div className="w-8 h-8 rounded-full bg-primary border-2 border-border overflow-hidden" style={{ boxShadow: '2px 2px 0px 0px var(--shadow-color)' }}>
                                    <img
                                        src={authorImage}
                                        alt={authorName}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <span className="text-sm font-medium text-card-foreground">{authorName}</span>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default BlogCard;