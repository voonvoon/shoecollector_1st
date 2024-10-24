// import mongoose from "mongoose";

import mongoose from "mongoose";

const dbConnect = async () => {
  try {
    // Check if Mongoose already has an active connection
    if (mongoose.connection.readyState >= 1) {
      console.log("Database already connected");
      return;
    }

    // Try to connect to the database
    await mongoose.connect(process.env.DB_URI as string);
    console.log("Database connected successfully");
  } catch (error) {
    console.error("Database connection failed", error);
    throw new Error("Failed to connect to the database");
  }
};

export default dbConnect;


//explian:
//nextjs after deploy to vercel , is a serverless function, so we need to import to use it each time needed