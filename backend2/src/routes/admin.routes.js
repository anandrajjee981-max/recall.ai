const express = require("express");
const protect = require("../middlewares/auth.middleware");
const requireAdmin = require("../middlewares/admin.middleware");
const { triggerDigest, triggerReminder } = require("../controllers/admin.controller");

const router = express.Router();

router.use(protect);
router.use(requireAdmin);

router.post("/trigger-digest", triggerDigest);
router.post("/trigger-reminder", triggerReminder);

module.exports = router;