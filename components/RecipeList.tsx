import React from 'react';
import type { Recipe } from '../types';
import { RecipeCard } from './RecipeCard';
import { SkeletonLoader } from './SkeletonLoader';

interface RecipeListProps {
    recipes: Recipe[];
    isLoading: boolean;
    error: React.ReactNode | null;
    onClear: () => void;
    onSave: (recipe: Recipe) => Promise<void>;
    savedRecipeIds: string[];
}

const ChefIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
    </svg>
);

const ErrorIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
    </svg>
);

export const RecipeList: React.FC<RecipeListProps> = ({ recipes, isLoading, error, onClear, onSave, savedRecipeIds }) => {
    
    if (isLoading) {
        return <div className="mt-12"><SkeletonLoader /></div>;
    }

    if (error) {
        return (
             <div className="mt-12 text-center bg-[--card] border border-[--destructive]/50 p-12 rounded-2xl shadow-lg">
                <ErrorIcon aria-hidden="true" className="mx-auto h-16 w-16 text-[--destructive]" />
                <h3 className="mt-4 text-xl font-semibold text-[--foreground]">Oops, something went wrong!</h3>
                <p className="mt-2 text-[--muted-foreground] max-w-md mx-auto">{error}</p>
            </div>
        );
    }
    
    if (recipes.length > 0) {
        return (
            <div className="mt-12">
                <div className="flex justify-between items-center mb-6">
                     <h2 className="text-2xl font-bold text-[--foreground]">
                        Generated Recipes
                    </h2>
                    <button 
                        onClick={onClear}
                        className="text-sm font-medium text-[--muted-foreground] hover:text-[--primary] transition-colors"
                    >
                        Clear Results
                    </button>
                </div>
                <div className="grid grid-cols-1 gap-8">
                    {recipes.map((recipe, index) => (
                        <RecipeCard 
                            key={`${recipe.recipeName}-${index}`} 
                            recipe={recipe}
                            onSave={onSave}
                            isSaved={savedRecipeIds.includes(recipe.recipeName)}
                        />
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className="mt-12 text-center bg-[--card] border border-[--border] p-12 rounded-2xl shadow-lg">
            <ChefIcon aria-hidden="true" className="mx-auto h-16 w-16 text-[--primary]/60" />
            <h3 className="mt-4 text-xl font-semibold text-[--card-foreground]">Ready to Cook?</h3>
            <p className="mt-2 text-[--muted-foreground]">Your next favorite meal is just a click away. Fill out the form above to get started.</p>
        </div>
    );
};