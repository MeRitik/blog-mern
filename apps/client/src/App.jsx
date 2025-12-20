import BlogCard from './components/BlogCard.jsx';
import Heading from './components/Heading.jsx';

// Constants
// const HERO_IMAGE_URL = 'https://images.unsplash.com/photo-1764377723685-31e60ed8e550?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwyN3x8fGVufDB8fHx8fA%3D%3D';

const CONTENT_DATA = {
  badge: 'Destination',
  title: 'Explore the World with Us',
  description: 'Discover breathtaking destinations, plan your perfect trip, and create unforgettable memories with our expert travel guides and tips.',
  meta: {
    author: 'Ritik Ranjan',
    date: '20 Dec 2025',
    readTime: '10 mins read',
    imageCredit: 'Image'
  }
};

// Component: Badge
function Badge({ text }) {
  return (
    <div className="px-2 py-1 w-fit rounded-lg bg-card/90 text-foreground mb-6 text-sm">
      {text}
    </div>
  );
}

// Component: Hero Content
function HeroContent() {
  return (
    <div>
      <h1 className="text-foreground text-5xl font-bold mb-2">
        {CONTENT_DATA.title}
      </h1>
      <p className="text-foreground text-sm max-w-xl">
        {CONTENT_DATA.description}
      </p>
    </div>
  );
}

// Component: Meta Info
function MetaInfo({ meta }) {
  return (
    <aside className="text-sm text-foreground" aria-label="Article metadata">
      <div className="flex space-x-4 mb-2">
        <span>{meta.imageCredit}</span>
        <span>{meta.author}</span>
      </div>
      <div className="flex space-x-4 mb-2">
        <time dateTime="2025-12-20">{meta.date}</time>
        <span>{meta.readTime}</span>
      </div>
    </aside>
  );
}

function BlogSection() {
  return (
    <div className="text-foreground w-full">
      <h2 className="font-bold text-2xl mb-4">Blog</h2>
      <p className="mb-6">Here, we share blogs and articles about technology, travel, food and much more.</p>

      {/* Categories */}
      <div className="flex justify-between items-center mb-6">
        <ul className="flex space-x-4 text-sm font-medium">
          <li className="rounded-lg bg-primary/60 px-4 py-2 cursor-pointer hover:bg-primary/80 transition-colors">All</li>
          <li className="rounded-lg bg-primary/60 px-4 py-2 cursor-pointer hover:bg-primary/80 transition-colors">Destination</li>
          <li className="rounded-lg bg-primary/60 px-4 py-2 cursor-pointer hover:bg-primary/80 transition-colors">Culinary</li>
          <li className="rounded-lg bg-primary/60 px-4 py-2 cursor-pointer hover:bg-primary/80 transition-colors">Lifestyle</li>
          <li className="rounded-lg bg-primary/60 px-4 py-2 cursor-pointer hover:bg-primary/80 transition-colors">Tips & Hacks</li>
        </ul>

        <div className="flex items-center gap-2 text-foreground rounded-md">
          <label htmlFor="sort-select" className="text-sm font-medium">Sort By</label>
          <select
            id="sort-select"
            className="bg-primary text-foreground px-3 py-1.5 rounded-md focus:outline-none text-sm"
          >
            <option>Latest</option>
            <option>Oldest</option>
            <option>Most Popular</option>
          </select>
        </div>
      </div>

      {/* Blog Cards Container */}
      <div className='grid grid-cols-4'>
        {[1, 2, 3, 4, 5, 6].map((_, index) => (
          <BlogCard key={index} />
        ))}
      </div>

      <div className="flex justify-center items-center gap-2 mt-12">
        <button className="px-4 py-2 rounded-lg bg-primary/60 hover:bg-primary/80 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed">
          Previous
        </button>
        <div className="flex gap-2">
          <button className="w-10 h-10 rounded-lg bg-primary text-primary-foreground font-medium">1</button>
          <button className="w-10 h-10 rounded-lg bg-primary/60 hover:bg-primary/80 transition-colors font-medium">2</button>
          <button className="w-10 h-10 rounded-lg bg-primary/60 hover:bg-primary/80 transition-colors font-medium">3</button>
        </div>
        <button className="px-4 py-2 rounded-lg bg-primary/60 hover:bg-primary/80 transition-colors font-medium">
          Next
        </button>
      </div>

    </div>
  );
}

import background from './assets/image/bg.jpg'
// Main App Component
export default function App() {
  const heroStyle = {
    backgroundImage: `url(${background})`
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
              <HeroContent />
              <MetaInfo meta={CONTENT_DATA.meta} />
            </div>
          </main>
        </div>
      </div>

      {/* Blog Section - Separate container with gap */}
      <div className="bg-background px-4 py-16">
        <div className="px-6">
          <BlogSection />
        </div>
      </div>
    </>
  );
}