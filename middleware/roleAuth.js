const adminAuth = (req, res, next) => {
  const user = req.user;
  if (user.role.toUpperCase() === "ADMIN") {
    return next();
  }
  return res.status(401).json({ success: false, message: "Access denied, only admin can access this routes", data: [] });
};

const receptionistAuth = (req, res, next) => {
  const user = req.user;
  if (user.role.toUpperCase() === "RECEPTIONIST") {
    return next();
  }
  return res.status(401).json({ success: false, message: "Access denied, only receptionist can access this routes", data: [] });
};

module.exports = { adminAuth, receptionistAuth };
