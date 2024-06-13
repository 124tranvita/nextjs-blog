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
    createdAt: Date,
    updatedAt: Date,
    author: {
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

// https://mongoosejs.com/docs/populate.html#populating-multiple-paths-middleware
// https://github.com/Automattic/mongoose/issues/11078#issuecomment-1002748007
postSchema.pre(/^find/, function (next) {
  if (this.options._recursed) {
    return next();
  }
  this.populate({ path: "author", options: { _recursed: true } });
  next();
});

export default mongoose.models.Post || mongoose.model("Post", postSchema);
