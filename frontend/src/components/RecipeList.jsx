import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router';


function RecipeList() {
  const [recipes, setRecipes] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRecipes();
  }, []);

  const fetchRecipes = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/recipes');
      setRecipes(response.data);
    } catch (error) {
      console.error('Error fetching recipes:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    
    if (term.length > 2) {
      try {
        const response = await axios.get(`http://localhost:5000/api/recipes/search?q=${term}`);
        setRecipes(response.data);
      } catch (error) {
        console.error('Error searching recipes:', error);
      }
    } else if (term.length === 0) {
      fetchRecipes();
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/recipes/${id}`);
      setRecipes(recipes.filter(recipe => recipe._id !== id));
    } catch (error) {
      console.error('Error deleting recipe:', error);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64 ">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <input
        type="text"
        value={searchTerm}
        onChange={handleSearch}
        placeholder="Search recipes..."
        className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      />
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 ">
        {recipes.map(recipe => (
          <div key={recipe._id} className="bg-white rounded-xl shadow-md overflow-hidden border-[0.5px] border-black
">
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-2">{recipe.title}</h2>
              <p className="text-gray-600 mb-4">{recipe.description}</p>
              
              <div className="space-y-4 ">
                <div>
                  <h3 className="font-medium text-gray-700">Ingredients:</h3>
                  <ul className="list-disc list-inside text-gray-600">
                    {recipe.ingredients.map((ingredient, index) => (
                      <li key={index}>{ingredient}</li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h3 className="font-medium text-gray-700">Cooking Time:</h3>
                  <p className="text-gray-600">{recipe.cookingTime} minutes</p>
                </div>
              </div>

              <div className="mt-4 flex justify-end space-x-3">
                <Link
                  to={`/edit/${recipe._id}`}
                  className="text-blue-600 hover:text-blue-800"
                >
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(recipe._id)}
                  className="text-red-600 hover:text-red-800"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RecipeList;