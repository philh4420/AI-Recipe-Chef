
import React, { useState, useEffect } from 'react';
import { generateRecipes } from './services/geminiService';
import { addRecipe, deleteRecipe, getRecipes } from './services/firestoreService';
import { onAuthStateChange, signInWithGoogle, signOutUser } from './services/authService';
import type { Recipe, FormData, FirebaseUser } from './types';
import { InputForm } from './components/InputForm';
import { Header } from './components/Header';
import { RecipeList } from './components/RecipeList';
import { SavedRecipes } from './components/SavedRecipes';
import { LandingPage } from './components/LandingPage';
import { useToast } from './hooks/useToast';

const App: React.FC = () => {
    const [user, setUser] = useState<FirebaseUser | null>(null);
    const [authLoading, setAuthLoading] = useState<boolean>(true);
    const [generatedRecipes, setGeneratedRecipes] = useState<Recipe[]>([]);
    const [savedRecipes, setSavedRecipes] = useState<Recipe[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<React.ReactNode | null>(null);
    const [view, setView] = useState<'generator' | 'saved'>('generator');
    const { addToast } = useToast();

    const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
        if (typeof window !== 'undefined' && window.localStorage) {
            const storedPref = window.localStorage.getItem('theme');
            return storedPref === 'dark';
        }
        return false;
    });

    useEffect(() => {
        const root = window.document.documentElement;
        root.classList.toggle('dark', isDarkMode);
        localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
    }, [isDarkMode]);
    
    useEffect(() => {
        const unsubscribe = onAuthStateChange((user) => {
            setUser(user);
            setAuthLoading(false);
        });
        return () => unsubscribe();
    }, []);
    
    useEffect(() => {
        const fetchSavedRecipes = async () => {
            if (user) {
                const recipesFromDb = await getRecipes(user.uid);
                setSavedRecipes(recipesFromDb);
            } else {
                setSavedRecipes([]); // Clear saved recipes on logout
            }
        };
        fetchSavedRecipes();
    }, [user]);

    const toggleDarkMode = () => setIsDarkMode(!isDarkMode);

    const handleSubmit = async (formData: FormData) => {
        setIsLoading(true);
        setError(null);
        setGeneratedRecipes([]);
        try {
            const result = await generateRecipes(formData);
            setGeneratedRecipes(result);
        } catch (err: any) {
            let errorMessage = 'An unexpected error occurred.';
            if (err.message) {
                try {
                    const errorData = JSON.parse(err.message);
                    const apiError = errorData.error;
                    if (apiError && apiError.message) {
                        if (apiError.code === 503 || apiError.status === 'UNAVAILABLE') {
                            errorMessage = "The AI model is currently overloaded with requests. This is a temporary issue. Please wait a moment and try again.";
                        } else {
                            errorMessage = `API Error: ${apiError.message}`;
                        }
                    } else {
                        errorMessage = err.message;
                    }
                } catch (e) {
                    errorMessage = err.message;
                }
            }
            setError(errorMessage);
        } finally {
            setIsLoading(false);
        }
    };
    
    const handleSurprise = () => {
        handleSubmit({ ingredients: '', diet: '', cuisine: '', cookingMethod: '' });
    };

    const handleClear = () => {
        setGeneratedRecipes([]);
        setError(null);
    };

    const handleSaveRecipe = async (recipe: Recipe) => {
        if (!user) return;
        try {
            const newId = await addRecipe(user.uid, recipe);
            setSavedRecipes(prev => [...prev, { ...recipe, id: newId }]);
            addToast({ message: `"${recipe.recipeName}" has been saved!`, type: 'success' });
        } catch (error) {
            console.error("Error saving recipe:", error);
            addToast({ message: 'Failed to save recipe. Please try again.', type: 'error' });
        }
    };

    const handleDeleteRecipe = async (id: string) => {
        if (!user) return;
        try {
            await deleteRecipe(user.uid, id);
            setSavedRecipes(prev => prev.filter(r => r.id !== id));
            addToast({ message: 'Recipe deleted successfully.', type: 'success' });
        } catch (error) {
            console.error("Error deleting recipe: ", error);
            addToast({ message: 'Failed to delete recipe. Please try again.', type: 'error' });
        }
    };

    if (authLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-[--primary]"></div>
            </div>
        );
    }
    
    if (!user) {
        return <LandingPage onSignIn={signInWithGoogle} isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />;
    }
    
    return (
        <div className="min-h-screen font-sans">
            <main className="container mx-auto px-4 py-8 md:py-12">
                <Header 
                    user={user}
                    onSignOut={signOutUser}
                    isDarkMode={isDarkMode} 
                    toggleDarkMode={toggleDarkMode}
                    view={view}
                    setView={setView}
                />

                <div className="max-w-4xl mx-auto">
                    {view === 'generator' ? (
                        <>
                            <InputForm isLoading={isLoading} onSubmit={handleSubmit} onSurprise={handleSurprise} />
                            <RecipeList 
                                recipes={generatedRecipes} 
                                isLoading={isLoading} 
                                error={error} 
                                onClear={handleClear}
                                onSave={handleSaveRecipe}
                                savedRecipeIds={savedRecipes.map(r => r.recipeName)}
                            />
                        </>
                    ) : (
                       <SavedRecipes recipes={savedRecipes} onDelete={handleDeleteRecipe} />
                    )}
                </div>
            </main>
        </div>
    );
};

export default App;