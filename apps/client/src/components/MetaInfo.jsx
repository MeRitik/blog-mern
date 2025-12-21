// Component: Meta Info
function MetaInfo({ meta }) {
    return (
        <aside className="flex items-center gap-3 text-sm text-[#f2e9e4]" aria-label="Article metadata">
            <img
                src={meta.imageCredit}
                alt={meta.author}
                className='w-12 h-12 rounded-full object-cover border-2 border-primary/30' style={{ boxShadow: '2px 2px 0px 0px var(--shadow-color)' }}
            />
            <div className="flex flex-col gap-1">
                <span className="font-semibold">{meta.author}</span>
                <div className="flex items-center gap-2 text-xs opacity-80">
                    <time dateTime="2025-12-20">{meta.date}</time>
                    <span>•</span>
                    <span>{meta.readTime}</span>
                </div>
            </div>
        </aside>
    );
}

export default MetaInfo;