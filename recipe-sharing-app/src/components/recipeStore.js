// store/recipeStore.js
import create from 'zustand';

const useRecipeStore = create((set, get) => ({
  recipes: [],

  searchTerm: '', // Stores the current search term
  filteredRecipes: [], // Stores the filtered list of recipes

  // Add a new recipe
  addRecipe: (recipe) => {
    const updatedRecipes = [...get().recipes, { ...recipe, id: Date.now() }];
    set({ recipes: updatedRecipes });
    get().filterRecipes(); // Recompute filtered recipes
  },

  // Update the search term
  updateSearchTerm: (term) => {
    set({ searchTerm: term });
    get().filterRecipes(); // Recompute filtered recipes based on the new term
  },

  // Filter recipes based on the search term
  filterRecipes: () => {
    const { recipes, searchTerm } = get();
    const filtered = recipes.filter((recipe) =>
      recipe.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      recipe.ingredients.some((ingredient) =>
        ingredient.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
    set({ filteredRecipes: filtered });
  },
}));

export default useRecipeStore;
