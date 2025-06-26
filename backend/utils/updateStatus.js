const updateStatus = (product) => {
  const today = new Date();
  const expiry = new Date(product.expiry_date);
  const diffDays = Math.ceil((expiry - today) / (1000 * 60 * 60 * 24));

  if (diffDays <= 0) return "expired";
  else if (diffDays <= 3) return "near_expiry";
  else return "fresh";
};

module.exports = updateStatus;
