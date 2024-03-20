import mongoose, { Model } from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please tell us your name!"],
      maxlength: [
        32,
        "A user name must have less or equal than 32 characters.",
      ],
      minlength: [4, "A user name must have more or equal than 4 characters."],
    },
    email: {
      type: String,
      required: [true, "Please provide your email"],
      unique: true,
      lowercase: true,
      validate: [validator.isEmail, "Please provide a valid email."],
    },
    password: {
      type: String,
      required: [true, "Please provide a password."],
      minlength: 8,
      select: false,
    },
    passwordConfirm: {
      type: String,
      required: [true, "Please provide a password."],
      minlength: 8,
      select: false,
    },
    createdAt: Date,
    passwordChangedAt: Date,
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

userSchema.pre("save", async function (next) {
  if (this.password && this.passwordConfirm) {
    const isSame = this.password === this.passwordConfirm;

    if (!isSame) {
      throw new Error("Password and Confirm password did not match");
    }

    // Hash the password with cost of 12
    this.password = await bcrypt.hash(this.password, 12);

    // Delete passwordConfirm field
    this.passwordConfirm = undefined; // this field just for the user confirm, does not need to save to DB
  }

  next();
});

/**
 * User Schema methods: Correct user's password check.
 * @param {string} candidatePassword - Given password.
 * @param {string} userPassword - Current user's password.
 * @returns - True if `candidatePassword` and `userPassword` are same.
 */
userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

export default mongoose.models.User || mongoose.model("User", userSchema);

// https://stackoverflow.com/questions/73877932/how-to-use-validator-in-mongoose-schema-in-typescipt
// Mongoose schema definition and validation in a Typescript project: https://www.youtube.com/watch?v=eHb979eNVd8
