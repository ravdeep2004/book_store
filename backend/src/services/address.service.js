const Address = require("../models/Address");

exports.createAddress = async (userId, data) => {
  return await Address.create({ ...data, userId });
};

exports.getAddresses = async (userId) => {
  return await Address.find({ userId });
};

exports.updateAddress = async (userId, addressId, data) => {
  const address = await Address.findOneAndUpdate(
    { _id: addressId, userId },
    data,
    { new: true }
  );
  if (!address) throw new Error("Address not found");
  return address;
};

exports.deleteAddress = async (userId, addressId) => {
  const address = await Address.findOneAndDelete({
    _id: addressId,
    userId,
  });
  if (!address) throw new Error("Address not found");
};
