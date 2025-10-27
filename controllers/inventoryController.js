// controllers/inventoryController.js
const csv = require('csv-parser');
const fs = require('fs');
const Inventory = require('../models/Inventory');

exports.uploadInventory = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const results = [];

    fs.createReadStream(req.file.path)
      .pipe(csv())
      .on('data', (row) => {
        console.log('Row received:', row);
        results.push({
          productName: row.productName,
          quantityAvailable: Number(row.quantityAvailable),
          lastUpdated: new Date(row.lastUpdated)
        });
      })
      .on('end', async () => {
        if (results.length === 0) {
          return res.status(400).json({
            message: 'CSV upload failed',
            error: 'No valid rows found in file'
          });
        }

        for (const item of results) {
          const newInventory = new Inventory(item);
          await newInventory.save();
          console.log('Saved inventory:', item);
        }

        res.status(200).json({ message: 'Inventory data uploaded successfully' });
      });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'CSV upload failed', error: error.message });
  }
};
