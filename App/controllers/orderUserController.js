const { Order_User } = require("../models");

const orderUserController = {
  getAllOrderUsers: async (req, res) => {
    try {
      const orderUsers = await Order_User.findAll();
      res.status(200).json(orderUsers);
    } catch (error) {
      console.trace(error);
      res.status(500).json(error.toString());
    }
  },

  getOneOrderUser: async (req, res) => {
    try {
      const orderUser = await Order_User.findByPk(req.params.id);
      if (orderUser) {
        res.status(200).json(orderUser);
      } else {
        res.status(404).json("Commande non trouvée");
      }
    } catch (error) {
      console.trace(error);
      res.status(500).json(error.toString());
    }
  },

  getOneOrderUserWithOrderDetail: async (req, res) => {
    try {
      const orderUser = await Order_User.findByPk(req.params.id, {
        include: "order_detail",
      });
      if (orderUser) {
        res.status(200).json(orderUser);
      } else {
        res.status(404).json("Commande non trouvée");
      }
    } catch (error) {
      console.trace(error);
      res.status(500).json(error.toString());
    }
  },

  createOrderUser: async (req, res) => {
    try {
      const { user_id, total, status } = req.body;
      const orderUser = await Order_User.create({
        user_id,
        total,
        status,
      });
      res.status(201).json(orderUser);
    } catch (error) {
      console.trace(error);
      res.status(500).json(error.toString());
    }
  },

  updateOrderUser: async (req, res) => {
    try {
      const orderUser = await Order_User.findByPk(req.params.id);
      const { user_id, total, status } = req.body;
      if (orderUser) {
        await orderUser.update({ user_id, total, status });
        res.status(200).json(orderUser);
      } else {
        res.status(404).json("Commande non trouvée");
      }
    } catch (error) {
      console.trace(error);
      res.status(500).json(error.toString());
    }
  },

  deleteOrderUser: async (req, res) => {
    try {
      const orderUser = await Order_User.findByPk(req.params.id);
      if (orderUser) {
        await orderUser.destroy();
        res.status(200).json("Commande supprimée");
      } else {
        res.status(404).json("Commande non trouvée");
      }
    } catch (error) {
      console.trace(error);
      res.status(500).json(error.toString());
    }
  },
};

module.exports = orderUserController;
