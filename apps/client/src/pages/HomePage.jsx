import Footer from '../components/Footer';
import MetaInfo from '../components/MetaInfo';
import HeroContent from '../components/HeroContent';
import Badge from '../components/Badge.jsx';
import BlogSection from '../components/BlogSection.jsx'
import Heading from '../components/Heading';
import background from '../assets/image/bg.jpg';

// Constants
const HERO_IMAGE_URL = 'https://images.unsplash.com/photo-1764377723685-31e60ed8e550?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwyN3x8fGVufDB8fHx8fA%3D%3D';

const CONTENT_DATA = {
    badge: 'Destination',
    title: 'Explore the World with Us',
    description: 'Discover breathtaking destinations, plan your perfect trip, and create unforgettable memories with our expert travel guides and tips.',
    meta: {
        author: 'Ritik Ranjan',
        date: '20 Dec 2025',
        readTime: '10 mins read',
        imageCredit: HERO_IMAGE_URL,
    }
};

function HomePage() {
    const heroStyle = {
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${background})`,
    };

    return (
        <>
            {/* Hero Section */}
            <div
                className="h-[80vh] bg-cover bg-center bg-fixed"
                style={heroStyle}
                role="img"
                aria-label="Hero background image"
            >
                <div className="px-4">
                    <Heading />

                    <main className="px-6 py-20 pt-[40vh]">
                        <Badge text={CONTENT_DATA.badge} />

                        <div className="flex flex-row max-w-full justify-between items-start gap-8">
                            <HeroContent title={CONTENT_DATA.title} description={CONTENT_DATA.description} />
                            <MetaInfo meta={CONTENT_DATA.meta} />
                        </div>
                    </main>
                </div>
            </div>

            {/* Blog Section - Separate container with gap */}
            <div className="bg-background px-4 py-16 border-t-4 border-border">
                <div className="px-6">
                    <BlogSection />
                </div>
            </div>

            {/* Footer */}
            <Footer />
        </>
    );
}

export default HomePage;