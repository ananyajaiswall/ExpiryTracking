const express = require('express');
const router = express.Router();
const Product = require('../models/product');
const updateStatus = require('../utils/updateStatus');
const generateDailyReport = require('../utils/generateDailyReport');

// ✅ Add new product
router.post('/add', async (req, res) => {
  try {
    const batchNumber = req.body.batchNumber?.trim(); // 🟡 Trim + camelCase

    if (!batchNumber) {
      return res.status(400).json({ message: 'Batch number is required' });
    }

    // ✅ Use correct key name for check
    const existing = await Product.findOne({ batchNumber });

    if (existing) {
      return res.status(400).json({ message: 'Batch already exists' });
    }

    const product = new Product({ ...req.body, batchNumber });
    await product.save();
    res.status(201).json({ message: 'Product added', product });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ Get all products with status updated
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

// ✅ Scan product by barcode or batchNumber
router.get('/scan', async (req, res) => {
  try {
    const { barcode, batchNumber } = req.query;

    if (!barcode && !batchNumber) {
      return res.status(400).json({ message: "Provide barcode or batchNumber" });
    }

    const query = barcode ? { barcode } : { batchNumber };
    const product = await Product.findOne(query);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const expiryDate = new Date(product.expiryDate);
    const today = new Date();
    const daysLeft = Math.ceil((expiryDate - today) / (1000 * 60 * 60 * 24));

    let alert = "Fresh";
    if (daysLeft <= 0) alert = "Expired - Remove or Donate!";
    else if (daysLeft <= 3) alert = "⚠ Urgent: Discount or Move to Front!";
    else if (daysLeft <= 7) alert = "⏳ Nearing Expiry";

    res.json({ product, alert, daysLeft });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ Generate daily report
router.get('/report/daily', async (req, res) => {
  try {
    const report = await generateDailyReport();
    res.json(report);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ Product action endpoint (discount, donate, remove)
router.patch('/:id/action', async (req, res) => {
  const { action, staff } = req.body;

  if (!['discount', 'donate', 'remove'].includes(action)) {
    return res.status(400).json({ message: "Invalid action" });
  }

  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    if (action === 'discount') product.discounted = true;
    if (action === 'donate') product.donated = true;
    if (action === 'remove') product.removed = true;

    product.action_history = product.action_history || [];
    product.action_history.push({
      action,
      performed_by: staff || "unknown",
      timestamp: new Date()
    });

    await product.save();
    res.json({ message: `Product marked as ${action}`, product });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
