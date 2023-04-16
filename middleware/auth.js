const jwt = require("jsonwebtoken");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// verify user auth
const authorization = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ success: false, message: "Authorization token required", data: [] });
  }
  const token = authorization.split(" ")[1];
  try {
    const { _id } = jwt.verify(token, process.env.SECRET_KEY);
    req.user = await prisma.user.findUnique({
      where: { id: _id.id },
    });
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ success: false, message: "request is not authorized", data: [] });
  }
};

module.exports = authorization;
