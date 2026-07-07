const express = require("express");
const { signup, login, refreshAccessToken, logout } = require("../controllers/auth.controller");
const validate = require("../middlewares/validate.middleware");
const { signupSchema, loginSchema } = require("../validators/auth.validator");

const router = express.Router();

router.post("/signup", validate(signupSchema), signup);
router.post("/login", validate(loginSchema), login);
router.post("/refresh", refreshAccessToken);
router.post("/logout", logout);

module.exports = router;