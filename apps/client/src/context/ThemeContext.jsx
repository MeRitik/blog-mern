import { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
    const [isDark, setIsDark] = useState(() => {
        const savedTheme = localStorage.getItem("theme");
        return savedTheme === 'dark';
    });

    useEffect(() => {
        localStorage.setItem("theme", isDark ? 'dark' : 'light');
    }, [isDark]);

    const toggleTheme = () => setIsDark(prevTheme => !prevTheme);

    return (
        <ThemeContext.Provider value={{
            isDark,
            setIsDark,
            toggleTheme
        }}>
            <div className={isDark ? 'dark' : 'light'}>
                {children}
            </div>
        </ThemeContext.Provider>
    )
}

export function useTheme() {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error("useTheme must be used within a ThemeProvider");
    }
    return context;
}