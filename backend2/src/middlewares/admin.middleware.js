// Must be used AFTER the `protect` middleware, since it relies on req.user being set
const requireAdmin = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Admin access required" });
  }
  next();
};

module.exports = requireAdmin;