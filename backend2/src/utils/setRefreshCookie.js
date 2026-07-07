const setRefreshCookie = (res, refreshToken) => {
  res.cookie("refreshToken", refreshToken, {
    httpOnly: true, // JavaScript on the frontend can't read this — protects against XSS
    secure: process.env.NODE_ENV === "production", // HTTPS-only in production
    sameSite: "strict", // helps protect against CSRF
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days in milliseconds
  });
};

module.exports = setRefreshCookie;