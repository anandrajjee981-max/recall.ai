import mongoose from "mongoose";

const savedSchema = new mongoose.Schema(
  {
    folder: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Folder",
      required: true,
    },

    username: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },

    url: {
      type: String,
      required: true,
    },

    title: String,
    summary: String,
    tags: [String],
    thumbnail: String,
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Saved", savedSchema);