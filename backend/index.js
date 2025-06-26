const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const cron = require('node-cron');
const Product = require('./models/product');
const updateStatus = require('./utils/updateStatus');

const productRoutes = require('./routes/products');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("MongoDB connected"))
.catch(err => console.log("Mongo error:", err));

app.use('/api/products', productRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

cron.schedule('* * * * *', async () => {
  console.log("Running test cron...");
  try {
    const products = await Product.find();
    for (let prod of products) {
      const newStatus = updateStatus(prod);
      if (prod.status !== newStatus) {
        prod.status = newStatus;
        await prod.save();
      }
    }
  } catch (err) {
    console.error("Error in cron job:", err);
  }
});