import React from 'react';
import type { FirebaseUser } from '../types';

// --- ICONS ---
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
    onSignOut: () => Promise<void>;
    isDarkMode: boolean;
    toggleDarkMode: () => void;
    view: 'generator' | 'saved';
    setView: (view: 'generator' | 'saved') => void;
}

export const Header: React.FC<HeaderProps> = ({ user, onSignOut, isDarkMode, toggleDarkMode, view, setView }) => {
    return (
        <header className="sticky top-0 z-40 w-full backdrop-blur border-b border-[--border] shadow-sm bg-[--background]/80">
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-center py-3">
                    <div className="flex items-center gap-8">
                        <h1 className="text-xl font-bold text-[--foreground]">RecipeGenius</h1>
                        <nav className="hidden md:flex items-center gap-2">
                            <button 
                                onClick={() => setView('generator')}
                                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${view === 'generator' ? 'bg-[--primary]/10 text-[--primary]' : 'text-[--muted-foreground] hover:text-[--foreground] hover:bg-[--muted]'}`}
                                aria-current={view === 'generator'}
                            >
                                Generator
                            </button>
                            <button 
                                onClick={() => setView('saved')}
                                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${view === 'saved' ? 'bg-[--primary]/10 text-[--primary]' : 'text-[--muted-foreground] hover:text-[--foreground] hover:bg-[--muted]'}`}
                                aria-current={view === 'saved'}
                            >
                                Saved Recipes
                            </button>
                        </nav>
                    </div>

                    <div className="flex items-center gap-4">
                         <button
                            onClick={toggleDarkMode}
                            className="p-2 rounded-full text-[--foreground] hover:bg-[--muted] focus:outline-none focus:ring-2 focus:ring-[--ring] focus:ring-offset-2 focus:ring-offset-[--background] transition-colors"
                            aria-label="Toggle dark mode"
                        >
                            {isDarkMode ? <SunIcon className="h-5 w-5" /> : <MoonIcon className="h-5 w-5" />}
                        </button>
                        
                        <div className="flex items-center gap-3">
                            {user.photoURL && <img src={user.photoURL} alt="" className="h-8 w-8 rounded-full" />}
                            <span className="hidden sm:inline text-sm font-medium text-[--foreground]">{user.displayName || user.email}</span>
                        </div>

                        <div className="border-l border-[--border] h-6"></div>

                        <button 
                            onClick={onSignOut} 
                            className="text-sm font-medium text-[--muted-foreground] hover:text-[--primary] transition-colors"
                        >
                            Sign Out
                        </button>
                    </div>
                </div>
                 {/* Mobile navigation */}
                <nav className="md:hidden pb-3">
                    <div className="flex items-center justify-center gap-2 border border-[--border] rounded-lg p-1 bg-[--muted]/50">
                        <button
                            onClick={() => setView('generator')}
                            className={`flex-1 text-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${view === 'generator' ? 'bg-[--card] shadow-sm text-[--primary]' : 'text-[--muted-foreground]'}`}
                             aria-current={view === 'generator'}
                        >
                            Generator
                        </button>
                        <button
                            onClick={() => setView('saved')}
                            className={`flex-1 text-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${view === 'saved' ? 'bg-[--card] shadow-sm text-[--primary]' : 'text-[--muted-foreground]'}`}
                            aria-current={view === 'saved'}
                        >
                            Saved Recipes
                        </button>
                    </div>
                </nav>
            </div>
        </header>
    );
};
