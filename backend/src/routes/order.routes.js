const router = require("express").Router();
const auth = require("../middlewares/auth.middleware");
const orderController = require("../controllers/order.controller");

router.post("/", auth, orderController.placeOrder);
router.get("/", auth, orderController.getOrders);


module.exports = router;
