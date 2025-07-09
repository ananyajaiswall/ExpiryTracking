const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const cron = require('node-cron');
const Product = require('./models/product');
const updateStatus = require('./utils/updateStatus');
const generateDailyReport = require('./utils/generateDailyReport');

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

cron.schedule('10 8 * * *', async () => {
  console.log("Running daily report generation...");
  try {
    const report = await generateDailyReport();

    // Save to local file (optional)
    const fs = require('fs');
    fs.writeFileSync(
      `./daily-report-${new Date().toISOString().split('T')[0]}.json`,
      JSON.stringify(report, null, 2)
    );

    console.log("✅ Daily report generated.");
  } catch (err) {
    console.error("Error generating report:", err);
  }
});
