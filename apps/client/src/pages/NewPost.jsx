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
        tags: '',
        status: 'draft',
        content: [{ contentType: 'paragraph', content: '', order: 0 }]
    });

    const [useAI, setUseAI] = useState(false);
    const [aiPrompt, setAiPrompt] = useState('');

    const contentTypes = ['heading', 'subheading', 'paragraph', 'image', 'code', 'quote', 'list'];

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
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
                tags: formData.tags.split(',').map(tag => tag.trim()).filter(Boolean),
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
                tags: generatedPost.tags ? generatedPost.tags.join(', ') : prev.tags
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
                <div className="mb-8">
                    <h1 className="text-4xl font-bold text-foreground font-sans mb-2">Create New Post</h1>
                    <p className="text-muted-foreground">Share your thoughts with the world</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Title */}
                    <div>
                        <label className="block text-sm font-semibold text-foreground mb-2">
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
                            placeholder="Enter your post title..."
                            className="w-full px-4 py-3 bg-card text-foreground border-2 border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                        />
                    </div>

                    {/* Description */}
                    <div>
                        <label className="block text-sm font-semibold text-foreground mb-2">
                            Description <span className="text-primary">*</span>
                        </label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            required
                            minLength={10}
                            maxLength={300}
                            rows={3}
                            placeholder="Brief description of your post..."
                            className="w-full px-4 py-3 bg-card text-foreground border-2 border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-all resize-none"
                        />
                    </div>

                    {/* Tags */}
                    <div>
                        <label className="block text-sm font-semibold text-foreground mb-2">
                            Tags
                        </label>
                        <input
                            type="text"
                            name="tags"
                            value={formData.tags}
                            onChange={handleChange}
                            placeholder="react, javascript, web development (comma separated)"
                            className="w-full px-4 py-3 bg-card text-foreground border-2 border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                        />
                    </div>

                    {/* AI Generation Toggle */}
                    <div className="bg-secondary p-4 rounded-lg border-2 border-border">
                        <div className="flex items-center justify-between mb-3">
                            <label className="text-sm font-semibold text-foreground">
                                ✨ Generate with AI
                            </label>
                            <button
                                type="button"
                                onClick={() => setUseAI(!useAI)}
                                className={`px-4 py-2 rounded-lg font-medium transition-all ${useAI
                                        ? 'bg-primary text-primary-foreground'
                                        : 'bg-muted text-muted-foreground'
                                    }`}
                            >
                                {useAI ? 'Enabled' : 'Disabled'}
                            </button>
                        </div>

                        {useAI && (
                            <div className="space-y-3">
                                <textarea
                                    value={aiPrompt}
                                    onChange={(e) => setAiPrompt(e.target.value)}
                                    rows={3}
                                    placeholder="Describe what you want to write about..."
                                    className="w-full px-4 py-3 bg-card text-foreground border-2 border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-all resize-none"
                                />
                                <button
                                    type="button"
                                    onClick={handleAIGenerate}
                                    disabled={loading}
                                    className="w-full bg-accent text-accent-foreground py-3 rounded-lg font-semibold hover:opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {loading ? 'Generating...' : '✨ Generate Content'}
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Content Blocks */}
                    <div>
                        <div className="flex items-center justify-between mb-4">
                            <label className="block text-sm font-semibold text-foreground">
                                Content <span className="text-primary">*</span>
                            </label>
                            <button
                                type="button"
                                onClick={addContentBlock}
                                className="px-4 py-2 bg-primary text-primary-foreground rounded-lg font-medium hover:opacity-90 transition-all"
                            >
                                + Add Block
                            </button>
                        </div>

                        <div className="space-y-4">
                            {formData.content.map((block, index) => (
                                <div key={index} className="bg-card border-2 border-border rounded-lg p-4">
                                    <div className="flex items-start gap-4">
                                        {/* Move buttons */}
                                        <div className="flex flex-col gap-1">
                                            <button
                                                type="button"
                                                onClick={() => moveContentBlock(index, 'up')}
                                                disabled={index === 0}
                                                className="p-2 text-muted-foreground hover:text-foreground disabled:opacity-30 transition-colors"
                                            >
                                                ↑
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => moveContentBlock(index, 'down')}
                                                disabled={index === formData.content.length - 1}
                                                className="p-2 text-muted-foreground hover:text-foreground disabled:opacity-30 transition-colors"
                                            >
                                                ↓
                                            </button>
                                        </div>

                                        {/* Content */}
                                        <div className="flex-1 space-y-3">
                                            <select
                                                value={block.contentType}
                                                onChange={(e) => handleContentChange(index, 'contentType', e.target.value)}
                                                className="w-full px-3 py-2 bg-secondary text-foreground border-2 border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
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
                                                rows={block.contentType === 'heading' ? 1 : 4}
                                                placeholder={`Enter ${block.contentType} content...`}
                                                className="w-full px-4 py-3 bg-background text-foreground border-2 border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-all resize-none"
                                            />
                                        </div>

                                        {/* Delete button */}
                                        <button
                                            type="button"
                                            onClick={() => removeContentBlock(index)}
                                            disabled={formData.content.length === 1}
                                            className="p-2 text-destructive hover:bg-destructive hover:text-destructive-foreground rounded-lg transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                                        >
                                            🗑️
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Status */}
                    <div>
                        <label className="block text-sm font-semibold text-foreground mb-2">
                            Status
                        </label>
                        <div className="flex gap-4">
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input
                                    type="radio"
                                    name="status"
                                    value="draft"
                                    checked={formData.status === 'draft'}
                                    onChange={handleChange}
                                    className="w-4 h-4 text-primary focus:ring-primary"
                                />
                                <span className="text-foreground">Draft</span>
                            </label>
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input
                                    type="radio"
                                    name="status"
                                    value="published"
                                    checked={formData.status === 'published'}
                                    onChange={handleChange}
                                    className="w-4 h-4 text-primary focus:ring-primary"
                                />
                                <span className="text-foreground">Published</span>
                            </label>
                        </div>
                    </div>

                    {/* Submit Buttons */}
                    <div className="flex gap-4 pt-6">
                        <button
                            type="button"
                            onClick={() => navigate('/profile')}
                            className="flex-1 px-6 py-3 bg-secondary text-secondary-foreground rounded-lg font-semibold hover:opacity-90 transition-all border-2 border-border"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            className="flex-1 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? 'Creating...' : 'Create Post'}
                        </button>
                    </div>
                </form>
            </div>

            <Footer />
        </div>
    );
}
