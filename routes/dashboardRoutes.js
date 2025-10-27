import express from "express";
const router = express.Router();

// 📊 Dummy Dashboard Data
router.get("/", (req, res) => {
  res.json({
    topProducts: [
      { name: "Product A", sales: 120 },
      { name: "Product B", sales: 95 },
      { name: "Product C", sales: 80 },
      { name: "Product D", sales: 60 },
    ],
    revenueTrends: [
      { month: "Jan", revenue: 4000 },
      { month: "Feb", revenue: 4500 },
      { month: "Mar", revenue: 5200 },
      { month: "Apr", revenue: 6000 },
      { month: "May", revenue: 5800 },
    ],
    lowStock: [
      { name: "Product X", stock: 3 },
      { name: "Product Y", stock: 5 },
      { name: "Product Z", stock: 2 },
    ],
  });
});

export default router;








