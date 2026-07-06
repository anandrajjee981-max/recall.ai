const express = require("express");
const protect = require("../middlewares/auth.middleware");
const {
  createLibrary,
  getLibraries,
  deleteLibrary,
} = require("../controllers/library.controller");

const router = express.Router();

router.use(protect); // every route below this requires login

router.post("/", createLibrary);
router.get("/", getLibraries);
router.delete("/:id", deleteLibrary);

module.exports = router;