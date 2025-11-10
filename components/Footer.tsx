import React from 'react';

const LogoIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <path d="M16.36,14.22c-0.28-0.45-0.58-1.1-0.6-1.55c1.42-0.2,2.44-1.34,2.44-2.67c0-1.49-1.21-2.7-2.7-2.7c-0.23,0-0.46,0.03-0.68,0.08C14.38,5.43,12.79,4.2,10.8,4.2c-2.3,0-4.21,1.65-4.57,3.83c-0.2-0.04-0.41-0.06-0.63-0.06c-1.49,0-2.7,1.21-2.7,2.7c0,1.33,1.02,2.47,2.44,2.67c-0.02,0.45-0.32,1.1-0.6,1.55C5.07,14.77,4,16.27,4,18c0,2.21,1.79,4,4,4h8c2.21,0,4-1.79,4-4C20,16.27,18.93,14.77,16.36,14.22z M12,19.5c-0.83,0-1.5-0.67-1.5-1.5s0.67-1.5,1.5-1.5s1.5,0.67,1.5,1.5S12.83,19.5,12,19.5z" fill="currentColor"/>
    </svg>
);

export const Footer: React.FC = () => {
    return (
        <footer className="bg-[--background] border-t border-[--border]">
            <div className="container mx-auto px-4 py-8">
                <div className="flex flex-col sm:flex-row justify-between items-center text-center sm:text-left">
                    <div className="flex items-center gap-3 mb-4 sm:mb-0">
                        <LogoIcon className="h-8 w-8 text-[--primary]" />
                        <span className="text-xl font-semibold text-[--foreground]">AI Recipe Chef</span>
                    </div>
                    <p className="text-sm text-[--muted-foreground]">© {new Date().getFullYear()} AI Recipe Chef. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};
