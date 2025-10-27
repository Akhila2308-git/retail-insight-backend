// routes/inventoryRoutes.js
const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const inventoryController = require('../controllers/inventoryController');

const upload = multer({
  dest: path.join(__dirname, '../uploads/')
});

router.post('/upload', upload.single('file'), inventoryController.uploadInventory);

module.exports = router;

