const express = require('express');
const router = express.Router();
const Product = require('../models/product');

// Add new product
router.post('/add', async (req, res) => {
  try {
    const existing = await Product.findOne({ batch_number: req.body.batch_number });
    if (existing) {
      return res.status(400).json({ message: 'Batch already exists' });
    }

    const product = new Product(req.body);
    await product.save();
    res.status(201).json({ message: 'Product added', product });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
