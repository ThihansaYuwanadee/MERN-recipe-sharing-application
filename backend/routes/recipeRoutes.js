import express from 'express';
import { getAllRecipes, createRecipe, updateRecipe, deleteRecipe, searchRecipes,getRecipeById } from '../controller/recipeController.js'

const router = express.Router();

router.get('/recipes', getAllRecipes);
router.post('/recipes', createRecipe);
router.put('/recipes/:id', updateRecipe);
router.delete('/recipes/:id', deleteRecipe);
router.get('/recipes/search', searchRecipes);
router.get('/recipes/:id', getRecipeById);

export default router;
