import React, { useState } from 'react';
import type { Recipe, MealPlan, DayOfWeek, PlannedRecipe } from '../types';
import { DAYS_OF_WEEK } from '../types';

const CalendarDaysIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0h18M-4.5 12h28.5" />
    </svg>
);

const TrashIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
);

const PlusCircleIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);


interface MealPlannerProps {
    savedRecipes: Recipe[];
    mealPlan: MealPlan;
    onUpdatePlan: (newPlan: MealPlan) => Promise<void>;
    onGenerateList: () => Promise<void>;
}

export const MealPlanner: React.FC<MealPlannerProps> = ({ savedRecipes, mealPlan, onUpdatePlan, onGenerateList }) => {
    const [draggedRecipe, setDraggedRecipe] = useState<PlannedRecipe | null>(null);
    const [isGenerating, setIsGenerating] = useState(false);

    const handleDragStart = (e: React.DragEvent, recipe: Recipe) => {
        if (!recipe.id) return;
        const plannedRecipe: PlannedRecipe = { id: recipe.id, recipeName: recipe.recipeName };
        setDraggedRecipe(plannedRecipe);
        e.dataTransfer.effectAllowed = "move";
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
    };

    const handleDrop = (e: React.DragEvent, day: DayOfWeek) => {
        e.preventDefault();
        if (draggedRecipe) {
            const newPlan = { ...mealPlan, [day]: draggedRecipe };
            onUpdatePlan(newPlan);
            setDraggedRecipe(null);
        }
    };
    
    const handleRemoveRecipe = (day: DayOfWeek) => {
        const newPlan = { ...mealPlan };
        delete newPlan[day];
        onUpdatePlan(newPlan);
    };

    const handleGenerateClick = async () => {
        setIsGenerating(true);
        await onGenerateList();
        setIsGenerating(false);
    };

    return (
        <div className="max-w-7xl mx-auto animate-fade-in">
            <div className="text-center mb-8">
                <CalendarDaysIcon className="mx-auto h-12 w-12 text-[--primary]/80" />
                <h2 className="text-3xl font-bold text-[--foreground] mt-4">Weekly Meal Planner</h2>
                <p className="text-[--muted-foreground] mt-2">Drag and drop your saved recipes to plan your week.</p>
            </div>

            <div className="bg-[--card] p-4 rounded-2xl shadow-lg border border-[--border] mb-8">
                 <button
                    onClick={handleGenerateClick}
                    disabled={isGenerating}
                    className="w-full flex items-center justify-center py-3 px-6 border border-transparent rounded-lg shadow-sm text-sm font-semibold text-[--primary-foreground] bg-[--primary] hover:brightness-95 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[--ring] focus:ring-offset-[--card] disabled:bg-[--muted] disabled:text-[--muted-foreground] disabled:cursor-not-allowed transition-all duration-200"
                >
                    {isGenerating ? (
                        <>
                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                            Generating...
                        </>
                    ) : 'Generate Weekly Shopping List'}
                </button>
            </div>
            
            <div className="flex flex-col lg:flex-row gap-8">
                {/* Saved Recipes Sidebar */}
                <aside className="w-full lg:w-1/3 bg-[--card] p-6 rounded-2xl shadow-lg border border-[--border]">
                    <h3 className="text-xl font-bold text-[--foreground] mb-4">Your Saved Recipes</h3>
                    {savedRecipes.length > 0 ? (
                        <div className="space-y-3 max-h-96 lg:max-h-[60vh] overflow-y-auto pr-2">
                            {savedRecipes.map(recipe => (
                                <div
                                    key={recipe.id}
                                    draggable
                                    onDragStart={(e) => handleDragStart(e, recipe)}
                                    className="p-3 bg-[--muted] rounded-lg cursor-grab active:cursor-grabbing transition-colors hover:bg-[--accent]"
                                >
                                    <p className="font-semibold text-[--foreground] truncate">{recipe.recipeName}</p>
                                    <p className="text-xs text-[--muted-foreground]">{recipe.prepTime} Prep, {recipe.cookTime} Cook</p>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-sm text-[--muted-foreground] text-center py-8">You have no saved recipes. Save some from the generator to start planning!</p>
                    )}
                </aside>

                {/* Calendar */}
                <main className="w-full lg:w-2/3">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-7 gap-4">
                        {DAYS_OF_WEEK.map(day => {
                            const plannedRecipe = mealPlan[day];
                            return (
                                <div 
                                    key={day} 
                                    onDragOver={handleDragOver} 
                                    onDrop={(e) => handleDrop(e, day)}
                                    className="bg-[--card] rounded-2xl border border-[--border] min-h-[150px] flex flex-col transition-all duration-200"
                                >
                                    <h4 className="font-bold text-center capitalize p-2 border-b border-[--border] text-[--foreground]">{day}</h4>
                                    <div className="p-3 flex-grow">
                                        {plannedRecipe ? (
                                            <div className="bg-[--primary]/10 border-l-4 border-[--primary] p-3 rounded-md text-left animate-pop-in h-full flex flex-col justify-between">
                                                <p className="font-semibold text-sm text-[--primary] flex-grow">{plannedRecipe.recipeName}</p>
                                                <button 
                                                    onClick={() => handleRemoveRecipe(day)}
                                                    className="text-[--muted-foreground] hover:text-[--destructive] ml-auto"
                                                    aria-label={`Remove ${plannedRecipe.recipeName}`}
                                                >
                                                    <TrashIcon className="h-4 w-4" />
                                                </button>
                                            </div>
                                        ) : (
                                            <div className="h-full flex flex-col items-center justify-center text-center text-[--muted-foreground] border-2 border-dashed border-[--border] rounded-lg p-2">
                                                <PlusCircleIcon className="h-6 w-6 opacity-50 mb-1" />
                                                <span className="text-xs font-semibold">Drop a recipe</span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </main>
            </div>
        </div>
    );
};
