const mongoose = require("mongoose");

const saleSchema = new mongoose.Schema({
  productName: { type: String, required: true },
  quantitySold: { type: Number, required: true },
  saleDate: { type: Date, required: true },
  totalAmount: { type: Number, required: true },
});

module.exports = mongoose.model("Sale", saleSchema);
