const Cart = require("../models/Cart");
const Order = require("../models/Order");
const Address = require("../models/Address");
const mockPayment = require("../utils/mockPayment");

exports.placeOrder = async (userId, addressId) => {
  //validate address
  const address = await Address.findOne({ _id: addressId, userId });
  if (!address) throw new Error("Invalid address");

  //fetch cart
  const cart = await Cart.findOne({ userId }).populate("items.bookId");
  if (!cart || cart.items.length === 0) {
    throw new Error("Cart is empty");
  }

  //total
  let total = 0;
  cart.items.forEach((item) => {
    total += item.bookId.price * item.quantity;
  });

  //mock payment
  const paymentResult = mockPayment(userId, total);
  if (paymentResult.status !== "SUCCESS") {
    throw new Error("Payment failed");
  }

  //create order
  const order = await Order.create({
    userId,
    addressId,
    items: cart.items.map((item) => ({
      bookId: item.bookId._id,
      quantity: item.quantity,
    })),
    totalAmount: total,
    paymentStatus: "SUCCESS",
  });

  //clear cart
  cart.items = [];
  await cart.save();

  return order;
};

//order history
exports.getOrdersByUser = async (userId) => {
  return await Order.find({ userId })
    .populate("items.bookId")
    .populate("addressId")
    .sort({ createdAt: -1 });
};
