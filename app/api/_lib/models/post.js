import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Missing post title!"],
      maxlength: [
        128,
        "A user name must have less or equal than 128 characters.",
      ],
      minlength: [4, "A user name must have more or equal than 4 characters."],
    },
    localImg: {
      type: String,
    },
    cloudImg: {
      type: String,
    },
    content: {
      type: String,
      required: [true, "Missing post content!"],
    },
    author: {
      type: String,
      required: [true, "Missing post auther!"],
    },
    createdAt: Date,
    updatedAt: Date,
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: [true, "Post must belong to one user."],
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

export default mongoose.models.Post || mongoose.model("Post", postSchema);
