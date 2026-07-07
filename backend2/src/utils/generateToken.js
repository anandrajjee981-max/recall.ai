const jwt = require("jsonwebtoken");

// Short-lived — used to authenticate normal API requests
const generateAccessToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: "15m",
  });
};

// Long-lived — used only to get a new access token when it expires
const generateRefreshToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_REFRESH_SECRET, {
    expiresIn: "30d",
  });
};

module.exports = { generateAccessToken, generateRefreshToken };