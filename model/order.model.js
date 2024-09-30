const mongoose = require("mongoose")
const orderSchemal = new mongoose.Schema(
    {
      user_id: String,
      cart_id: String,
      userInfo: {
        fullName: String,
        phone: String,
        address: String
      },
      products: [
        {
          product_id: String,
          price: Number,
          discountPercentage: Number,
          quantity: Number,
        },
      ],
    },
    {
      timestamps: true,
    }
  );
  const Order = mongoose.model("Order", orderSchemal, "orders")
  module.exports = Order