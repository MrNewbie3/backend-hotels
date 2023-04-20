const authMiddleware = (role) => (req, res, next) => {
  const { user } = req;
  if (user.role.toUpperCase() === role.toUpperCase()) {
    return next();
  }
  return res.status(401).json({ success: false, message: `Access denied, only ${role} can access this route`, data: [] });
};

module.exports = {
  adminAuth: authMiddleware('ADMIN'),
  receptionistAuth: authMiddleware('RECEPTIONIST'),
};
