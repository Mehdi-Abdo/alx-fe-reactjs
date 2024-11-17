// store/recipeStore.js
import create from 'zustand';

const useRecipeStore = create((set, get) => ({
  recipes: [],
  favorites: [], // Stores IDs of favorite recipes
  recommendations: [], // Stores recommended recipes

  // Add a new recipe
  addRecipe: (recipe) => {
    const updatedRecipes = [...get().recipes, { ...recipe, id: Date.now() }];
    set({ recipes: updatedRecipes });
    get().generateRecommendations(); // Update recommendations
  },

  // Add or remove a recipe from favorites
  toggleFavorite: (id) => {
    const { favorites } = get();
    const updatedFavorites = favorites.includes(id)
      ? favorites.filter((favId) => favId !== id)
      : [...favorites, id];
    set({ favorites: updatedFavorites });
    get().generateRecommendations(); // Update recommendations
  },

  // Generate personalized recommendations
  generateRecommendations: () => {
    const { recipes, favorites } = get();
    if (favorites.length === 0) {
      set({ recommendations: recipes.slice(0, 5) }); // Default: show top 5 recipes
      return;
    }

    // Create a recommendation system based on favorite ingredients
    const favoriteRecipes = recipes.filter((recipe) =>
      favorites.includes(recipe.id)
    );
    const favoriteIngredients = new Set(
      favoriteRecipes.flatMap((recipe) => recipe.ingredients)
    );

    const recommendedRecipes = recipes.filter(
      (recipe) =>
        !favorites.includes(recipe.id) &&
        recipe.ingredients.some((ingredient) =>
          favoriteIngredients.has(ingredient)
        )
    );

    set({ recommendations: recommendedRecipes.slice(0, 5) }); // Limit to top 5
  },
}));

export default useRecipeStore;
