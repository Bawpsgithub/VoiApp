const Order = require("../models/order");

const orderController = {
  // Create an order
  create: async (req, res) => {
    try {
      const { user, drinks, totalPrice, table } = req.body;

      const newOrder = new Order({
        user,
        drinks,
        totalPrice,
        table,
      });

      const order = await newOrder.save();
      res.json(order);
    } catch (error) {
      res.status(400).json(error);
    }
  },

  // Get all orders
  getAll: async (req, res) => {
    try {
      const orders = await Order.find();
      res.json(orders);
    } catch (error) {
      res.status(500).json(error);
    }
  },
};

module.exports = orderController;
