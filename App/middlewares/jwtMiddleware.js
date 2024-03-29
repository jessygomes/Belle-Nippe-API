const jwt = require("jsonwebtoken");
require("dotenv").config();

const jwtMiddleware = (req, res, next) => {
  const token = req.headers.Authorization || req.headers.authorization;
  const secretKey = process.env.SECRET;
  if (!token) {
    return res.status(401).json("Token manquant");
  }
  const authToken = token.split(" ")[1];

  jwt.verify(authToken, secretKey, (err, user) => {
    if (err) {
      return res.status(401).json("Token invalide");
    }
    console.log("Vérification du token");
    req.user = user;
    console.log("Token valide");
    return next();
  });
};

module.exports = jwtMiddleware;
