import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  stock: Number,
  sold: Number,
  reorderLevel: Number,
});

const Product = mongoose.model("Product", productSchema);
export default Product;
