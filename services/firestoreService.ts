import { collection, addDoc, getDocs, doc, deleteDoc } from "firebase/firestore";
import { db } from "../firebase";
import type { Recipe } from "../types";

const USERS_COLLECTION = "users";
const RECIPES_SUBCOLLECTION = "recipes";

// Add a new document to a user's specific subcollection.
export const addRecipe = async (userId: string, recipe: Omit<Recipe, 'id'>): Promise<string> => {
    try {
        const userRecipesCollection = collection(db, USERS_COLLECTION, userId, RECIPES_SUBCOLLECTION);
        const docRef = await addDoc(userRecipesCollection, recipe);
        console.log("Document written with ID: ", docRef.id);
        return docRef.id;
    } catch (e) {
        console.error("Error adding document: ", e);
        throw new Error("Could not save recipe.");
    }
};

// Get all documents from a user's specific subcollection
export const getRecipes = async (userId: string): Promise<Recipe[]> => {
    try {
        const userRecipesCollection = collection(db, USERS_COLLECTION, userId, RECIPES_SUBCOLLECTION);
        const querySnapshot = await getDocs(userRecipesCollection);
        const recipes: Recipe[] = [];
        querySnapshot.forEach((doc) => {
            recipes.push({ id: doc.id, ...doc.data() } as Recipe);
        });
        return recipes;
    } catch (e) {
        console.error("Error getting documents: ", e);
        throw new Error("Could not fetch recipes.");
    }
}

// Delete a document from a user's specific subcollection
export const deleteRecipe = async (userId: string, recipeId: string): Promise<void> => {
    try {
        const recipeDocRef = doc(db, USERS_COLLECTION, userId, RECIPES_SUBCOLLECTION, recipeId);
        await deleteDoc(recipeDocRef);
    } catch (e) {
        console.error("Error deleting document: ", e);
        throw new Error("Could not delete recipe.");
    }
}