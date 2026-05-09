import Recipe from '../models/recipe.js';

export const getAllRecipes = async (req, res) => {
  try {
    const recipes = await Recipe.find({});
    res.json(recipes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getRecipeById = async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) {
      return res.status(404).json({ message: 'Recipe not found' });
    }
    res.json(recipe);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createRecipe = async (req, res) => {
  try {
    const recipe = new Recipe(req.body);
    const newRecipe = await recipe.save();
    res.status(201).json(newRecipe);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updateRecipe = async (req, res) => {
  try {
    const updatedRecipe = await Recipe.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedRecipe);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteRecipe = async (req, res) => {
  try {
    await Recipe.findByIdAndDelete(req.params.id);
    res.json({ message: 'Recipe deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const searchRecipes = async (req, res) => {
  try {
    const { q } = req.query;
    const recipes = await Recipe.find({
      $or: [
        { title: { $regex: q, $options: 'i' } },
        { ingredients: { $regex: q, $options: 'i' } }
      ]
    });
    res.json(recipes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
