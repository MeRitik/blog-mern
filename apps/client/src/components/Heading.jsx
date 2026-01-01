import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import { HiSun, HiMoon } from 'react-icons/hi';
import { HiOutlineMenu, HiOutlineX } from 'react-icons/hi';
import UserInfo from './UserInfo.jsx';

function Heading() {
    const { isAuthenticated, logout } = useAuth();
    const { isDark, toggleTheme } = useTheme();
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <header className='border-b border-border'>
            <div className='flex px-4 md:px-6 lg:px-10 py-3 items-center justify-between'>
                {/* Logo */}
                <button
                    className='text-primary font-bold text-xl md:text-2xl font-sans flex items-center cursor-pointer'
                    onClick={() => navigate('/')}
                >
                    TravelBuddy
                </button>

                {/* Desktop Navigation */}
                <nav className='hidden lg:flex items-center gap-6'>
                    <ul className='flex gap-6 text-foreground text-sm'>
                        <li className='hover:text-primary transition-colors cursor-pointer'>Hotel</li>
                        <li className='hover:text-primary transition-colors cursor-pointer'>Flight</li>
                        <li className='hover:text-primary transition-colors cursor-pointer'>Train</li>
                        <li className='hover:text-primary transition-colors cursor-pointer'>Travel</li>
                        <li className='hover:text-primary transition-colors cursor-pointer'>Car Rental</li>
                    </ul>
                </nav>

                {/* Search - Desktop only */}
                <input
                    type="text"
                    placeholder='Search...'
                    className='hidden lg:block w-64 border border-border text-foreground text-sm placeholder:text-muted-foreground px-3 py-1.5 rounded-md focus:outline-none focus:ring-2 focus:ring-primary transition-all'
                />

                {/* Desktop Actions */}
                <div className='hidden md:flex items-center gap-3'>
                    {/* Theme Toggle */}
                    <button
                        onClick={toggleTheme}
                        className='p-2 rounded-full hover:bg-accent transition-colors'
                        aria-label='Toggle theme'
                    >
                        {isDark ? <HiSun className='w-5 h-5 text-foreground' /> : <HiMoon className='w-5 h-5 text-foreground' />}
                    </button>

                    {!isAuthenticated && (
                        <>
                            <button
                                onClick={() => navigate('/login')}
                                className='text-foreground hover:text-primary transition-colors font-medium text-sm px-3 py-1.5'
                            >
                                Login
                            </button>
                            <button
                                onClick={() => navigate('/signup')}
                                className='bg-primary text-primary-foreground rounded-md px-4 py-1.5 font-medium hover:opacity-90 transition-opacity text-sm'
                            >
                                Sign Up
                            </button>
                        </>
                    )}

                    {isAuthenticated && (
                        <>
                            <UserInfo />
                            <button
                                onClick={logout}
                                className='bg-primary text-primary-foreground rounded-md px-4 py-1.5 font-medium hover:opacity-90 transition-opacity text-sm'
                            >
                                Logout
                            </button>
                        </>
                    )}
                </div>

                {/* Mobile Actions */}
                <div className='flex md:hidden items-center gap-2'>
                    {/* Theme Toggle - Mobile */}
                    <button
                        onClick={toggleTheme}
                        className='p-2 rounded-full hover:bg-accent transition-colors'
                        aria-label='Toggle theme'
                    >
                        {isDark ? <HiSun className='w-5 h-5 text-foreground' /> : <HiMoon className='w-5 h-5 text-foreground' />}
                    </button>

                    {/* Hamburger Menu */}
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className='p-2 rounded-md hover:bg-accent transition-colors'
                        aria-label='Toggle menu'
                    >
                        <div className='relative w-6 h-6'>
                            <HiOutlineMenu
                                className={`w-6 h-6 text-foreground absolute transition-all duration-300 ${isMenuOpen ? 'opacity-0 rotate-90' : 'opacity-100 rotate-0'
                                    }`}
                            />
                            <HiOutlineX
                                className={`w-6 h-6 text-foreground absolute transition-all duration-300 ${isMenuOpen ? 'opacity-100 rotate-0' : 'opacity-0 -rotate-90'
                                    }`}
                            />
                        </div>
                    </button>
                </div>
            </div>

            {/* Mobile Menu Dropdown */}
            <div
                className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${isMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
                    }`}
            >
                <div className='px-4 py-3 pb-6 space-y-3 border-t border-border bg-background/95 backdrop-blur-sm'>
                    {/* Search - Mobile */}
                    <input
                        type="text"
                        placeholder='Search...'
                        className='w-full border border-border text-foreground text-sm placeholder:text-muted-foreground px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-primary'
                    />

                    {/* Navigation Links */}
                    <div className='space-y-2'>
                        <div className='text-foreground hover:text-primary hover:bg-accent transition-colors cursor-pointer px-3 py-2 rounded-md text-sm'>
                            Hotel
                        </div>
                        <div className='text-foreground hover:text-primary hover:bg-accent transition-colors cursor-pointer px-3 py-2 rounded-md text-sm'>
                            Flight
                        </div>
                        <div className='text-foreground hover:text-primary hover:bg-accent transition-colors cursor-pointer px-3 py-2 rounded-md text-sm'>
                            Train
                        </div>
                        <div className='text-foreground hover:text-primary hover:bg-accent transition-colors cursor-pointer px-3 py-2 rounded-md text-sm'>
                            Travel
                        </div>
                        <div className='text-foreground hover:text-primary hover:bg-accent transition-colors cursor-pointer px-3 py-2 rounded-md text-sm'>
                            Car Rental
                        </div>
                    </div>

                    {/* Auth Buttons - Mobile */}
                    {!isAuthenticated && (
                        <div className='space-y-2 pt-2 border-t border-border'>
                            <button
                                onClick={() => {
                                    navigate('/login');
                                    setIsMenuOpen(false);
                                }}
                                className='w-full text-center text-foreground hover:text-primary hover:bg-accent transition-colors font-medium text-sm px-3 py-2 rounded-md'
                            >
                                Login
                            </button>
                            <button
                                onClick={() => {
                                    navigate('/signup');
                                    setIsMenuOpen(false);
                                }}
                                className='w-full bg-primary text-primary-foreground rounded-md px-4 py-2 font-medium hover:opacity-90 transition-opacity text-sm'
                            >
                                Sign Up
                            </button>
                        </div>
                    )}

                    {isAuthenticated && (
                        <div className='space-y-2 pt-2 border-t border-border'>
                            <div className='px-3 py-2'>
                                <UserInfo />
                            </div>
                            <button
                                onClick={() => {
                                    logout();
                                    setIsMenuOpen(false);
                                }}
                                className='w-full bg-primary text-primary-foreground rounded-md px-4 py-2 font-medium hover:opacity-90 transition-opacity text-sm'
                            >
                                Logout
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </header>
    )
}

export default Heading