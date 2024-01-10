// middleware function to check for authentication using JWT
const jwt = require("jsonwebtoken");

module.exports = async(req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const user = await resourcesSchema.findOne({ _id: decoded.userId, activeToken: token });

    if (!user) {
      throw new Error("Invalid token or user not found");
    }
    req.userData = decoded;
    next();
  } catch (error) {
    next(error);
  }
};