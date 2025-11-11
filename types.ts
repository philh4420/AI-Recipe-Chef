import type { User } from 'firebase/auth';

export interface Recipe {
  id?: string;
  recipeName: string;
  description: string;
  prepTime: string;
  cookTime: string;
  ingredients: string[];
  instructions: string[];
}

export interface InputFormProps {
  isLoading: boolean;
  onSubmit: (formData: FormData) => void;
}

export interface FormData {
    ingredients: string;
    diet: string;
    cuisine: string;
    cookingMethod: string;
    mealType: string;
}

export type FirebaseUser = User;

export interface AuthCredentials {
    displayName?: string;
    email: string;
    password?: string;
}

export interface Toast {
  id: number;
  message: string;
  type: 'success' | 'error';
}

export interface PantryItem {
  id: string;
  name: string;
}

export interface ShoppingListItem {
  id: string;
  name: string;
  recipeName: string;
  isChecked: boolean;
}

// New types for Meal Planner
export type DayOfWeek = 'sunday' | 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday';

export const DAYS_OF_WEEK: DayOfWeek[] = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];

export interface PlannedRecipe {
    id: string;
    recipeName: string;
}

export type MealPlan = {
    [key in DayOfWeek]?: PlannedRecipe | null;
};

// Shared View type
export type View = 'generator' | 'saved' | 'pantry' | 'shoppingList' | 'mealPlanner';