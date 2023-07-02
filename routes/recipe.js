const express = require('express');
const router = express.Router();
const { Recipe, category } = require('../models/recipe');
const multer = require('multer');
const fs = require('fs');
const path = require('path');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'Image/');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + file.originalname);
  }
});

const upload = multer({ storage: storage });

router.post('/recipes', upload.single('image'), async (req, res) => {
  try {
    const image = req.file.filename;
    const newRecipe = new Recipe({
      cuisineCategory: req.body.cuisineCategory,
      cuisineName: req.body.cuisineName,
      duration: req.body.duration,
      serving: req.body.serving,
      image: image
    });

    const savedRecipe = await newRecipe.save();
    res.status(200).json(savedRecipe);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/categories', async (req, res) => {
  try {
    const newCategory = new category({
      categoryName: req.body.categoryName
    });

    const savedCategory = await newCategory.save();
    res.status(200).json('Category added successfully');
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/categorylist', async (req, res) => {
  try {
    const categories = await category.find({});
    res.status(200).json(categories);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/recipeslist', async (req, res) => {
  try {
    const recipes = await Recipe.find();
    const recipesWithImageUrl = recipes.map((recipe) => {
      return {
        ...recipe._doc,
        image: `http://localhost:5000/Image/${recipe.image}`
      };
    });
    res.status(200).json(recipesWithImageUrl);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/cuisines/:categoryName', async (req, res) => {
  const { categoryName } = req.params;

  try {
    const cuisines = await Recipe.find({ cuisineCategory: categoryName });
    const cuisinesWithImageUrl = cuisines.map((cuisine) => {
      return {
        ...cuisine._doc,
        image: `http://localhost:5000/Image/${cuisine.image}`
      };
    });
    res.status(200).json(cuisinesWithImageUrl);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete('/delete/:id', async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) {
      return res.status(404).json({ error: 'Recipe not found' });
    }

    const imagePath = path.join('Image', recipe.image);
    fs.unlink(imagePath, (err) => {
      if (err) {
        console.error(err);
      }
    });

    const deleteItem = await Recipe.findByIdAndDelete(req.params.id);
    res.status(200).json('Item deleted');
  } catch (err) {
    res.json(err);
  }
});

router.put('/updateitem/:id', upload.single('image'), async (req, res) => {
  try {
    const updatedFields = {
      cuisineCategory: req.body.cuisineCategory,
      cuisineName: req.body.cuisineName,
      duration: req.body.duration,
      serving: req.body.serving
    };

    if (req.file) {
      updatedFields.image = req.file.filename;
    }

    const updateItem = await Recipe.findByIdAndUpdate(req.params.id, { $set: updatedFields });
    res.status(200).json('Item updated');
  } catch (err) {
    res.json(err);
  }
});

module.exports = router;




