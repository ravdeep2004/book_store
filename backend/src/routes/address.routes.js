const router = require("express").Router();
const auth = require("../middlewares/auth.middleware");
const addressController = require("../controllers/address.controller");

router.post("/", auth, addressController.createAddress);
router.get("/", auth, addressController.getAddresses);
router.put("/:id", auth, addressController.updateAddress);
router.delete("/:id", auth, addressController.deleteAddress);

module.exports = router;
