export const getInsights = async (req, res) => {
  try {
    const topProducts = [
      { name: "Perfume", revenue: 2000, quantitySold: 5 },
      { name: "Toothpaste", revenue: 1200, quantitySold: 30 },
      { name: "Shampoo", revenue: 750, quantitySold: 15 },
      { name: "Facewash", revenue: 650, quantitySold: 10 },
      { name: "Soap", revenue: 500, quantitySold: 20 },
    ];

    const totalRevenue = topProducts.reduce((acc, p) => acc + p.revenue, 0);
    const totalItemsSold = topProducts.reduce((acc, p) => acc + p.quantitySold, 0);
    const inventoryValue = totalRevenue * 0.6; // Just an example calculation

    res.json({
      totalRevenue,
      totalItemsSold,
      inventoryValue,
      topProducts,
    });
  } catch (error) {
    console.error("Error generating insights:", error);
    res.status(500).json({ error: "Failed to fetch insights" });
  }
};
