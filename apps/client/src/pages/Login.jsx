import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import Heading from '../components/Heading';
import Footer from '../components/Footer';
import { useAuth } from '../context/AuthContext';

const Login = () => {
    const { isDark } = useTheme();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [rememberMe, setRememberMe] = useState(false);
    const { login, user } = useAuth();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const { email, password } = formData;
        login(email, password).then(() => {
            navigate(`/profile/${user.username}`);
        });
    };

    return (
        <div className={isDark ? 'dark' : ''}>
            <div className="min-h-screen bg-background text-foreground transition-colors flex flex-col">
                <Heading />

                <div className="flex-grow flex items-center justify-center px-6 py-12">
                    <div className="w-full max-w-md">
                        {/* Login Card */}
                        <div className="bg-card border-2 border-border p-8" style={{ boxShadow: '8px 8px 0px 0px var(--shadow-color)' }}>
                            {/* Header */}
                            <div className="text-center mb-8">
                                <h1 className="text-4xl font-bold text-card-foreground mb-2">Welcome Back</h1>
                                <p className="text-muted-foreground">Login to your account to continue</p>
                            </div>

                            {/* Form */}
                            <form onSubmit={handleSubmit} className="space-y-6">
                                {/* Email Field */}
                                <div>
                                    <label htmlFor="email" className="block text-sm font-bold text-card-foreground mb-2">
                                        Email Address
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-3 bg-background text-foreground border-2 border-border focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                                        style={{ boxShadow: '4px 4px 0px 0px var(--shadow-color)' }}
                                        placeholder="you@example.com"
                                    />
                                </div>

                                {/* Password Field */}
                                <div>
                                    <label htmlFor="password" className="block text-sm font-bold text-card-foreground mb-2">
                                        Password
                                    </label>
                                    <input
                                        type="password"
                                        id="password"
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-3 bg-background text-foreground border-2 border-border focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                                        style={{ boxShadow: '4px 4px 0px 0px var(--shadow-color)' }}
                                        placeholder="Enter your password"
                                    />
                                </div>

                                {/* Remember Me & Forgot Password */}
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center">
                                        <input
                                            type="checkbox"
                                            id="remember"
                                            checked={rememberMe}
                                            onChange={(e) => setRememberMe(e.target.checked)}
                                            className="w-4 h-4 border-2 border-border bg-background cursor-pointer"
                                        />
                                        <label htmlFor="remember" className="ml-2 text-sm text-card-foreground cursor-pointer">
                                            Remember me
                                        </label>
                                    </div>
                                    <button
                                        type="button"
                                        className="text-sm text-primary hover:underline font-medium"
                                    >
                                        Forgot Password?
                                    </button>
                                </div>

                                {/* Submit Button */}
                                <button
                                    type="submit"
                                    className="w-full bg-primary text-primary-foreground py-3 font-bold border-2 border-border hover:translate-y-[-2px] transition-transform"
                                    style={{ boxShadow: '4px 4px 0px 0px var(--shadow-color)' }}
                                >
                                    Login
                                </button>

                                {/* Divider */}
                                <div className="relative my-6">
                                    <div className="absolute inset-0 flex items-center">
                                        <div className="w-full border-t-2 border-border"></div>
                                    </div>
                                    <div className="relative flex justify-center text-sm">
                                        <span className="px-4 bg-card text-muted-foreground font-medium">OR</span>
                                    </div>
                                </div>

                                {/* Social Login Buttons */}
                                <div className="space-y-3">
                                    <button
                                        type="button"
                                        className="w-full bg-background text-card-foreground py-3 font-medium border-2 border-border hover:translate-y-[-2px] transition-transform flex items-center justify-center gap-3"
                                        style={{ boxShadow: '4px 4px 0px 0px var(--shadow-color)' }}
                                    >
                                        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                                            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                                            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                                            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                                        </svg>
                                        Continue with Google
                                    </button>

                                    <button
                                        type="button"
                                        className="w-full bg-background text-card-foreground py-3 font-medium border-2 border-border hover:translate-y-[-2px] transition-transform flex items-center justify-center gap-3"
                                        style={{ boxShadow: '4px 4px 0px 0px var(--shadow-color)' }}
                                    >
                                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
                                        </svg>
                                        Continue with GitHub
                                    </button>
                                </div>
                            </form>

                            {/* Sign Up Link */}
                            <div className="mt-6 text-center">
                                <p className="text-sm text-muted-foreground">
                                    Don't have an account?{' '}
                                    <Link to="/signup" className="text-primary hover:underline font-bold">
                                        Sign up
                                    </Link>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <Footer />
            </div>
        </div>
    );
};

export default Login;
