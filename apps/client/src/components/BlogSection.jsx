import BlogCard from './BlogCard.jsx';

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
                        className="bg-primary text-foreground px-3 py-1.5 focus:outline-none text-sm "
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

export default BlogSection;