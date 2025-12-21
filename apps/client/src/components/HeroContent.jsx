function HeroContent({ title, description }) {
    return (
        <div className='text-shadow-xs text-shadow-background text-[#f2e9e4]'>
            <h1 className=" text-5xl font-bold mb-2">
                {title}
            </h1>
            <p className=" text-md max-w-xl">
                {description}
            </p>
        </div>
    );
}

export default HeroContent;