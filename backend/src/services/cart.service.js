const Cart = require("../models/Cart");

exports.getCartByUser = async (userId) => {
  return await Cart.findOne({ userId }).populate("items.bookId");
};

exports.addToCart = async (userId, bookId) => {
  let cart = await Cart.findOne({ userId });

  if (!cart) {
    cart = await Cart.create({
      userId,
      items: [{ bookId, quantity: 1 }],
    });
    return cart;
  }

  const itemIndex = cart.items.findIndex(
    (item) => item.bookId.toString() === bookId
  );

  if (itemIndex > -1) {
    cart.items[itemIndex].quantity += 1;
  } else {
    cart.items.push({ bookId, quantity: 1 });
  }

  await cart.save();
  return cart;
};

exports.removeFromCart = async (userId, bookId) => {
  const cart = await Cart.findOne({ userId });
  if (!cart) return null;

  cart.items = cart.items.filter(
    (item) => item.bookId.toString() !== bookId
  );

  await cart.save();
  return cart;
};

exports.clearCart = async (userId) => {
  await Cart.findOneAndUpdate(
    { userId },
    { items: [] }
  );
};

exports.updateQuantity = async (userId, bookId, quantity) => {
  const cart = await Cart.findOne({ userId });
  if (!cart) throw new Error("Cart not found");

  const itemIndex = cart.items.findIndex(
    (item) => item.bookId.toString() === bookId
  );

  if (itemIndex > -1) {
    cart.items[itemIndex].quantity = quantity;
    if (cart.items[itemIndex].quantity <= 0) {
      cart.items.splice(itemIndex, 1);
    }
    await cart.save();
  }
  return cart;
};
