import mongoose from "mongoose";
import dotenv from "dotenv";
import Product from "./models/productModel.js";

dotenv.config();

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    await Product.deleteMany();

    await Product.insertMany([
      { name: "Perfume", price: 400, stock: 10, sold: 5, reorderLevel: 3 },
      { name: "Toothpaste", price: 40, stock: 50, sold: 30, reorderLevel: 10 },
      { name: "Shampoo", price: 50, stock: 20, sold: 15, reorderLevel: 5 },
      { name: "Facewash", price: 65, stock: 10, sold: 10, reorderLevel: 4 },
      { name: "Soap", price: 25, stock: 25, sold: 20, reorderLevel: 10 },
    ]);

    console.log("✅ Sample products added!");
    process.exit();
  })
  .catch((error) => {
    console.error("❌ Error seeding products:", error);
    process.exit(1);
  });
