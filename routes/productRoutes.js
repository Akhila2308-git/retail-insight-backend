const express = require("express");
const router = express.Router();

// Example route — you can modify this later
router.get("/", (req, res) => {
  res.json([{ name: "Sample Product", price: 100 }]);
});

module.exports = router;
