import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import useRecipeStore from '../store/recipeStore';

const EditRecipeForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const recipes = useRecipeStore((state) => state.recipes);
  const updateRecipe = useRecipeStore((state) => state.updateRecipe);
  const recipe = recipes.find((recipe) => recipe.id === parseInt(id));

  const [formState, setFormState] = useState({
    title: recipe.title,
    description: recipe.description,
    ingredients: recipe.ingredients.join(', '),
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    updateRecipe(recipe.id, {
      ...formState,
      ingredients: formState.ingredients.split(',').map((ing) => ing.trim()),
    });
    navigate(`/recipes/${recipe.id}`);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={formState.title}
        onChange={(e) => setFormState({ ...formState, title: e.target.value })}
        placeholder="Title"
      />
      <textarea
        value={formState.description}
        onChange={(e) =>
          setFormState({ ...formState, description: e.target.value })
        }
        placeholder="Description"
      />
      <input
        type="text"
        value={formState.ingredients}
        onChange={(e) =>
          setFormState({ ...formState, ingredients: e.target.value })
        }
        placeholder="Ingredients (comma-separated)"
      />
      <button type="submit">Save Changes</button>
    </form>
  );
};

export default EditRecipeForm;
