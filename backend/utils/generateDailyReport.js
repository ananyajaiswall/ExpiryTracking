const Product = require('../models/product');

const generateDailyReport = async () => {
  const products = await Product.find();
  const today = new Date();

  const report = {
    expired: [],
    urgent: [], // ≤ 3 days
    near_expiry: [], // 4–7 days
    fresh: []
  };

  for (let product of products) {
    const expiry = new Date(product.expiry_date);
    const diffDays = Math.ceil((expiry - today) / (1000 * 60 * 60 * 24));

    if (diffDays <= 0) {
      report.expired.push(product);
    } else if (diffDays <= 3) {
      report.urgent.push(product);
    } else if (diffDays <= 7) {
      report.near_expiry.push(product);
    } else {
      report.fresh.push(product);
    }
  }

  return report;
};

module.exports = generateDailyReport;
