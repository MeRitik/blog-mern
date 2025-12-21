function Badge({ text }) {
    return (
        <div className="px-2 py-1 w-fit rounded-lg bg-secondary/30 text-foreground mb-2 text-sm">
            {text}
        </div>
    );
}

export default Badge;