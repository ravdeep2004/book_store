module.exports = (userId, amount) => {
  console.log(`Payment successful`);
  console.log(`User ID: ${userId}, Amount: ₹${amount}`);

  return {
    status: "SUCCESS",
  };
};
