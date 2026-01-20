const express = require("express");
const cors = require("cors");
const cartRoutes = require("./routes/cart.routes");
const authRoutes = require("./routes/auth.routes");
const orderRoutes = require("./routes/order.routes");
const bookRoutes = require("./routes/book.routes");
const reviewRoutes = require("./routes/review.routes");
const addressRoutes = require("./routes/address.routes");
const passport = require("passport");
require("./config/passport");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/cart", cartRoutes);
app.use("/orders", orderRoutes);
app.use("/auth", authRoutes);
app.use("/books", bookRoutes);
app.use("/reviews", reviewRoutes);
app.use("/addresses", addressRoutes);
app.use(passport.initialize());

app.get("/", (req, res) => {
  res.send("Book Store API Running");
});


app.use((err, req, res, next) => {
  console.error("Backend Error Mapper:", err);
  res.status(err.status || 500).json({
    message: err.message || "Something went wrong.",
    error: process.env.NODE_ENV === 'development' ? err : {}
  });
});

module.exports = app;
