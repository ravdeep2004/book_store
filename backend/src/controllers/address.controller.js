const addressService = require("../services/address.service");

exports.createAddress = async (req, res) => {
  try {
    const address = await addressService.createAddress(
      req.user.id,
      req.body
    );
    res.status(201).json(address);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.getAddresses = async (req, res) => {
  const addresses = await addressService.getAddresses(req.user.id);
  res.json(addresses);
};

exports.updateAddress = async (req, res) => {
  try {
    const address = await addressService.updateAddress(
      req.user.id,
      req.params.id,
      req.body
    );
    res.json(address);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

exports.deleteAddress = async (req, res) => {
  try {
    await addressService.deleteAddress(req.user.id, req.params.id);
    res.json({ message: "Address deleted" });
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
