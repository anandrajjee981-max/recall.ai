const jwt = require("jsonwebtoken");
const User = require("../models/User.model");
const { generateAccessToken, generateRefreshToken } = require("../utils/generateTokens");
const setRefreshCookie = require("../utils/setRefreshCookie");

// @route  POST /api/auth/signup
const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already registered" });
    }

    const user = await User.create({ name, email, password });

    const accessToken = generateAccessToken(user._id);
    const refreshToken = generateRefreshToken(user._id);

    user.refreshToken = refreshToken;
    await user.save();

    setRefreshCookie(res, refreshToken);

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      accessToken,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @route  POST /api/auth/login
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const accessToken = generateAccessToken(user._id);
    const refreshToken = generateRefreshToken(user._id);

    user.refreshToken = refreshToken;
    await user.save();

    setRefreshCookie(res, refreshToken);

    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      accessToken,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @route  POST /api/auth/refresh
// @desc   Issue a new access token using the refresh token cookie
const refreshAccessToken = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
      return res.status(401).json({ message: "No refresh token provided" });
    }

    let decoded;
    try {
      decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
    } catch (err) {
      return res.status(403).json({ message: "Invalid or expired refresh token" });
    }

    // Confirm this exact refresh token is the one we have stored (not an old/revoked one)
    const user = await User.findById(decoded.id).select("+refreshToken");
    if (!user || user.refreshToken !== refreshToken) {
      return res.status(403).json({ message: "Refresh token not recognized" });
    }

    const newAccessToken = generateAccessToken(user._id);

    res.status(200).json({ accessToken: newAccessToken });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @route  POST /api/auth/logout
const logout = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;

    if (refreshToken) {
      try {
        const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
        await User.findByIdAndUpdate(decoded.id, { refreshToken: null });
      } catch (err) {
        // Token was already invalid/expired — nothing to clean up, just proceed
      }
    }

    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = { signup, login, refreshAccessToken, logout };