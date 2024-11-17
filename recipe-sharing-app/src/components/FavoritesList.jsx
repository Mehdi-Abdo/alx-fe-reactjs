import React from 'react';
import useRecipeStore from '../store/recipeStore';

const FavoriteButton = ({ id }) => {
  const favorites = useRecipeStore((state) => state.favorites);
  const toggleFavorite = useRecipeStore((state) => state.toggleFavorite);

  const isFavorite = favorites.includes(id);

  return (
    <button onClick={() => toggleFavorite(id)}>
      {isFavorite ? 'Unfavorite' : 'Favorite'}
    </button>
  );
};

export default FavoriteButton;
