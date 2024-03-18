const { Category } = require("../models");

const categoryController = {
  getAllCategories: async (req, res) => {
    try {
      const categories = await Category.findAll();
      res.status(200).json(categories);
    } catch (error) {
      console.trace(error);
      res.status(500).json(error.toString());
    }
  },

  getItemsOfCategory: async (req, res) => {
    try {
      const category = await Category.findByPk(req.params.id, {
        include: "items",
      });
      if (category) {
        res.status(200).json(category.items);
      } else {
        res.status(404).json("Catégorie non trouvée");
      }
    } catch (error) {
      console.trace(error);
      res.status(500).json(error.toString());
    }
  },

  getOneCategory: async (req, res) => {
    try {
      const category = await Category.findByPk(req.params.id);
      if (category) {
        res.status(200).json(category);
      } else {
        res.status(404).json("Catégorie non trouvée");
      }
    } catch (error) {
      console.trace(error);
      res.status(500).json(error.toString());
    }
  },

  createCategory: async (req, res) => {
    try {
      const { name_category } = req.body;
      const category = await Category.create({
        name_category,
      });
      res.status(201).json(category);
    } catch (error) {
      console.trace(error);
      res.status(500).json(error.toString());
    }
  },

  deleteCategory: async (req, res) => {
    try {
      const category = await Category.findByPk(req.params.id);
      if (category) {
        await category.destroy();
        res.status(200).json("Catégorie supprimée");
      } else {
        res.status(404).json("Catégorie non trouvée");
      }
    } catch (error) {
      console.trace(error);
      res.status(500).json(error.toString());
    }
  },
};

module.exports = categoryController;
