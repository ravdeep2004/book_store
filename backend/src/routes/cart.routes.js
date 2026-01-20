const router = require("express").Router();
const auth = require("../middlewares/auth.middleware");
const cartController = require("../controllers/cart.controller");

router.get("/", auth, cartController.getCart);
router.post("/add", auth, cartController.addToCart);
router.put("/update-quantity", auth, cartController.updateQuantity);
router.delete("/remove/:bookId", auth, cartController.removeFromCart);
router.delete("/clear", auth, cartController.clearCart);

module.exports = router;
