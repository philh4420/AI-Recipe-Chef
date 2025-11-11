import React, { useState } from 'react';
import type { PantryItem } from '../types';

interface PantryProps {
    items: PantryItem[];
    onAddItem: (itemName: string) => Promise<void>;
    onDeleteItem: (itemId: string) => Promise<void>;
}

const PantryIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
    </svg>
);

export const Pantry: React.FC<PantryProps> = ({ items, onAddItem, onDeleteItem }) => {
    const [newItem, setNewItem] = useState('');
    const [isAdding, setIsAdding] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newItem.trim()) return;
        setIsAdding(true);
        await onAddItem(newItem);
        setIsAdding(false);
        setNewItem('');
    };

    return (
        <div className="max-w-4xl mx-auto animate-fade-in">
            <div className="text-center mb-8">
                <PantryIcon className="mx-auto h-12 w-12 text-[--primary]/80" />
                <h2 className="text-3xl font-bold text-[--foreground] mt-4">My Virtual Pantry</h2>
                <p className="text-[--muted-foreground] mt-2">Keep track of the ingredients you have on hand.</p>
            </div>

            <div className="bg-[--card] p-6 rounded-2xl shadow-lg border border-[--border] mb-8">
                <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
                    <input
                        type="text"
                        value={newItem}
                        onChange={(e) => setNewItem(e.target.value)}
                        placeholder="e.g., Olive oil, Onions, Salt..."
                        className="flex-grow block w-full border border-[--border] bg-[--input] rounded-lg shadow-sm py-2.5 px-3 focus:outline-none focus:ring-2 focus:ring-[--ring] focus:border-[--primary] sm:text-sm text-[--foreground] transition-colors"
                        aria-label="New pantry item"
                    />
                    <button
                        type="submit"
                        disabled={isAdding || !newItem.trim()}
                        className="w-full sm:w-auto flex items-center justify-center py-2.5 px-6 border border-transparent rounded-lg shadow-sm text-sm font-semibold text-[--primary-foreground] bg-[--primary] hover:brightness-95 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[--ring] focus:ring-offset-[--card] disabled:bg-[--muted] disabled:text-[--muted-foreground] disabled:cursor-not-allowed transition-all duration-200"
                    >
                        {isAdding ? 'Adding...' : 'Add to Pantry'}
                    </button>
                </form>
            </div>

            {items.length > 0 ? (
                <div className="bg-[--card] p-6 rounded-2xl shadow-lg border border-[--border]">
                    <h3 className="text-lg font-semibold mb-4 text-[--foreground]">Items in your pantry ({items.length})</h3>
                    <div className="flex flex-wrap gap-3">
                        {items.map((item, index) => (
                            <div 
                                key={item.id} 
                                className="flex items-center gap-2 bg-[--muted] text-[--muted-foreground] px-3 py-1.5 rounded-full text-sm font-medium animate-stagger-fade-in"
                                style={{ animationDelay: `${index * 50}ms` }}
                            >
                                <span>{item.name}</span>
                                <button
                                    onClick={() => onDeleteItem(item.id)}
                                    className="text-[--muted-foreground]/70 hover:text-[--destructive] transition-colors"
                                    aria-label={`Remove ${item.name}`}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                <div className="text-center bg-[--card] border border-dashed border-[--border] p-12 rounded-2xl">
                    <p className="text-[--muted-foreground]">Your pantry is empty. Add your first item above!</p>
                </div>
            )}
        </div>
    );
};
