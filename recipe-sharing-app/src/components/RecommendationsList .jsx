import React from 'react';
import useRecipeStore from '../store/recipeStore';

const Recommendations = () => {
  const recommendations = useRecipeStore((state) => state.recommendations);

  if (recommendations.length === 0) {
    return <p>No recommendations yet. Favorite recipes to get started!</p>;
  }

  return (
    <div>
      <h3>Recommended for You</h3>
      {recommendations.map((recipe) => (
        <div key={recipe.id}>
          <h4>{recipe.title}</h4>
          <p>Ingredients: {recipe.ingredients.join(', ')}</p>
        </div>
      ))}
    </div>
  );
};

export default Recommendations;
