const jwt = require("express-jwt");
const jsonwebtoken = require("jsonwebtoken");
require("dotenv").config();

const jwtMiddleware = (req, res, next) => {
  const token = req.headers["Authorization"];
  const secretKey = process.env.SECRET;
  if (!token) {
    return res.status(401).json("Token manquant");
  }
  const authToken = token.split(" ")[1];

  const isAuth = jwt.verify(authToken, secretKey, (err, user) => {
    if (err) {
      return res.status(401).json("Token invalide");
    }
    console.log("Vérification du token");
    return user;
  });

  if (isAuth) {
    req.user = decoded;
    console.log("Token valide");
    return next();
  }
};

module.exports = jwtMiddleware;
