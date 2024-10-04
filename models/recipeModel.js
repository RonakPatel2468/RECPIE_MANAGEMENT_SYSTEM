const mongoose = require('mongoose');

// Define the recipe schema
const recipeSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'A recipe must have a title'],
      trim: true,
    },
    ingredients: {
      type: [String], // Array of strings to store multiple ingredients
      required: [true, 'A recipe must have ingredients'],
    },
    instructions: {
      type: String,
      required: [true, 'A recipe must have instructions'],
    },
    cuisineType: {
      type: String,
      enum: ['Indian', 'Chinese', 'Mexican', 'Italian', 'American', 'Other'],
      required: [true, 'A recipe must have a cuisine type'],
    },
    prepTime: {
      type: Number, // Time in minutes
      required: [true, 'A recipe must have a preparation time'],
    },
    cookTime: {
      type: Number, // Time in minutes
      required: [true, 'A recipe must have a cook time'],
    },
    servings: {
      type: Number,
      required: [true, 'A recipe must have the number of servings'],
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', // Reference to the User model
      required: [true, 'A recipe must have an author'],
    },
    imageUrl: {
      type: String,
      default: 'default.jpg', // Optional field for image URL
    },
    ratingsAverage: {
      type: Number,
      default: 4.5,
      min: [1, 'Rating must be at least 1.0'],
      max: [5, 'Rating must be at most 5.0'],
    },
    ratingsQuantity: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

// Create a model from the schema
const Recipe = mongoose.model('Recipe', recipeSchema);

module.exports = Recipe;
