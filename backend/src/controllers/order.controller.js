const orderService = require("../services/orders.service");

exports.placeOrder = async (req, res) => {
  try {
    const { addressId } = req.body;

    if (!addressId) {
      return res.status(400).json({ message: "Address is required" });
    }

    const order = await orderService.placeOrder(
      req.user.id,
      addressId
    );

    res.status(201).json(order);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.getOrders = async (req, res) => {
  const orders = await orderService.getOrdersByUser(req.user.id);
  res.json(orders);
};
