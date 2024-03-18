const { Item } = require("../models");
const { Image } = require("../models");

const itemController = {
  getAllItems: async (req, res) => {
    try {
      const items = await Item.findAll({
        include: "images",
      });
      res.status(200).json(items);
    } catch (error) {
      console.trace(error);
      res.status(500).json(error.toString());
    }
  },

  getItemOfCollection: async (req, res) => {
    try {
      const item = await Item.findByPk(req.params.id, {
        include: "collections",
      });
      if (item) {
        res.status(200).json(item.collections);
      } else {
        res.status(404).json("Item non trouvé");
      }
    } catch (error) {
      console.trace(error);
      res.status(500).json(error.toString());
    }
  },

  getItemOfCategory: async (req, res) => {
    try {
      const item = await Item.findByPk(req.params.id, {
        include: "categories",
      });
      if (item) {
        res.status(200).json(item.categories);
      } else {
        res.status(404).json("Item non trouvé");
      }
    } catch (error) {
      console.trace(error);
      res.status(500).json(error.toString());
    }
  },

  getOneItem: async (req, res) => {
    try {
      const item = await Item.findByPk(req.params.id, {
        include: "images", // Inclut les images liées à l'item
      });
      if (item) {
        res.status(200).json(item);
      } else {
        res.status(404).json("Item non trouvé");
      }
    } catch (error) {
      console.trace(error);
      res.status(500).json(error.toString());
    }
  },

  createItem: async (req, res) => {
    try {
      const {
        title,
        slug,
        description,
        price,
        size,
        stock,
        quantity,
        collection_id,
        category_id,
        is_active,
      } = req.body;
      const item = await Item.create({
        title,
        slug,
        description,
        price,
        size,
        stock,
        quantity,
        collection_id,
        category_id,
        is_active,
      });
      if (req.files) {
        for (let i = 0; i < req.files.length; i++) {
          const image = await Image.create({ url: req.files[i].path });
          await item.addImage(image); // Associer l'image à l'item
        }
      }
      res.status(201).json(item);
    } catch (error) {
      console.trace(error);
      res.status(500).json(error.toString());
    }
  },

  updateItem: async (req, res) => {
    try {
      const item = await Item.findByPk(req.params.id);
      const {
        title,
        slug,
        description,
        price,
        size,
        stock,
        quantity,
        collection_id,
        category_id,
        is_active,
      } = req.body;
      if (item) {
        await item.update({
          title,
          slug,
          description,
          price,
          size,
          stock,
          quantity,
          collection_id,
          category_id,
          is_active,
        });

        if (req.files) {
          for (let i = 0; i < req.files.length; i++) {
            const image = await Image.findByPk(req.files[i].id);
            if (image) {
              const itemImages = await item.getImages(); // On récupère toutes les images de l'item
              const imageBelongsToItem = itemImages.some(
                (itemImage) => itemImage.id === image.id
              ); // On vérifie si l'image appartient à l'item
              if (imageBelongsToItem) {
                await image.update({ url: req.files[i].path });
              } else {
                res
                  .status(400)
                  .json(
                    `L'image avec l'ID ${req.files[i].id} n'appartient pas à l'item`
                  );
                return; // On stoppe l'exécution
              }
            } else {
              res
                .status(404)
                .json(`Image avec l'ID ${req.files[i].id} non trouvée`);
              return; // stop execution
            }
          }
        }

        res.status(200).json(item);
      } else {
        res.status(404).json("Item non trouvé");
      }
    } catch (error) {
      console.trace(error);
      res.status(500).json(error.toString());
    }
  },

  deleteItem: async (req, res) => {
    try {
      const item = await Item.findByPk(req.params.id);
      if (item) {
        const images = await item.getImages();
        for (let i = 0; i < images.length; i++) {
          await images[i].destroy();
        }
        await item.destroy();
        res.status(200).json("Item et ses images supprimés");
      } else {
        res.status(404).json("Item non trouvé");
      }
    } catch (error) {
      console.trace(error);
      res.status(500).json(error.toString());
    }
  },

  getImagesOfItem: async (req, res) => {
    try {
      const item = await Item.findByPk(req.params.id, {
        include: "images",
      });
      if (item) {
        res.status(200).json(item.images);
      } else {
        res.status(404).json("Item non trouvé");
      }
    } catch (error) {
      console.trace(error);
      res.status(500).json(error.toString());
    }
  },

  addImageToItem: async (req, res) => {
    try {
      const item = await Item.findByPk(req.params.id);
      if (item) {
        if (req.file) {
          const image = await Image.create({ url: req.file.path });
          await item.addImage(image);
          res.status(201).json("Image ajoutée à l'article");
        } else {
          res.status(400).json("Aucun fichier n'a été téléchargé");
        }
      } else {
        res.status(404).json("Item non trouvé");
      }
    } catch (error) {
      console.trace(error);
      res.status(500).json(error.toString());
    }
  },

  deleteImageOfItem: async (req, res) => {
    try {
      const item = await Item.findByPk(req.params.itemId);
      if (item) {
        const image = await Image.findByPk(req.params.imageId);
        if (image) {
          const itemImages = await item.getImages(); // get all images of the item
          const imageBelongsToItem = itemImages.some(
            (itemImage) => itemImage.id === image.id
          ); // check if the image belongs to the item
          if (imageBelongsToItem) {
            await image.destroy();
            res.status(200).json("Image supprimée");
          } else {
            res
              .status(400)
              .json(
                `L'image avec l'ID ${req.params.imageId} n'appartient pas à l'item`
              );
          }
        } else {
          res
            .status(404)
            .json(`Image avec l'ID ${req.params.imageId} non trouvée`);
        }
      } else {
        res.status(404).json("Item non trouvé");
      }
    } catch (error) {
      console.trace(error);
      res.status(500).json(error.toString());
    }
  },
};

module.exports = itemController;
