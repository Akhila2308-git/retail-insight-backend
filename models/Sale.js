const mongoose = require('mongoose');
const SaleSchema = new mongoose.Schema({
  product: { type: mongoose.Schema.Types.ObjectId, ref:'Product' },
  sku: String,
  quantity: Number,
  price: Number,
  date: Date,
  store: String
}, { timestamps:true });
module.exports = mongoose.model('Sale', SaleSchema);
