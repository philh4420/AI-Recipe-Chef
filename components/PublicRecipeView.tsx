import React from 'react';
import { RecipeCard } from './RecipeCard';
import { Footer } from './Footer';
import type { Recipe } from '../types';

interface PublicRecipeViewProps {
    recipe: Recipe | null;
    error: string | null;
    onSignIn: () => void;
    isDarkMode: boolean;
    toggleDarkMode: () => void;
}

const LogoIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <path d="M16.36,14.22c-0.28-0.45-0.58-1.1-0.6-1.55c1.42-0.2,2.44-1.34,2.44-2.67c0-1.49-1.21-2.7-2.7-2.7c-0.23,0-0.46,0.03-0.68,0.08C14.38,5.43,12.79,4.2,10.8,4.2c-2.3,0-4.21,1.65-4.57,3.83c-0.2-0.04-0.41-0.06-0.63-0.06c-1.49,0-2.7,1.21-2.7,2.7c0,1.33,1.02,2.47,2.44,2.67c-0.02,0.45-0.32,1.1-0.6,1.55C5.07,14.77,4,16.27,4,18c0,2.21,1.79,4,4,4h8c2.21,0,4-1.79,4-4C20,16.27,18.93,14.77,16.36,14.22z M12,19.5c-0.83,0-1.5-0.67-1.5-1.5s0.67-1.5,1.5-1.5s1.5,0.67,1.5,1.5S12.83,19.5,12,19.5z" fill="currentColor"/>
    </svg>
);

const SunIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
    </svg>
);

const MoonIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
    </svg>
);

const ErrorIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
    </svg>
);


export const PublicRecipeView: React.FC<PublicRecipeViewProps> = ({ recipe, error, onSignIn, isDarkMode, toggleDarkMode }) => {
    return (
        <div className="min-h-screen bg-[--background] text-[--foreground] font-sans flex flex-col">
            <header className="bg-[--card] border-b border-[--border] sticky top-0 z-40">
                <div className="container mx-auto px-4">
                    <div className="flex justify-between items-center h-16">
                        <div className="flex items-center gap-2">
                            <LogoIcon className="h-7 w-7 text-[--primary]" />
                            <h1 className="text-xl font-bold text-[--foreground]">AI Recipe Chef</h1>
                        </div>
                        <div className="flex items-center gap-2 sm:gap-4">
                            <button
                                onClick={toggleDarkMode}
                                className="p-2 rounded-full text-[--muted-foreground] hover:bg-[--muted] hover:text-[--foreground] transition-colors"
                                aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
                            >
                                {isDarkMode ? <SunIcon className="h-5 w-5" /> : <MoonIcon className="h-5 w-5" />}
                            </button>
                            <button
                                onClick={onSignIn}
                                className="py-2 px-4 border border-transparent rounded-lg shadow-sm text-sm font-semibold text-[--primary-foreground] bg-[--primary] hover:brightness-95 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[--ring] focus:ring-offset-[--card] transition-colors"
                            >
                                Sign Up to Save Recipes
                            </button>
                        </div>
                    </div>
                </div>
            </header>
            <main className="container mx-auto p-4 md:p-8 flex-grow">
                {error && (
                     <div className="mt-12 text-center bg-[--card] border border-[--destructive]/50 p-12 rounded-2xl shadow-lg">
                        <ErrorIcon aria-hidden="true" className="mx-auto h-16 w-16 text-[--destructive]" />
                        <h3 className="mt-4 text-xl font-semibold text-[--foreground]">Recipe Not Found</h3>
                        <p className="mt-2 text-[--muted-foreground] max-w-md mx-auto">{error}</p>
                    </div>
                )}
                {recipe && (
                    <div className="max-w-4xl mx-auto">
                         <RecipeCard 
                            user={null}
                            recipe={recipe} 
                            isPublicView={true}
                         />
                    </div>
                )}
            </main>
            <Footer />
        </div>
    );
};