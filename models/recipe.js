const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const recipeSchema = new Schema(
  {
    cuisineCategory: { type: String, required: true },
    cuisineName: { type: String },
    duration: { type: Number },
    serving: { type: Number},
    image: { type: String },
  },
  {
    timestamps: true,
  }
);

const categorySchema = new Schema(
  {
    categoryName: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const Recipe = mongoose.model('Recipe', recipeSchema);
const category = mongoose.model('category', categorySchema);

module.exports = { Recipe, category };