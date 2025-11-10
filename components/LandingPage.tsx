import React, { useState } from 'react';
import { AuthModal } from './AuthModal';
import { signInWithEmailPassword, signUpWithEmailPassword } from '../services/authService';

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

const GoogleIcon: React.FC = () => (
    <svg className="w-5 h-5" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512">
        <path fill="currentColor" d="M488 261.8C488 403.3 381.5 512 244 512 110.3 512 0 398.8 0 256S110.3 0 244 0c69.8 0 133.2 27.2 181.3 73.3l-64.3 64.3c-24.5-23-58.6-37.5-97-37.5-73.2 0-132.3 59.4-132.3 132.3s59.1 132.3 132.3 132.3c84 0 116.3-59.4 120.2-88.5H244V261.8h244z"></path>
    </svg>
);

const FeatureCard: React.FC<{ icon: React.ReactNode; title: string; description: string; }> = ({ icon, title, description }) => (
  <div className="bg-[--card] p-6 rounded-xl shadow-md transition-transform transform hover:-translate-y-1">
    <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-[--primary]/20 text-[--primary] mb-4">
      {icon}
    </div>
    <h3 className="text-lg font-bold text-[--card-foreground]">{title}</h3>
    <p className="mt-2 text-sm text-[--muted-foreground]">{description}</p>
  </div>
);

interface LandingPageProps {
  onSignIn: () => void;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onSignIn, isDarkMode, toggleDarkMode }) => {
  const [modalView, setModalView] = useState<'login' | 'signup' | null>(null);

  return (
    <>
      <div className="min-h-screen font-sans flex flex-col">
        <header className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-xl font-bold text-[--foreground]">RecipeGenius</h1>
          <div className="flex items-center gap-4">
              <span className='text-sm text-[--muted-foreground]'>
                  Have an account? <button onClick={() => setModalView('login')} className="font-bold text-[--primary] hover:underline">Sign In</button>
              </span>
              <button
                  onClick={toggleDarkMode}
                  className="p-2 rounded-full bg-[--card] text-[--foreground] hover:bg-[--muted] focus:outline-none focus:ring-2 focus:ring-[--ring] transition-colors"
                  aria-label="Toggle dark mode"
              >
                  {isDarkMode ? <SunIcon className="h-5 w-5" /> : <MoonIcon className="h-5 w-5" />}
              </button>
          </div>
        </header>

        <main className="flex-grow flex items-center">
          <div className="container mx-auto px-4 py-16 text-center">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-4xl md:text-6xl font-extrabold text-[--foreground] tracking-tight animate-fade-in">
                Your Personal AI <span className="text-[--primary]">Sous-Chef</span>
              </h2>
              <p className="mt-6 max-w-2xl mx-auto text-lg text-[--muted-foreground] animate-fade-in [animation-delay:200ms]">
                Stop wondering what to make. Turn the ingredients you have into delicious, AI-generated recipes and save your favorites for later.
              </p>
              <div className="mt-10 animate-fade-in [animation-delay:400ms] space-y-4">
                <button
                  onClick={() => setModalView('signup')}
                  className="w-full sm:w-auto bg-[--primary] text-[--primary-foreground] font-semibold py-3 px-8 rounded-lg shadow-lg hover:brightness-95 transition-transform transform hover:scale-105"
                >
                  Sign Up with Email
                </button>
                <div className="text-center">
                    <span className="text-xs text-[--muted-foreground]">OR</span>
                </div>
                 <button
                  onClick={onSignIn}
                  className="inline-flex items-center justify-center gap-3 w-full sm:w-auto bg-white text-gray-700 font-semibold py-3 px-8 rounded-lg shadow-md border border-gray-200 hover:bg-gray-50 transition-transform transform hover:scale-105"
                >
                  <GoogleIcon />
                  Continue with Google
                </button>
              </div>
            </div>
            
            <div className="max-w-5xl mx-auto mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 text-left animate-fade-in [animation-delay:600ms]">
              <FeatureCard 
                icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>}
                title="Creative Inspiration"
                description="Get unique recipe ideas based on any combination of ingredients, dietary needs, and cuisine styles."
              />
              <FeatureCard 
                icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2h1a2 2 0 002-2v-1a2 2 0 012-2h1.945M7.881 4.091A5.995 5.995 0 0112 3c1.339 0 2.583.42 3.62 1.155M15 21h2.288a2 2 0 001.995-1.858L21 4H3l2.712 15.142A2 2 0 007.712 21H9" /></svg>}
                title="Reduce Food Waste"
                description="Use up what's in your fridge. Simply list your ingredients and discover meals you can make right now."
              />
              <FeatureCard 
                icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" /></svg>}
                title="Personal Cookbook"
                description="Save the recipes you love to your personal collection. Your next culinary masterpiece is always just a click away."
              />
            </div>
          </div>
        </main>

        <footer className="container mx-auto px-4 py-6 text-center text-sm text-[--muted-foreground]">
          <p>&copy; {new Date().getFullYear()} AI Recipe Generator. All rights reserved.</p>
        </footer>
      </div>
      {modalView && (
        <AuthModal
          initialView={modalView}
          onClose={() => setModalView(null)}
          onSignIn={signInWithEmailPassword}
          onSignUp={signUpWithEmailPassword}
        />
      )}
    </>
  );
};
