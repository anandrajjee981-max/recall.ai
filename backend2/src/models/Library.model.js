const mongoose = require("mongoose");

const librarySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    parentLibrary: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Library",
      default: null, // null means it's a top-level library, not a sub-category
    },
    autoCreated: {
      type: Boolean,
      default: true, // true if AI created it, false if user manually created it
    },
  },
  { timestamps: true }
);

librarySchema.index({ user: 1 });

module.exports = mongoose.model("Library", librarySchema);