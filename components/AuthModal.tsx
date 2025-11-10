import React, { useState } from 'react';
import type { AuthCredentials } from '../types';

const EyeIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
    </svg>
);

const EyeOffIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
    </svg>
);

const CloseIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
);

interface AuthModalProps {
    initialView: 'login' | 'signup';
    onClose: () => void;
    onSignIn: (credentials: AuthCredentials) => Promise<void>;
    onSignUp: (credentials: AuthCredentials) => Promise<void>;
}

export const AuthModal: React.FC<AuthModalProps> = ({ initialView, onClose, onSignIn, onSignUp }) => {
    const [view, setView] = useState(initialView);
    const [formData, setFormData] = useState({ displayName: '', email: '', password: '', confirmPassword: '' });
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const isLogin = view === 'login';

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setIsLoading(true);

        if (!isLogin && formData.password !== formData.confirmPassword) {
            setError("Passwords do not match.");
            setIsLoading(false);
            return;
        }

        try {
            if (isLogin) {
                await onSignIn({ email: formData.email, password: formData.password });
            } else {
                await onSignUp({ displayName: formData.displayName, email: formData.email, password: formData.password });
            }
            // onClose will be called by the parent component on auth state change
        } catch (err: any) {
            setError(err.message || "An unknown error occurred.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div 
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 animate-fade-in"
            onClick={onClose}
            role="dialog"
            aria-modal="true"
            aria-labelledby="auth-modal-title"
        >
            <div 
                className="relative bg-[--card] rounded-2xl shadow-xl w-full max-w-md p-8 m-4"
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 p-1 rounded-full text-[--muted-foreground] hover:text-[--foreground] hover:bg-[--muted] transition-colors"
                    aria-label="Close authentication modal"
                >
                    <CloseIcon className="h-6 w-6" />
                </button>

                <h2 id="auth-modal-title" className="text-2xl font-bold text-center text-[--card-foreground] mb-2">{isLogin ? 'Welcome Back!' : 'Create an Account'}</h2>
                <p className="text-center text-[--muted-foreground] mb-6">{isLogin ? 'Sign in to access your recipes.' : 'Let\'s get you started.'}</p>
                
                <form onSubmit={handleSubmit} className="space-y-4">
                    {!isLogin && (
                        <div>
                            <label className="text-sm font-medium text-[--card-foreground]" htmlFor="displayName">Name</label>
                            <input type="text" name="displayName" id="displayName" value={formData.displayName} onChange={handleChange} required className="mt-1 block w-full border border-[--border] bg-[--input] rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-[--ring] focus:border-[--primary] sm:text-sm text-[--foreground]" />
                        </div>
                    )}
                    <div>
                        <label className="text-sm font-medium text-[--card-foreground]" htmlFor="email">Email</label>
                        <input type="email" name="email" id="email" value={formData.email} onChange={handleChange} required className="mt-1 block w-full border border-[--border] bg-[--input] rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-[--ring] focus:border-[--primary] sm:text-sm text-[--foreground]" />
                    </div>
                    <div>
                        <label className="text-sm font-medium text-[--card-foreground]" htmlFor="password">Password</label>
                        <div className="relative">
                            <input type={showPassword ? 'text' : 'password'} name="password" id="password" value={formData.password} onChange={handleChange} required className="mt-1 block w-full border border-[--border] bg-[--input] rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-[--ring] focus:border-[--primary] sm:text-sm text-[--foreground]" />
                            <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute inset-y-0 right-0 pr-3 flex items-center text-[--muted-foreground]" aria-label={showPassword ? 'Hide password' : 'Show password'}>
                                {showPassword ? <EyeOffIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
                            </button>
                        </div>
                    </div>
                    {!isLogin && (
                        <div>
                            <label className="text-sm font-medium text-[--card-foreground]" htmlFor="confirmPassword">Confirm Password</label>
                            <input type={showPassword ? 'text' : 'password'} name="confirmPassword" id="confirmPassword" value={formData.confirmPassword} onChange={handleChange} required className="mt-1 block w-full border border-[--border] bg-[--input] rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-[--ring] focus:border-[--primary] sm:text-sm text-[--foreground]" />
                        </div>
                    )}

                    {error && <p role="alert" className="text-sm text-[--destructive] text-center">{error}</p>}

                    <button type="submit" disabled={isLoading} className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-[--primary-foreground] bg-[--primary] hover:brightness-95 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[--ring] focus:ring-offset-[--card] disabled:bg-[--muted] disabled:text-[--muted-foreground] disabled:cursor-not-allowed transition-all duration-200">
                         {isLoading ? (
                            <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                        ) : (isLogin ? 'Sign In' : 'Sign Up')}
                    </button>
                </form>

                <p className="mt-6 text-center text-sm text-[--muted-foreground]">
                    {isLogin ? "Don't have an account?" : "Already have an account?"}
                    <button onClick={() => setView(isLogin ? 'signup' : 'login')} className="font-medium text-[--primary] hover:underline ml-1">
                        {isLogin ? 'Sign Up' : 'Sign In'}
                    </button>
                </p>
            </div>
        </div>
    );
};