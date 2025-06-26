const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  product_name: String,
  barcode: String,
  category: String,
  quantity: Number,
  location: {
    aisle: String,
    shelf: String
  },
  expiry_date: Date,
  manufacture_date: Date,
  supplier: String,
  batch_number: { type: String, unique: true },
  status: { type: String, default: 'fresh' }, // fresh, near_expiry, expired
  discounted: { type: Boolean, default: false },
  donated: { type: Boolean, default: false },
  created_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Product', productSchema);
