const { Order_Detail } = require("../models");

const orderDetailController = {
  getAllOrderDetails: async (req, res) => {
    try {
      const orderDetails = await Order_Detail.findAll();
      res.status(200).json(orderDetails);
    } catch (error) {
      console.trace(error);
      res.status(500).json(error.toString());
    }
  },

  getOneOrderDetail: async (req, res) => {
    try {
      const orderDetail = await Order_Detail.findByPk(req.params.id);
      if (orderDetail) {
        res.status(200).json(orderDetail);
      } else {
        res.status(404).json("Détail de commande non trouvé");
      }
    } catch (error) {
      console.trace(error);
      res.status(500).json(error.toString());
    }
  },

  createOrderDetail: async (req, res) => {
    try {
      const { order_id, item_id, item_name, quantity, price } = req.body;
      const orderDetail = await Order_Detail.create({
        order_id,
        item_id,
        item_name,
        quantity,
        price,
      });
      res.status(201).json(orderDetail);
    } catch (error) {
      console.trace(error);
      res.status(500).json(error.toString());
    }
  },

  updateOrderDetail: async (req, res) => {
    try {
      const orderDetail = await Order_Detail.findByPk(req.params.id);
      if (orderDetail) {
        const { order_id, item_id, item_name, quantity, price } = req.body;
        orderDetail.order_id = order_id;
        orderDetail.item_id = item_id;
        orderDetail.item_name = item_name;
        orderDetail.quantity = quantity;
        orderDetail.price = price;
        await orderDetail.save();
        res.status(200).json(orderDetail);
      } else {
        res.status(404).json("Détail de commande non trouvé");
      }
    } catch (error) {
      console.trace(error);
      res.status(500).json(error.toString());
    }
  },

  deleteOrderDetail: async (req, res) => {
    try {
      const orderDetail = await Order_Detail.findByPk(req.params.id);
      if (orderDetail) {
        await orderDetail.destroy();
        res.status(200).json("Détail de commande supprimé");
      } else {
        res.status(404).json("Détail de commande non trouvé");
      }
    } catch (error) {
      console.trace(error);
      res.status(500).json(error.toString());
    }
  },
};

module.exports = orderDetailController;
