const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: String,
  password: String,
  email: { type: String, lowercase: true },
  address: String,
  city: String,
  country: String,
  pincode: String,
  phone: String,
});


const User = mongoose.model("User", UserSchema);

const recipeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  ingredients: [String],
  instructions: {
    type: String,
    required: true,
  },
  imageUrl: String,
  ratings: [{
    type: Number,
    min: 1,
    max: 5,
  }],
  comments: [{
    type: String,
  }],
});


const Recipe = mongoose.model("Recipe", recipeSchema);

const LikedRecipes = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  ingredients: [String],
  instructions: {
    type: String,
    required: true,
  },
  imageUrl: String,
});

const Liked = mongoose.model("LikedRecipe", LikedRecipes);

module.exports = {
  User,
  Recipe,
  Liked
};

