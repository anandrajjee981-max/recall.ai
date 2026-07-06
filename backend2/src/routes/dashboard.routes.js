const express = require("express");
const protect = require("../middlewares/auth.middleware");
const { getDashboard } = require("../controllers/dashboard.controller");

const router = express.Router();

router.use(protect);

router.get("/", getDashboard);

module.exports = router;