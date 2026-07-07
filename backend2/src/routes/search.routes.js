const express = require("express");
const protect = require("../middlewares/auth.middleware");
const { searchItems, getSearchHistory } = require("../controllers/search.controller");

const router = express.Router();

router.use(protect);

router.post("/", searchItems);
router.get("/history", getSearchHistory);

module.exports = router;