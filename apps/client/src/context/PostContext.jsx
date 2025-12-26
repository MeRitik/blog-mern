import axios from "axios";
import {
    createContext,
    useCallback,
    useContext,
    useState
} from "react";

const VITE_BASE_URL = import.meta.env.VITE_BASE_URL || 'http://localhost:8080';

const api = axios.create({
    baseURL: `${VITE_BASE_URL}/api`,
    headers: {
        'Content-Type': 'application/json',
    },
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

const PostContext = createContext(null);

export const PostProvider = ({ children }) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Get all posts with optional filters
    const getPosts = useCallback(async (filters = {}) => {
        setLoading(true);
        setError(null);
        try {
            const params = new URLSearchParams();
            if (filters.author) params.append('author', filters.author);
            if (filters.status) params.append('status', filters.status);
            if (filters.tags) params.append('tags', filters.tags);
            if (filters.search) params.append('search', filters.search);

            const { data } = await api.get(`/posts?${params.toString()}`);
            return data;
        } catch (err) {
            setError(err.response?.data?.message || err.message);
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    // Get single post by ID
    const getPostById = useCallback(async (id) => {
        setLoading(true);
        setError(null);
        try {
            const { data } = await api.get(`/posts/${id}`);
            return data;
        } catch (err) {
            setError(err.response?.data?.message || err.message);
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    // Get post by slug
    const getPostBySlug = useCallback(async (slug) => {
        setLoading(true);
        setError(null);
        try {
            const { data } = await api.get(`/posts/slug/${slug}`);
            return data;
        } catch (err) {
            setError(err.response?.data?.message || err.message);
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    // Create new post
    const createPost = useCallback(async (postData) => {
        setLoading(true);
        setError(null);
        try {
            const { data } = await api.post('/posts', postData);
            return data;
        } catch (err) {
            setError(err.response?.data?.message || err.message);
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    // Update post
    const updatePost = useCallback(async (id, postData) => {
        setLoading(true);
        setError(null);
        try {
            const { data } = await api.put(`/posts/${id}`, postData);
            return data;
        } catch (err) {
            setError(err.response?.data?.message || err.message);
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    // Delete post
    const deletePost = useCallback(async (id) => {
        setLoading(true);
        setError(null);
        try {
            const { data } = await api.delete(`/posts/${id}`);
            return data;
        } catch (err) {
            setError(err.response?.data?.message || err.message);
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    // Get user profile
    const getUserProfile = useCallback(async (username) => {
        setLoading(true);
        setError(null);
        try {
            const { data } = await api.get(`/users/${username || 'me'}`);
            return data;
        } catch (err) {
            setError(err.response?.data?.message || err.message);
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    // Get user's posts
    const getUserPosts = useCallback(async (userId) => {
        setLoading(true);
        setError(null);
        try {
            const { data } = await api.get(`/posts?author=${userId}`);
            return data;
        } catch (err) {
            setError(err.response?.data?.message || err.message);
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    // Increment post views
    const incrementViews = useCallback(async (id) => {
        try {
            const { data } = await api.patch(`/posts/${id}/views`);
            return data;
        } catch (err) {
            // Silently fail for view increments
            console.error('Failed to increment views:', err);
        }
    }, []);

    return (
        <PostContext.Provider value={{
            loading,
            error,
            getPosts,
            getPostById,
            getPostBySlug,
            createPost,
            updatePost,
            deletePost,
            getUserProfile,
            getUserPosts,
            incrementViews
        }}>
            {children}
        </PostContext.Provider>
    );
};

export const usePost = () => {
    const context = useContext(PostContext);
    if (!context) {
        throw new Error("usePost must be used within a PostProvider");
    }
    return context;
};
