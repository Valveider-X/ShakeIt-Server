const jwt = require("jsonwebtoken");

function isTokenValid(req, res, next) {
  try {
    const token = req.headers.authorization.split(" ")[1];

    const payload = jwt.verify(token, process.env.TOKEN_SECRET);
    req.payload = payload;
    next();
  } catch (error) {
    res.status(401).json({ errorMessage: "Token not valid or does not exist" });
  }
}
module.exports = {
  isTokenValid,
};
