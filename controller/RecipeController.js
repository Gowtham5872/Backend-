const { Recipe } = require("../schema/schema.js");
const { Liked } = require("../schema/schema.js");

const createRecipe = async (req, res) => {
  try {
    const { title, ingredients, instructions, imageUrl } = req.body;

    const newRecipe = await Recipe.create({
      title,
      ingredients,
      instructions,
      imageUrl,
      ratings: [],
      comments: [],
    });

    res.status(201).json(newRecipe);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const rateRecipe = async (req, res) => {
  try {
    const { rating } = req.body;
    
    const recipeId = req.params.id;

    const recipe = await Recipe.findById(recipeId);

    if (!recipe) {
      return res.status(404).json({ error: "Recipe not found" });
    }

    // Initialize ratings as an empty array if it doesn't exist
    recipe.ratings = recipe.ratings || [];

    recipe.ratings.push(rating);
    await recipe.save();

    res.status(200).json({ message: "Rating added successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const commentRecipe = async (req, res) => {
  try {
    const { comment } = req.body;
   
    const recipeId = req.params.id;

    const recipe = await Recipe.findById(recipeId);

    if (!recipe) {
      return res.status(404).json({ error: "Recipe not found" });
    }

    // Initialize comments as an empty array if it doesn't exist
    recipe.comments = recipe.comments || [];

    recipe.comments.push(comment);
    await recipe.save();

    res.status(200).json({ message: "Comment added successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};
const getRecipeRatings = async (req, res) => {
  try {
    const recipeId = req.params.id;
    const recipe = await Recipe.findById(recipeId);

    if (!recipe) {
      return res.status(404).json({ error: "Recipe not found" });
    }

    res.status(200).json(recipe.ratings || []);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getRecipeComments = async (req, res) => {
  try {
    const recipeId = req.params.id;
    const recipe = await Recipe.findById(recipeId);

    if (!recipe) {
      return res.status(404).json({ error: "Recipe not found" });
    }

    res.status(200).json(recipe.comments || []);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};



const getAllRecipes = async (req, res) => {
  try {
    const allRecipes = await Recipe.find();

    res.status(200).json(allRecipes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const deleteRecipe = async (req, res) => {
  try {
    const recipeId = req.params.id;

    const deletedRecipe = await Recipe.deleteOne({ _id: recipeId });

    if (!deletedRecipe.deletedCount) {
      return res.status(404).json({ error: "Recipe not found" });
    }

    const recipes = await Recipe.find();

    res.status(200).json({ message: "Recipe deleted successfully", recipes });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const LikedList = async (req, res) => {
  try {
    
    let recipe = await Recipe.findOne({ _id: req.params.id });

 
    const existingFavorite = await Liked.findOne({ title: recipe.title });

    if (existingFavorite) {
      
      return res
        .status(400)
        .json({ error: "Recipe already exists in your favorites" });
    } else {
      
      const { title, instructions, imageUrl, ingredients } = recipe;
      const newFavorite = await Liked.create({
        title,
        instructions,
        imageUrl,
        ingredients,
      });

      
      return res.status(201).json({ favoriteRecipe: newFavorite });
    }
  } catch (error) {
    
    console.error("Error in Liked:", error);
    return res.status(500).json({ error: "An internal server error occurred" });
  }
};

const getAllLikedRecipes = async (req, res) => {
  try {
    const allLikedRecipes = await Liked.find();

    res.status(200).json(allLikedRecipes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const removeFromLikedRecipes = async (req, res) => {
  try {
    const recipeId = req.params.id;

    
    const deletedLikedRecipe = await Liked.deleteOne({ _id: recipeId });

    if (!deletedLikedRecipe.deletedCount) {
      return res.status(404).json({ error: "Liked recipe not found" });
    }

    res.status(200).json({ message: "Recipe removed from liked recipes" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const searchRecipes = async (req, res) => {
  const searchKey = req.params.key;

  try {
    
    const recipes = await Recipe.find({
      title: { $regex: new RegExp(searchKey, "i") },
    });

  
    if (recipes.length === 0) {
      return res.status(404).json({ message: "No recipes found" });
    }

  
    res.status(200).json(recipes);
  } catch (error) {
    // Handle any server error and return a proper error response
    console.error("Error searching recipes:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  getAllRecipes,
  createRecipe,
  deleteRecipe,
  getAllLikedRecipes,
  LikedList,
  removeFromLikedRecipes,
  searchRecipes,
  rateRecipe,
  commentRecipe,
  getRecipeRatings,
  getRecipeComments
};
