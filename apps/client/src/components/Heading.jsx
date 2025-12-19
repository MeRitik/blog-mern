import React from 'react'
import { useTheme } from '../context/ThemeContext';

function Heading() {
    const { isDark, toggleTheme } = useTheme();

    return (
        <header>
            <div className='flex px-10 py-4 space-x-8 items-center justify-between'>
                {/* Logo */}
                <span className='text-primary font-bold text-2xl font-sans flex items-center'>
                    BlogNest
                </span>

                {/* Navigation */}
                <nav>
                    <ul className='flex space-x-8 text-foreground'>
                        <li className='hover:text-primary transition-colors cursor-pointer'>Hotel</li>
                        <li className='hover:text-primary transition-colors cursor-pointer'>Flight</li>
                        <li className='hover:text-primary transition-colors cursor-pointer'>Train</li>
                        <li className='hover:text-primary transition-colors cursor-pointer'>Travel</li>
                        <li className='hover:text-primary transition-colors cursor-pointer'>Car Rental</li>
                    </ul>
                </nav>

                {/* Search */}
                <input
                    type="text"
                    placeholder='Search...'
                    className='border border-popover text-foreground placeholder:text-muted-foreground px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-ring transition-all'
                />

                {/* Auth Buttons */}
                <div className='flex space-x-4 items-center'>
                    {/* Theme Toggle */}
                    <button
                        onClick={toggleTheme}
                        className='text-foreground hover:text-primary transition-colors p-2'
                        aria-label='Toggle theme'
                    >
                        {isDark ? '☀️' : '🌙'}
                    </button>

                    {/* Login */}
                    <button className='text-foreground hover:text-primary transition-colors font-medium'>
                        Login
                    </button>

                    {/* Sign Up */}
                    <button className='bg-primary text-primary-foreground rounded-md px-4 py-2 font-medium hover:opacity-90 transition-opacity shadow-sm'>
                        Sign Up
                    </button>
                </div>
            </div>
        </header>
    )
}

export default Heading