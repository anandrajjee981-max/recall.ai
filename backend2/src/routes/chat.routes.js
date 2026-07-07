const express = require("express");
const protect = require("../middlewares/auth.middleware");
const { askChat, getConversation, listConversations } = require("../controllers/chat.controller");

const router = express.Router();

router.use(protect);

router.post("/", askChat);
router.get("/", listConversations);
router.get("/:conversationId", getConversation);

module.exports = router;