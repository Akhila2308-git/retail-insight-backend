const Sale = require("../models/salesModel");
const Inventory = require("../models/inventoryModel");

// Dashboard data controller
exports.getDashboardData = async (req, res) => {
  try {
    // Top-selling products
    const topProducts = await Sale.aggregate([
      {
        $group: {
          _id: "$productName",
          totalSold: { $sum: "$quantitySold" },
        },
      },
      { $sort: { totalSold: -1 } },
      { $limit: 5 },
    ]);

    // Revenue trend (by date)
    const revenueTrends = await Sale.aggregate([
      {
        $group: {
          _id: "$saleDate",
          totalRevenue: { $sum: "$totalAmount" },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    // Low stock items
    const lowStock = await Inventory.find({ stockQuantity: { $lt: 10 } });

    res.json({ topProducts, revenueTrends, lowStock });
  } catch (error) {
    console.error("Dashboard data fetch failed:", error);
    res.status(500).json({ message: "Error fetching dashboard data" });
  }
};




 
