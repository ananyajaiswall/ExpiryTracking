const express = require('express');
const router = express.Router();
const Product = require('../models/product');
const updateStatus = require('../utils/updateStatus');



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

// GET all products (with status auto-update)
router.get('/all', async (req, res) => {
  try {
    const products = await Product.find();
    const updated = [];

    for (let prod of products) {
      const newStatus = updateStatus(prod);
      if (prod.status !== newStatus) {
        prod.status = newStatus;
        await prod.save();
      }
      updated.push(prod);
    }

    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET product by barcode or batch_number with alert
router.get('/scan', async (req, res) => {
  try {
    const { barcode, batch_number } = req.query;

    if (!barcode && !batch_number) {
      return res.status(400).json({ message: "Provide barcode or batch_number" });
    }

    const query = barcode ? { barcode } : { batch_number };
    const product = await Product.findOne(query);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const expiryDate = new Date(product.expiry_date);
    const today = new Date();
    const daysLeft = Math.ceil((expiryDate - today) / (1000 * 60 * 60 * 24));

    let alert = "Fresh";
    if (daysLeft <= 0) alert = "Expired - Remove or Donate!";
    else if (daysLeft <= 3) alert = "⚠ Urgent: Discount or Move to Front!";
    else if (daysLeft <= 7) alert = "⏳ Nearing Expiry";

    res.json({
      product,
      alert,
      daysLeft
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
