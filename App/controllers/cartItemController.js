const { Cart_Item } = require("../models");

const cartItemController = {
  getAllCartItems: async (req, res) => {
    try {
      const cartItems = await Cart_Item.findAll();
      res.status(200).json(cartItems);
    } catch (error) {
      console.trace(error);
      res.status(500).json(error.toString());
    }
  },

  getOneCartItem: async (req, res) => {
    try {
      const cartItem = await Cart_Item.findByPk(req.params.id);
      if (cartItem) {
        res.status(200).json(cartItem);
      } else {
        res.status(404).json("Article non trouvé");
      }
    } catch (error) {
      console.trace(error);
      res.status(500).json(error.toString());
    }
  },

  createCartItem: async (req, res) => {
    try {
      const { cart_id, item_id, quantity } = req.body;
      const cartItem = await Cart_Item.create({
        cart_id,
        item_id,
        quantity,
      });
      res.status(201).json(cartItem);
    } catch (error) {
      console.trace(error);
      res.status(500).json(error.toString());
    }
  },

  updateCartItem: async (req, res) => {
    try {
      const cartItem = await Cart_Item.findByPk(req.params.id);
      const { cart_id, item_id, quantity } = req.body;
      if (cartItem) {
        await cartItem.update({ cart_id, item_id, quantity });
        res.status(200).json(cartItem);
      } else {
        res.status(404).json("Article non trouvé");
      }
    } catch (error) {
      console.trace(error);
      res.status(500).json(error.toString());
    }
  },

  deleteCartItem: async (req, res) => {
    try {
      const cartItem = await Cart_Item.findByPk(req.params.id);
      if (cartItem) {
        await cartItem.destroy();
        res.status(200).json("Article supprimé");
      } else {
        res.status(404).json("Article non trouvé");
      }
    } catch (error) {
      console.trace(error);
      res.status(500).json(error.toString());
    }
  },
};

module.exports = cartItemController;
