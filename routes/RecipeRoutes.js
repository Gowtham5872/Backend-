const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/middleware.js");

const {
  getAllRecipes,
  createRecipe,
  deleteRecipe,
  LikedList,
  getAllLikedRecipes,
  removeFromLikedRecipes,
  searchRecipes,
  rateRecipe,
  commentRecipe,
  getRecipeRatings,
  getRecipeComments,
} = require("../controller/RecipeController.js");

router.post("/recipe", createRecipe);
router.get("/recipe", verifyToken, getAllRecipes);
router.get("/likedRecipes", getAllLikedRecipes);
router.delete("/recipe/:id", deleteRecipe);
router.post("/likedRecipes/:id", LikedList);
router.delete("/removeLiked/:id", removeFromLikedRecipes);
router.get("/searchRecipes/:key", searchRecipes);
router.post("/recipe/:id/rate", rateRecipe);
router.post("/recipe/:id/comment", commentRecipe);
router.get("/recipe/:id/ratings", getRecipeRatings);
router.get("/recipe/:id/comments", getRecipeComments);

module.exports = router;

