module.exports = (req, res, next) => {
  const adminSecret = process.env.ADMIN_SECRET;
  const sentSecret = req.headers["x-admin-secret"];
  if (!sentSecret || sentSecret !== adminSecret) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  next();
};
