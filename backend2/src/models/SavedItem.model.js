const mongoose = require("mongoose");

const savedItemSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    sourceType: {
      type: String,
      enum: [
        "instagram_post",
        "instagram_reel",
        "amazon_product",
        "youtube_video",
        "linkedin_post",
        "twitter_bookmark",
        "browser_bookmark",
        "article",
        "pdf",
        "manual",
      ],
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      trim: true,
    },
    rawContent: {
      type: String, // extracted text/description from the content
    },
    summary: {
      type: String, // AI-generated summary
    },
    keyPoints: {
      type: [String],
      default: [],
    },
    tags: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Tag",
      },
    ],
    library: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Library",
      required: true,
    },
    thumbnail: {
      type: String, // Cloudinary/S3 URL
      default: "",
    },
    isPinned: {
      type: Boolean,
      default: false, // for "Collections" feature later
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("SavedItem", savedItemSchema);