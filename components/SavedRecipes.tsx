import React from 'react';
import type { Recipe } from '../types';
import { RecipeCard } from './RecipeCard';

interface SavedRecipesProps {
    recipes: Recipe[];
    onDelete: (id: string) => Promise<void>;
}

const BookmarkIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.5 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z" />
    </svg>
);


export const SavedRecipes: React.FC<SavedRecipesProps> = ({ recipes, onDelete }) => {
    if (recipes.length === 0) {
        return (
            <div className="mt-12 text-center bg-[--card] border border-[--border] p-12 rounded-2xl shadow-lg">
                <BookmarkIcon aria-hidden="true" className="mx-auto h-16 w-16 text-[--primary]/60" />
                <h3 className="mt-4 text-xl font-semibold text-[--card-foreground]">No Saved Recipes Yet</h3>
                <p className="mt-2 text-[--muted-foreground]">
                    Head over to the generator to find and save your next favorite dish!
                </p>
            </div>
        );
    }

    return (
        <div className="mt-8 animate-fade-in">
             <h2 className="text-2xl font-bold text-[--foreground] mb-6">
                Your <span className="text-[--primary]">{recipes.length}</span> Saved Recipes
            </h2>
            <div className="grid grid-cols-1 gap-8">
                {recipes.map((recipe) => (
                    <RecipeCard 
                        key={recipe.id} 
                        recipe={recipe} 
                        onDelete={onDelete}
                        isSavedView={true}
                    />
                ))}
            </div>
        </div>
    );
};