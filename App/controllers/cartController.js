const { Cart } = require("../models");

const cartController = {
  getAllCarts: async (req, res) => {
    try {
      const carts = await Cart.findAll();
      res.status(200).json(carts);
    } catch (error) {
      console.trace(error);
      res.status(500).json(error.toString());
    }
  },

  getOneCartWithCartItems: async (req, res) => {
    try {
      const cart = await Cart.findByPk(req.params.id, {
        include: "cart_items",
      });
      if (cart) {
        res.status(200).json(cart.cart_items);
      } else {
        res.status(404).json("Panier non trouvé");
      }
    } catch (error) {
      console.trace(error);
      res.status(500).json(error.toString());
    }
  },

  getOneCart: async (req, res) => {
    try {
      const cart = await Cart.findByPk(req.params.id);
      if (cart) {
        res.status(200).json(cart);
      } else {
        res.status(404).json("Panier non trouvé");
      }
    } catch (error) {
      console.trace(error);
      res.status(500).json(error.toString());
    }
  },

  createCart: async (req, res) => {
    try {
      const { user_id, total } = req.body;
      const cart = await Cart.create({
        user_id,
        total,
      });
      res.status(201).json(cart);
    } catch (error) {
      console.trace(error);
      res.status(500).json(error.toString());
    }
  },

  updateCart: async (req, res) => {
    try {
      const cart = await Cart.findByPk(req.params.id);
      const { user_id, total } = req.body;
      if (cart) {
        await cart.update({ user_id, total });
        res.status(200).json(cart);
      } else {
        res.status(404).json("Panier non trouvé");
      }
    } catch (error) {
      console.trace(error);
      res.status(500).json(error.toString());
    }
  },

  deleteCart: async (req, res) => {
    try {
      const cart = await Cart.findByPk(req.params.id);
      if (cart) {
        await cart.destroy();
        res.status(200).json("Panier supprimé");
      } else {
        res.status(404).json("Panier non trouvé");
      }
    } catch (error) {
      console.trace(error);
      res.status(500).json(error.toString());
    }
  },
};

module.exports = cartController;
