import React from 'react';
import type { FirebaseUser } from '../types';

const SunIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
    </svg>
);

const MoonIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
    </svg>
);

interface HeaderProps {
    user: FirebaseUser;
    onSignOut: () => void;
    isDarkMode: boolean;
    toggleDarkMode: () => void;
    view: 'generator' | 'saved';
    setView: (view: 'generator' | 'saved') => void;
}

export const Header: React.FC<HeaderProps> = ({ user, onSignOut, isDarkMode, toggleDarkMode, view, setView }) => {
    
    const navButtonClasses = (buttonView: 'generator' | 'saved') => 
        `px-3 py-1.5 rounded-md text-sm font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[--ring] focus:ring-offset-[--background] ${
            view === buttonView
            ? 'bg-[--primary] text-[--primary-foreground] shadow-sm'
            : 'text-[--muted-foreground] hover:bg-[--muted] hover:text-[--foreground]'
        }`;

    return (
        <header className="sticky top-0 z-40 w-full backdrop-blur flex-none transition-colors duration-500 lg:z-50 lg:border-b lg:border-[--border] bg-[--background]/80">
            <div className="container mx-auto px-4">
                <div className="relative flex items-center h-16">
                    <div className="flex items-center gap-6">
                        <h1 className="text-xl font-bold text-[--foreground]">
                            Recipe<span className="text-[--primary]">Genius</span>
                        </h1>
                        <nav aria-label="Main navigation" className="hidden md:flex items-center gap-2 bg-[--card] border border-[--border] p-1 rounded-lg">
                            <button onClick={() => setView('generator')} className={navButtonClasses('generator')}>
                                Generator
                            </button>
                            <button onClick={() => setView('saved')} className={navButtonClasses('saved')}>
                                My Recipes
                            </button>
                        </nav>
                    </div>

                    <div className="flex-1 flex items-center justify-end gap-4">
                        <span className="text-sm text-[--muted-foreground] hidden sm:block">
                           {user.displayName?.split(' ')[0]}
                        </span>
                         <button
                            onClick={toggleDarkMode}
                            className="p-2 rounded-full text-[--foreground] hover:bg-[--muted] focus:outline-none focus:ring-2 focus:ring-[--ring] focus:ring-offset-2 focus:ring-offset-[--background] transition-colors"
                            aria-label="Toggle dark mode"
                        >
                            {isDarkMode ? <SunIcon className="h-5 w-5" /> : <MoonIcon className="h-5 w-5" />}
                        </button>
                        <button onClick={onSignOut} className="text-sm font-medium text-[--muted-foreground] hover:text-[--primary] transition-colors">
                            Sign Out
                        </button>
                    </div>
                </div>
                 <nav aria-label="Main navigation" className="md:hidden flex items-center justify-center gap-2 bg-[--card] border border-[--border] p-1 rounded-lg mb-4">
                    <button onClick={() => setView('generator')} className={`${navButtonClasses('generator')} flex-1`}>
                        Generator
                    </button>
                    <button onClick={() => setView('saved')} className={`${navButtonClasses('saved')} flex-1`}>
                        My Recipes
                    </button>
                </nav>
            </div>
        </header>
    );
};