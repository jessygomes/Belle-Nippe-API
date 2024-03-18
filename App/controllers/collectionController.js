const { Collection } = require("../models");

const collectionController = {
  getAllCollections: async (req, res) => {
    try {
      const collections = await Collection.findAll();
      res.status(200).json(collections);
    } catch (error) {
      console.trace(error);
      res.status(500).json(error.toString());
    }
  },

  getItemOfCollection: async (req, res) => {
    try {
      const collection = await Collection.findByPk(req.params.id, {
        include: "items",
      });
      if (collection) {
        res.status(200).json(collection.items);
      } else {
        res.status(404).json("Collection non trouvée");
      }
    } catch (error) {
      console.trace(error);
      res.status(500).json(error.toString());
    }
  },

  getOneCollection: async (req, res) => {
    try {
      const collection = await Collection.findByPk(req.params.id);
      if (collection) {
        res.status(200).json(collection);
      } else {
        res.status(404).json("Collection non trouvée");
      }
    } catch (error) {
      console.trace(error);
      res.status(500).json(error.toString());
    }
  },

  createCollection: async (req, res) => {
    try {
      const { title_collection, description_collection, is_active, image_id } =
        req.body;
      const collection = await Collection.create({
        title_collection,
        description_collection,
        is_active,
        image_id,
      });
      res.status(201).json(collection);
    } catch (error) {
      console.trace(error);
      res.status(500).json(error.toString());
    }
  },

  updateCollection: async (req, res) => {
    try {
      const collection = await Collection.findByPk(req.params.id);
      const { title_collection, description_collection, is_active, image_id } =
        req.body;
      if (collection) {
        await collection.update({
          title_collection,
          description_collection,
          is_active,
          image_id,
        });
        res.status(200).json(collection);
      } else {
        res.status(404).json("Collection non trouvée");
      }
    } catch (error) {
      console.trace(error);
      res.status(500).json(error.toString());
    }
  },

  deleteCollection: async (req, res) => {
    try {
      const collection = await Collection.findByPk(req.params.id);
      if (collection) {
        await collection.destroy();
        res.status(200).json("Collection supprimée");
      } else {
        res.status(404).json("Collection non trouvée");
      }
    } catch (error) {
      console.trace(error);
      res.status(500).json(error.toString());
    }
  },
};

module.exports = collectionController;
