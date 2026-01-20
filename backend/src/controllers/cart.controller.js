const cartService = require("../services/cart.service");

exports.getCart = async (req, res) => {
  const cart = await cartService.getCartByUser(req.user.id);
  res.json(cart || { items: [] });
};

exports.addToCart = async (req, res) => {
  const cart = await cartService.addToCart(
    req.user.id,
    req.body.bookId
  );
  res.status(201).json(cart);
};

exports.removeFromCart = async (req, res) => {
  const cart = await cartService.removeFromCart(
    req.user.id,
    req.params.bookId
  );
  res.json(cart);
};

exports.clearCart = async (req, res) => {
  await cartService.clearCart(req.user.id);
  res.json({ message: "Cart cleared" });
};

exports.updateQuantity = async (req, res) => {
  try {
    const cart = await cartService.updateQuantity(
      req.user.id,
      req.body.bookId,
      req.body.quantity
    );
    res.json(cart);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
