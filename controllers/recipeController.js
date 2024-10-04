const Recipe = require('../models/recipeModel');

exports.createRecipe = async (req, res) => {
    try {
        const { title, ingredients, instructions, cuisineType } = req.body;
        const recipe = new Recipe({
            title, ingredients, instructions, cuisineType, author: req.user.id
        });
        await recipe.save();
        res.json(recipe);
    } catch (error) {
        res.status(500).send('Server error');
    }
};

exports.getRecipes = async (req, res) => {
    try {
        const recipes = await Recipe.find();
        res.json(recipes);
    } catch (error) {
        res.status(500).send('Server error');
    }
};

exports.getRecipeById = async (req, res) => {
    try {
        const recipe = await Recipe.findById(req.params.id);
        if (!recipe) return res.status(404).json({ msg: 'Recipe not found' });
        res.json(recipe);
    } catch (error) {
        res.status(500).send('Server error');
    }
};

exports.updateRecipe = async (req, res) => {
    try {
        const recipe = await Recipe.findById(req.params.id);
        if (!recipe) return res.status(404).json({ msg: 'Recipe not found' });

        Object.assign(recipe, req.body);
        await recipe.save();
        res.json(recipe);
    } catch (error) {
        res.status(500).send('Server error');
    }
};

exports.deleteRecipe = async (req, res) => {
    try {
        await Recipe.findByIdAndRemove(req.params.id);
        res.json({ msg: 'Recipe removed' });
    } catch (error) {
        res.status(500).send('Server error');
    }
};
