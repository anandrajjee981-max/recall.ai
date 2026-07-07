const User = require("../models/User.model");
const { generateAccessToken, generateRefreshToken } = require("../utils/generateTokens");
const setRefreshCookie = require("../utils/setRefreshCookie");

// Called after Passport successfully authenticates via Google or GitHub
const oauthCallback = async (req, res) => {
  const accessToken = generateAccessToken(req.user._id);
  const refreshToken = generateRefreshToken(req.user._id);

  await User.findByIdAndUpdate(req.user._id, { refreshToken });
  setRefreshCookie(res, refreshToken);

  // Redirect back to frontend with just the access token as a query param
  res.redirect(`${process.env.FRONTEND_URL}/oauth-success?token=${accessToken}`);
};

module.exports = { oauthCallback };