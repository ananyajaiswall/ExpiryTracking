const isFresh = (mfgDate) => {
  const today = new Date();
  const mfg = new Date(mfgDate);
  const diffDays = Math.floor((today - mfg) / (1000 * 60 * 60 * 24));
  return diffDays <= 90;
};

module.exports = isFresh;