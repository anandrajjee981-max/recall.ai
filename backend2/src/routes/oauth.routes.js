const express = require("express");
const passport = require("passport");
const { oauthCallback } = require("../controllers/oauth.controller");

const router = express.Router();

// GOOGLE
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"], session: false })
);

router.get(
  "/google/callback",
  passport.authenticate("google", { session: false, failureRedirect: "/login-failed" }),
  oauthCallback
);

// GITHUB
router.get(
  "/github",
  passport.authenticate("github", { scope: ["user:email"], session: false })
);

router.get(
  "/github/callback",
  passport.authenticate("github", { session: false, failureRedirect: "/login-failed" }),
  oauthCallback
);

module.exports = router;