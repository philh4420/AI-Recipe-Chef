import React, { useMemo } from 'react';
import type { ShoppingListItem } from '../types';

interface ShoppingListProps {
    items: ShoppingListItem[];
    onToggleItem: (itemId: string, isChecked: boolean) => Promise<void>;
    onClearList: (checkedOnly: boolean) => Promise<void>;
}

const ShoppingCartIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c.51 0 .962-.343 1.087-.835l1.823-6.84a1.125 1.125 0 00-1.087-1.352H5.614M16.5 21a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zm-7.5 0a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
    </svg>
);


export const ShoppingList: React.FC<ShoppingListProps> = ({ items, onToggleItem, onClearList }) => {

    const groupedItems = useMemo(() => {
        // FIX: Explicitly type the accumulator in the reduce function to ensure correct type inference for groupedItems.
        return items.reduce((acc: Record<string, ShoppingListItem[]>, item) => {
            const { recipeName } = item;
            if (!acc[recipeName]) {
                acc[recipeName] = [];
            }
            acc[recipeName].push(item);
            return acc;
        }, {});
    }, [items]);
    
    const checkedItemsCount = useMemo(() => items.filter(item => item.isChecked).length, [items]);

    return (
        <div className="max-w-4xl mx-auto animate-fade-in">
            <div className="text-center mb-8">
                <ShoppingCartIcon className="mx-auto h-12 w-12 text-[--primary]/80" />
                <h2 className="text-3xl font-bold text-[--foreground] mt-4">My Shopping List</h2>
                <p className="text-[--muted-foreground] mt-2">Missing ingredients for your saved recipes appear here.</p>
            </div>

            {items.length > 0 ? (
                <>
                    <div className="bg-[--card] p-4 rounded-2xl shadow-lg border border-[--border] mb-6 flex flex-col sm:flex-row justify-end items-center gap-4">
                        <button
                            onClick={() => onClearList(true)}
                            disabled={checkedItemsCount === 0}
                            className="w-full sm:w-auto text-sm font-semibold text-[--foreground] hover:text-[--primary] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Clear Checked Items
                        </button>
                        <button
                            onClick={() => onClearList(false)}
                            className="w-full sm:w-auto flex justify-center py-2 px-4 border border-[--destructive]/50 text-sm font-semibold text-[--destructive] bg-transparent hover:bg-[--destructive]/10 rounded-lg transition-colors"
                        >
                            Clear All
                        </button>
                    </div>

                    <div className="space-y-6">
                        {Object.entries(groupedItems).map(([recipeName, recipeItems]) => (
                             <div key={recipeName} className="bg-[--card] p-6 rounded-2xl shadow-lg border border-[--border]">
                                <h3 className="text-lg font-semibold mb-4 text-[--foreground] border-b border-[--border] pb-2">{recipeName}</h3>
                                <ul className="space-y-3">
                                    {recipeItems.map(item => (
                                        <li key={item.id}>
                                            <label className="flex items-center gap-3 cursor-pointer group">
                                                <input
                                                    type="checkbox"
                                                    checked={item.isChecked}
                                                    onChange={(e) => onToggleItem(item.id, e.target.checked)}
                                                    className="h-5 w-5 rounded border-[--border] text-[--primary] focus:ring-[--ring] bg-[--input]"
                                                />
                                                <span className={`flex-1 ${item.isChecked ? 'line-through text-[--muted-foreground]' : 'text-[--foreground]'} transition-colors`}>
                                                    {item.name}
                                                </span>
                                            </label>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </>
            ) : (
                <div className="text-center bg-[--card] border border-dashed border-[--border] p-12 rounded-2xl">
                    <p className="text-[--muted-foreground]">Your shopping list is empty. Save a recipe to automatically add the ingredients you need!</p>
                </div>
            )}
        </div>
    );
};