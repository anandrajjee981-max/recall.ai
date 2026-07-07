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
    embedding: {
    type: [Number],
    default: [],
    select: false, // don't return this huge array in normal queries unless explicitly asked
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
    lastViewedAt: {
    type: Date,
    default: null,
    },
  },
  { timestamps: true }
);

savedItemSchema.index({ user: 1, createdAt: -1 }); // speeds up getItems (sorted by newest)
savedItemSchema.index({ user: 1, url: 1 }); // speeds up duplicate detection lookup
savedItemSchema.index({ user: 1, library: 1 }); // speeds up filtering by library

module.exports = mongoose.model("SavedItem", savedItemSchema);