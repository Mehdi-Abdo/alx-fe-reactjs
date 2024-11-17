import React from 'react';
import useRecipeStore from '../store/recipeStore';

const RecipeSearch = () => {
  const searchTerm = useRecipeStore((state) => state.searchTerm);
  const updateSearchTerm = useRecipeStore((state) => state.updateSearchTerm);

  const handleInputChange = (e) => {
    updateSearchTerm(e.target.value);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search recipes by name or ingredient..."
        value={searchTerm}
        onChange={handleInputChange}
      />
    </div>
  );
};

export default RecipeSearch;
