import mongoose from "mongoose";

const folderSchema = new mongoose.Schema(
  {
    username: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },

    url: {
      type: String,
    },

    title: {
      type: String,
      required: true,
    },

    description: {
      type: String,
    },

    saves: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Saved",
      },
    ],
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Folder", folderSchema);