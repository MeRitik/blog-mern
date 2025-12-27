import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Heading from '../components/Heading';
import Footer from '../components/Footer';
import { usePost } from '../context/PostContext';

export default function NewPost() {
    const navigate = useNavigate();
    const { createPost, generatePostWithAI, loading } = usePost();

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        tags: [],
        status: 'draft',
        content: [{ contentType: 'paragraph', content: '', order: 0 }]
    });

    const [useAI, setUseAI] = useState(false);
    const [aiPrompt, setAiPrompt] = useState('');
    const [tagInput, setTagInput] = useState('');

    const contentTypes = ['heading', 'subheading', 'paragraph', 'image', 'code', 'quote', 'list'];

    const suggestedTags = [
        'JavaScript', 'React', 'Node.js', 'TypeScript', 'Python',
        'Web Development', 'Frontend', 'Backend', 'AI', 'Machine Learning',
        'CSS', 'HTML', 'DevOps', 'Cloud', 'Database', 'API', 'Tutorial'
    ];

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleTagInput = (e) => {
        const value = e.target.value;
        if (e.key === 'Enter' && value.trim()) {
            e.preventDefault();
            addTag(value.trim());
        } else if (e.key === 'Backspace' && !value && formData.tags.length > 0) {
            removeTag(formData.tags.length - 1);
        }
    };

    const addTag = (tag) => {
        if (tag && !formData.tags.includes(tag) && formData.tags.length < 10) {
            setFormData(prev => ({ ...prev, tags: [...prev.tags, tag] }));
            setTagInput('');
        }
    };

    const removeTag = (index) => {
        setFormData(prev => ({
            ...prev,
            tags: prev.tags.filter((_, i) => i !== index)
        }));
    };

    const handleContentChange = (index, field, value) => {
        const newContent = [...formData.content];
        newContent[index] = { ...newContent[index], [field]: value };
        setFormData(prev => ({ ...prev, content: newContent }));
    };

    const addContentBlock = () => {
        setFormData(prev => ({
            ...prev,
            content: [...prev.content, { contentType: 'paragraph', content: '', order: prev.content.length }]
        }));
    };

    const removeContentBlock = (index) => {
        const newContent = formData.content.filter((_, i) => i !== index);
        const reorderedContent = newContent.map((block, i) => ({ ...block, order: i }));
        setFormData(prev => ({ ...prev, content: reorderedContent }));
    };

    const moveContentBlock = (index, direction) => {
        if ((direction === 'up' && index === 0) || (direction === 'down' && index === formData.content.length - 1)) return;

        const newContent = [...formData.content];
        const targetIndex = direction === 'up' ? index - 1 : index + 1;
        [newContent[index], newContent[targetIndex]] = [newContent[targetIndex], newContent[index]];
        const reorderedContent = newContent.map((block, i) => ({ ...block, order: i }));
        setFormData(prev => ({ ...prev, content: reorderedContent }));
    };

    const calculateReadTime = (content) => {
        const words = content.reduce((acc, block) => acc + block.content.split(' ').length, 0);
        return Math.max(1, Math.ceil(words / 200));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const postData = {
                ...formData,
                tags: formData.tags,
                readTime: calculateReadTime(formData.content),
                slug: formData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
            };

            await createPost(postData);
            navigate('/profile');
        } catch (error) {
            console.error('Error creating post:', error);
        }
    };

    const handleAIGenerate = async () => {
        if (!formData.title || !aiPrompt) {
            alert('Please provide both title and content description for AI generation');
            return;
        }

        try {
            const generatedPost = await generatePostWithAI(formData.title, aiPrompt);
            setFormData(prev => ({
                ...prev,
                description: generatedPost.description || prev.description,
                content: generatedPost.content || prev.content,
                tags: generatedPost.tags || prev.tags
            }));
            setUseAI(false);
        } catch (error) {
            console.error('Error generating post with AI:', error);
            alert('Failed to generate post with AI. Please try again.');
        }
    };

    return (
        <div className="min-h-screen bg-background">
            <Heading />

            <div className="max-w-5xl mx-auto px-6 py-12">
                {/* Header */}
                <div className="mb-12">
                    <h1 className="text-5xl font-bold text-foreground font-sans mb-3 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                        Create New Post
                    </h1>
                    <p className="text-lg text-muted-foreground">Share your thoughts with the world</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-8">
                    {/* Title */}
                    <div className="group">
                        <label className="block text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                            <span className="text-xl">📝</span>
                            Title <span className="text-primary">*</span>
                        </label>
                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            required
                            minLength={5}
                            maxLength={150}
                            placeholder="Enter an engaging title..."
                            className="w-full px-5 py-4 bg-card text-foreground border-2 border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all text-lg shadow-sm hover:shadow-md"
                        />
                    </div>

                    {/* Description */}
                    <div className="group">
                        <label className="block text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                            <span className="text-xl">📄</span>
                            Description <span className="text-primary">*</span>
                        </label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            required
                            minLength={10}
                            maxLength={300}
                            rows={4}
                            placeholder="Write a compelling description that captures your readers' attention..."
                            className="w-full px-5 py-4 bg-card text-foreground border-2 border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all resize-none shadow-sm hover:shadow-md"
                        />
                    </div>

                    {/* Modern Tags Section */}
                    <div className="group">
                        <label className="block text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                            <span className="text-xl">🏷️</span>
                            Tags
                            <span className="text-xs font-normal text-muted-foreground ml-2">
                                ({formData.tags.length}/10)
                            </span>
                        </label>

                        {/* Tag Input Area */}
                        <div className="bg-card border-2 border-border rounded-xl p-4 shadow-sm hover:shadow-md transition-all">
                            {/* Selected Tags */}
                            <div className="flex flex-wrap gap-2 mb-3 min-h-[40px]">
                                {formData.tags.map((tag, index) => (
                                    <span
                                        key={index}
                                        className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-full text-sm font-medium shadow-sm hover:shadow-md transition-all animate-in fade-in slide-in-from-bottom-1"
                                    >
                                        {tag}
                                        <button
                                            type="button"
                                            onClick={() => removeTag(index)}
                                            className="hover:bg-primary-foreground hover:text-primary rounded-full p-0.5 transition-colors"
                                        >
                                            ✕
                                        </button>
                                    </span>
                                ))}
                                <input
                                    type="text"
                                    value={tagInput}
                                    onChange={(e) => setTagInput(e.target.value)}
                                    onKeyDown={handleTagInput}
                                    placeholder={formData.tags.length === 0 ? "Type and press Enter to add tags..." : "Add more..."}
                                    disabled={formData.tags.length >= 10}
                                    className="flex-1 min-w-[200px] px-2 py-2 bg-transparent text-foreground focus:outline-none placeholder:text-muted-foreground disabled:opacity-50"
                                />
                            </div>

                            {/* Suggested Tags */}
                            <div className="pt-3 border-t border-border">
                                <p className="text-xs text-muted-foreground mb-2 font-medium">Quick add:</p>
                                <div className="flex flex-wrap gap-2">
                                    {suggestedTags
                                        .filter(tag => !formData.tags.includes(tag))
                                        .slice(0, 8)
                                        .map(tag => (
                                            <button
                                                key={tag}
                                                type="button"
                                                onClick={() => addTag(tag)}
                                                disabled={formData.tags.length >= 10}
                                                className="px-3 py-1.5 bg-secondary text-secondary-foreground rounded-full text-xs font-medium hover:bg-primary hover:text-primary-foreground transition-all disabled:opacity-30 disabled:cursor-not-allowed border border-border hover:border-primary"
                                            >
                                                + {tag}
                                            </button>
                                        ))}
                                </div>
                            </div>
                        </div>
                        <p className="text-xs text-muted-foreground mt-2 ml-1">Press Enter to add a tag, or click suggestions above</p>
                    </div>

                    {/* AI Generation Section */}
                    <div className="bg-gradient-to-br from-secondary to-card p-6 rounded-2xl border-2 border-border shadow-lg">
                        <div className="flex items-center justify-between mb-4">
                            <label className="text-base font-bold text-foreground flex items-center gap-2">
                                <span className="text-2xl">✨</span>
                                AI-Powered Content Generation
                            </label>
                            <button
                                type="button"
                                onClick={() => setUseAI(!useAI)}
                                className={`px-5 py-2.5 rounded-xl font-semibold transition-all shadow-md hover:shadow-lg transform hover:scale-105 ${useAI
                                    ? 'bg-primary text-primary-foreground'
                                    : 'bg-muted text-muted-foreground hover:bg-muted/80'
                                    }`}
                            >
                                {useAI ? '✓ Enabled' : 'Enable'}
                            </button>
                        </div>

                        {useAI && (
                            <div className="space-y-4 animate-in fade-in slide-in-from-top-2">
                                <textarea
                                    value={aiPrompt}
                                    onChange={(e) => setAiPrompt(e.target.value)}
                                    rows={4}
                                    placeholder="Describe your post idea in detail... For example: 'Write about best practices for React hooks with practical examples'"
                                    className="w-full px-5 py-4 bg-card text-foreground border-2 border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent transition-all resize-none shadow-sm"
                                />
                                <button
                                    type="button"
                                    onClick={handleAIGenerate}
                                    disabled={loading}
                                    className="w-full bg-gradient-to-r from-accent to-primary text-primary-foreground py-4 rounded-xl font-bold hover:opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-xl transform hover:scale-[1.02] flex items-center justify-center gap-2"
                                >
                                    {loading ? (
                                        <>
                                            <span className="animate-spin">⚙️</span>
                                            Generating Magic...
                                        </>
                                    ) : (
                                        <>
                                            <span>✨</span>
                                            Generate Content with AI
                                        </>
                                    )}
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Content Blocks */}
                    <div>
                        <div className="flex items-center justify-between mb-5">
                            <label className="block text-sm font-semibold text-foreground flex items-center gap-2">
                                <span className="text-xl">📝</span>
                                Content <span className="text-primary">*</span>
                            </label>
                            <button
                                type="button"
                                onClick={addContentBlock}
                                className="px-5 py-2.5 bg-primary text-primary-foreground rounded-xl font-semibold hover:opacity-90 transition-all shadow-md hover:shadow-lg transform hover:scale-105 flex items-center gap-2"
                            >
                                <span>✚</span> Add Block
                            </button>
                        </div>

                        <div className="space-y-5">
                            {formData.content.map((block, index) => (
                                <div key={index} className="bg-card border-2 border-border rounded-xl p-5 shadow-sm hover:shadow-md transition-all">
                                    <div className="flex items-start gap-4">
                                        {/* Move buttons */}
                                        <div className="flex flex-col gap-2">
                                            <button
                                                type="button"
                                                onClick={() => moveContentBlock(index, 'up')}
                                                disabled={index === 0}
                                                className="w-8 h-8 flex items-center justify-center text-lg bg-secondary text-muted-foreground hover:bg-primary hover:text-primary-foreground disabled:opacity-30 rounded-lg transition-all disabled:cursor-not-allowed"
                                                title="Move up"
                                            >
                                                ↑
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => moveContentBlock(index, 'down')}
                                                disabled={index === formData.content.length - 1}
                                                className="w-8 h-8 flex items-center justify-center text-lg bg-secondary text-muted-foreground hover:bg-primary hover:text-primary-foreground disabled:opacity-30 rounded-lg transition-all disabled:cursor-not-allowed"
                                                title="Move down"
                                            >
                                                ↓
                                            </button>
                                        </div>

                                        {/* Content */}
                                        <div className="flex-1 space-y-3">
                                            <select
                                                value={block.contentType}
                                                onChange={(e) => handleContentChange(index, 'contentType', e.target.value)}
                                                className="w-full px-4 py-2.5 bg-secondary text-foreground border-2 border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary font-medium"
                                            >
                                                {contentTypes.map(type => (
                                                    <option key={type} value={type}>
                                                        {type.charAt(0).toUpperCase() + type.slice(1)}
                                                    </option>
                                                ))}
                                            </select>

                                            <textarea
                                                value={block.content}
                                                onChange={(e) => handleContentChange(index, 'content', e.target.value)}
                                                required
                                                rows={block.contentType === 'heading' ? 2 : 5}
                                                placeholder={`Enter ${block.contentType} content...`}
                                                className="w-full px-4 py-3 bg-background text-foreground border-2 border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary transition-all resize-none"
                                            />
                                        </div>

                                        {/* Delete button */}
                                        <button
                                            type="button"
                                            onClick={() => removeContentBlock(index)}
                                            disabled={formData.content.length === 1}
                                            className="w-8 h-8 flex items-center justify-center text-lg bg-secondary text-destructive hover:bg-destructive hover:text-destructive-foreground rounded-lg transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                                            title="Delete block"
                                        >
                                            🗑️
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Status */}
                    <div className="bg-card border-2 border-border rounded-xl p-5 shadow-sm">
                        <label className="block text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
                            <span className="text-xl">📊</span>
                            Publication Status
                        </label>
                        <div className="flex gap-4">
                            <label className="flex-1 cursor-pointer">
                                <div className={`flex items-center gap-3 p-4 border-2 rounded-xl transition-all ${formData.status === 'draft'
                                    ? 'border-primary bg-primary/10 shadow-md'
                                    : 'border-border hover:border-muted-foreground/50'
                                    }`}>
                                    <input
                                        type="radio"
                                        name="status"
                                        value="draft"
                                        checked={formData.status === 'draft'}
                                        onChange={handleChange}
                                        className="w-5 h-5 text-primary focus:ring-primary"
                                    />
                                    <div>
                                        <div className="font-semibold text-foreground">📝 Draft</div>
                                        <div className="text-xs text-muted-foreground">Save for later</div>
                                    </div>
                                </div>
                            </label>
                            <label className="flex-1 cursor-pointer">
                                <div className={`flex items-center gap-3 p-4 border-2 rounded-xl transition-all ${formData.status === 'published'
                                    ? 'border-primary bg-primary/10 shadow-md'
                                    : 'border-border hover:border-muted-foreground/50'
                                    }`}>
                                    <input
                                        type="radio"
                                        name="status"
                                        value="published"
                                        checked={formData.status === 'published'}
                                        onChange={handleChange}
                                        className="w-5 h-5 text-primary focus:ring-primary"
                                    />
                                    <div>
                                        <div className="font-semibold text-foreground">🚀 Publish</div>
                                        <div className="text-xs text-muted-foreground">Share with world</div>
                                    </div>
                                </div>
                            </label>
                        </div>
                    </div>

                    {/* Submit Buttons */}
                    <div className="flex gap-4 pt-8 border-t border-border">
                        <button
                            type="button"
                            onClick={() => navigate('/profile')}
                            className="flex-1 px-6 py-4 bg-secondary text-secondary-foreground rounded-xl font-bold hover:bg-secondary/80 transition-all border-2 border-border shadow-sm hover:shadow-md transform hover:scale-[1.02]"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            className="flex-1 px-6 py-4 bg-gradient-to-r from-primary to-accent text-primary-foreground rounded-xl font-bold hover:opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-xl transform hover:scale-[1.02] flex items-center justify-center gap-2"
                        >
                            {loading ? (
                                <>
                                    <span className="animate-spin">⏳</span>
                                    Creating...
                                </>
                            ) : (
                                <>
                                    <span>🚀</span>
                                    Create Post
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </div>

            <Footer />
        </div>
    );
}
