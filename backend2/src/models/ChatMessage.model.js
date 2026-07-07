const mongoose = require("mongoose");

const chatMessageSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    conversationId: {
      type: String, // groups messages into a single conversation thread
      required: true,
    },
    role: {
      type: String,
      enum: ["user", "assistant"],
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    referencedItems: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "SavedItem",
      },
    ],
  },
  { timestamps: true }
);

chatMessageSchema.index({ user: 1, conversationId: 1, createdAt: 1 });

module.exports = mongoose.model("ChatMessage", chatMessageSchema);