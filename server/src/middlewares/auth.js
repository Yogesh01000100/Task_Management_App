require("dotenv").config();
const jwt = require("jsonwebtoken");

function authenticateToken(req, res, next) {
  const token = req.headers["authorization"];
  if (!token) return res.sendStatus(403);

  jwt.verify(token.split(" ")[1], process.env.SECRET_KEY, (err, user) => {
    if (err) {
      console.log("Token verification failed:", err.message);
      return res
        .status(403)
        .json({ error: "Invalid token", message: err.message });
    }
    req.user = user;
    next();
  });
}

module.exports = authenticateToken;
