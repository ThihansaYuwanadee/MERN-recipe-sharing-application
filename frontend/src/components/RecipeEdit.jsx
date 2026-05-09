// src/components/RecipeEdit.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';
import axios from 'axios';

function RecipeEdit() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [recipe, setRecipe] = useState({
    title: '',
    description: '',
    ingredients: [''],
    instructions: [''],
    cookingTime: ''
  });

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/recipes/${id}`);
        setRecipe(response.data);
      } catch (error) {
        console.error('Error fetching recipe:', error);
      }
    };
    fetchRecipe();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/api/recipes/${id}`, recipe);
      navigate('/');
    } catch (error) {
      console.error('Error updating recipe:', error);
    }
  };

  const handleIngredientChange = (index, value) => {
    const newIngredients = [...recipe.ingredients];
    newIngredients[index] = value;
    setRecipe({ ...recipe, ingredients: newIngredients });
  };

  const handleInstructionChange = (index, value) => {
    const newInstructions = [...recipe.instructions];
    newInstructions[index] = value;
    setRecipe({ ...recipe, instructions: newInstructions });
  };

  const addIngredient = () => {
    setRecipe({
      ...recipe,
      ingredients: [...recipe.ingredients, '']
    });
  };

  const addInstruction = () => {
    setRecipe({
      ...recipe,
      instructions: [...recipe.instructions, '']
    });
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto bg-white rounded-xl shadow-md p-8">
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">Title</label>
          <input
            type="text"
            required
            value={recipe.title}
            onChange={(e) => setRecipe({ ...recipe, title: e.target.value })}
            className="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            required
            value={recipe.description}
            onChange={(e) => setRecipe({ ...recipe, description: e.target.value })}
            className="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            rows="3"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Ingredients</label>
          {recipe.ingredients.map((ingredient, index) => (
            <div key={index} className="mt-2 flex gap-2">
              <input
                type="text"
                required
                value={ingredient}
                onChange={(e) => handleIngredientChange(index, e.target.value)}
                className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
          ))}
          <button
            type="button"
            onClick={addIngredient}
            className="mt-2 text-blue-600 hover:text-blue-800"
          >
            Add Ingredient
          </button>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Instructions</label>
          {recipe.instructions.map((instruction, index) => (
            <div key={index} className="mt-2 flex gap-2">
              <textarea
                required
                value={instruction}
                onChange={(e) => handleInstructionChange(index, e.target.value)}
                className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                rows="2"
              />
            </div>
          ))}
          <button
            type="button"
            onClick={addInstruction}
            className="mt-2 text-blue-600 hover:text-blue-800"
          >
            Add Instruction
          </button>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Cooking Time (minutes)</label>
          <input
            type="number"
            required
            value={recipe.cookingTime}
            onChange={(e) => setRecipe({ ...recipe, cookingTime: e.target.value })}
            className="mt-1 w-32 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Update Recipe
        </button>
      </div>
    </form>
  );
}

export default RecipeEdit;
