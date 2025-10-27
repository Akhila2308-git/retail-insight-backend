const csv = require('csv-parser');
const fs = require('fs');
const Sale = require('../models/salesModel');

// ✅ Upload Sales CSV
exports.uploadSales = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const results = [];
    const filePath = req.file.path;

    fs.createReadStream(filePath)
      .pipe(csv())
      .on('data', (row) => {
        console.log('Row received:', row);
        results.push({
          productName: row.productName,
          quantitySold: Number(row.quantitySold),
          saleDate: new Date(row.saleDate),
          totalAmount: Number(row.totalAmount),
        });
      })
      .on('end', async () => {
        try {
          await Sale.insertMany(results);
          res.status(200).json({ message: 'CSV uploaded successfully', count: results.length });
        } catch (err) {
          console.error(err);
          res.status(500).json({ message: 'Error saving sales data', error: err.message });
        }
      });
  } catch (error) {
    res.status(500).json({ message: 'CSV upload failed', error: error.message });
  }
};

// ✅ Get all sales data
exports.getSales = async (req, res) => {
  try {
    const sales = await Sale.find();
    res.status(200).json(sales);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching sales data', error: error.message });
  }
};
