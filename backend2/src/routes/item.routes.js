const express = require("express");
const protect = require("../middlewares/auth.middleware");
const validate = require("../middlewares/validate.middleware");
const { createItemSchema, aiSaveItemSchema } = require("../validators/item.validator");
const {
  createItem,
  getItems,
  getItemById,
  deleteItem,
  togglePin,
  aiSaveItem,
} = require("../controllers/item.controller");

const router = express.Router();

router.use(protect);

router.post("/", validate(createItemSchema), createItem);
router.post("/ai-save", validate(aiSaveItemSchema), aiSaveItem);
router.get("/", getItems);
router.get("/:id", getItemById);
router.delete("/:id", deleteItem);
router.patch("/:id/pin", togglePin);

module.exports = router;