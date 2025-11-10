import React, { useState, useRef } from 'react';
import type { Recipe } from '../types';

const ClockIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);

const HeartIcon: React.FC<{ className?: string }> = ({ className }) => (
     <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
    </svg>
);

const TrashIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
    </svg>
);

const PrintIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
    </svg>
);

const Section: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
    <div>
        <h3 className="text-lg font-semibold text-[--foreground] mb-3">{title}</h3>
        {children}
    </div>
);

interface RecipeCardProps {
    recipe: Recipe;
    onSave?: (recipe: Recipe) => Promise<void>;
    onDelete?: (id: string) => Promise<void>;
    isSaved?: boolean;
    isSavedView?: boolean;
}

export const RecipeCard: React.FC<RecipeCardProps> = ({ recipe, onSave, onDelete, isSaved, isSavedView }) => {
    const [isSaving, setIsSaving] = useState(false);
    const cardRef = useRef<HTMLDivElement>(null);
    
    const handleSave = async () => {
        if (onSave) {
            setIsSaving(true);
            await onSave(recipe);
            setIsSaving(false);
        }
    };
    
    const handleDelete = async () => {
        if (onDelete && recipe.id) {
            await onDelete(recipe.id);
        }
    };

    const handlePrint = () => {
        const node = cardRef.current;
        if (!node) return;

        const onAfterPrint = () => {
            node.classList.remove('printing-container');
            window.removeEventListener('afterprint', onAfterPrint);
        };

        window.addEventListener('afterprint', onAfterPrint);
        node.classList.add('printing-container');
        window.print();
    };

    return (
        <div ref={cardRef} className="bg-[--card] border border-[--border] rounded-2xl shadow-lg animate-fade-in flex flex-col overflow-hidden">
            <div className='p-8 flex-grow'>
                <h2 className="text-2xl font-bold text-[--foreground] mb-2">{recipe.recipeName}</h2>
                <p className="text-[--muted-foreground] mb-6">{recipe.description}</p>
                
                <div className="flex flex-wrap gap-x-6 gap-y-3 mb-8 text-sm text-[--foreground]">
                    <div className="flex items-center gap-2">
                        <ClockIcon className="h-5 w-5 text-[--primary]" />
                        <div>
                            <span className="font-semibold">Prep:</span> {recipe.prepTime}
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <ClockIcon className="h-5 w-5 text-[--primary]" />
                        <div>
                            <span className="font-semibold">Cook:</span> {recipe.cookTime}
                        </div>
                    </div>
                </div>
                
                <hr className="border-[--border] my-6" />

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    <div className="lg:col-span-4">
                        <Section title="Ingredients">
                            <ul className="space-y-2 list-disc list-inside text-[--foreground]">
                                {recipe.ingredients.map((ingredient, index) => (
                                    <li key={index}>{ingredient}</li>
                                ))}
                            </ul>
                        </Section>
                    </div>
                    <div className="lg:col-span-8">
                        <Section title="Instructions">
                            <ol className="space-y-4 text-[--foreground]">
                                {recipe.instructions.map((step, index) => (
                                    <li key={index} className="flex">
                                        <span className="mr-4 flex-shrink-0 bg-[--primary] text-[--primary-foreground] font-bold h-6 w-6 rounded-full text-xs flex items-center justify-center">{index + 1}</span>
                                        <span className="flex-1">{step}</span>
                                    </li>
                                ))}
                            </ol>
                        </Section>
                    </div>
                </div>
            </div>
             <div className="p-4 bg-[--muted]/30 border-t border-[--border] no-print">
                 <div className="flex gap-2 items-center justify-end">
                    {isSavedView && onDelete ? (
                         <button
                            onClick={handleDelete}
                            className="flex items-center justify-center gap-2 py-2 px-4 rounded-lg text-sm font-semibold text-[--destructive] bg-transparent hover:bg-[--destructive]/10 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[--destructive] focus:ring-offset-[--card] transition-colors"
                        >
                            <TrashIcon className="h-4 w-4" />
                            <span>Delete</span>
                        </button>
                    ) : onSave && (
                        <button
                            onClick={handleSave}
                            disabled={isSaving || isSaved}
                            className="flex items-center justify-center gap-2 py-2 px-4 rounded-lg text-sm font-semibold text-[--primary] bg-transparent hover:bg-[--primary]/10 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[--ring] focus:ring-offset-[--card] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                            {isSaving ? (
                               <>
                                    <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    <span>Saving...</span>
                               </>
                            ) : isSaved ? (
                                <>
                                   <HeartIcon className="h-4 w-4 text-[--primary]" />
                                    <span>Saved</span>
                                </>
                            ) : (
                                 <>
                                    <HeartIcon className="h-4 w-4" />
                                    <span>Save Recipe</span>
                                </>
                            )}
                        </button>
                    )}
                    
                    <div className="border-l border-[--border] h-6 mx-2"></div>

                    <button
                        onClick={handlePrint}
                        className="flex items-center justify-center gap-2 py-2 px-4 rounded-lg text-sm font-semibold text-[--muted-foreground] bg-transparent hover:bg-[--muted] hover:text-[--foreground] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[--ring] focus:ring-offset-[--card] transition-colors"
                        aria-label="Print Recipe"
                    >
                        <PrintIcon className="h-4 w-4" />
                        <span>Print</span>
                    </button>
                </div>
            </div>
        </div>
    );
};
