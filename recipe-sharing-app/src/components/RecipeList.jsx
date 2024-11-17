import React from 'react';
import useRecipeStore from '../store/recipeStore';
import FavoriteButton from './FavoriteButton';

const RecipeList = () => {
  const recipes = useRecipeStore((state) => state.recipes);

  if (recipes.length === 0) {
    return <p>No recipes available.</p>;
  }

  return (
    <div>
      {recipes.map((recipe) => (
        <div key={recipe.id}>
          <h3>{recipe.title}</h3>
          <p>Ingredients: {recipe.ingredients.join(', ')}</p>
          <FavoriteButton id={recipe.id} />
        </div>
      ))}
    </div>
  );
};

export default RecipeList;
