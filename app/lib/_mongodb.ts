import mongoose from "mongoose";

if (!process.env.MONGODB_URI || !process.env.MONGODB_PASSWORD) {
  throw new Error(
    'Invalid environment variable: "MONGODB_URI || MONGODB_PASSWORD"'
  );
}

const URI = process.env.MONGODB_URI.replace(
  "<PASSWORD>",
  process.env.MONGODB_PASSWORD
);

const connect = async () => {
  try {
    if (process.env.NODE_ENV === "development") {
      await mongoose.connect(URI.replace("<DB>", process.env.DB_DEV || ""));
    } else {
      await mongoose.connect(URI.replace("<DB>", process.env.DB_PROD || ""));
    }

    console.log("Mongo connection successful via MONGOOES");
  } catch (error) {
    throw new Error("Error in connecting to mongodb.");
  }
};

export default connect;
