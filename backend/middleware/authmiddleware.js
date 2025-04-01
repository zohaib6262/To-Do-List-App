const jwt = require("jsonwebtoken");

const authenticate = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ error: "Authorization token is required" });
  }

  const token = authorization.split(" ")[1];
  console.log("Token", token);

  if (!token) {
    return res.status(401).json({ error: "Token is missing" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded value", decoded.id);

    req.user = decoded;

    next();
  } catch (error) {
    // Handle invalid or expired token errors
    return res.status(401).json({ error: "Invalid or expired token" });
  }
};

module.exports = { authenticate };
