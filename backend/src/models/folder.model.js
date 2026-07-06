import mongoose from "mongoose";

const folderSchema = new mongoose.Schema(
  {
    username: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },

    title: {
      type: String,
      required: true,
    },

    description: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Folder", folderSchema);