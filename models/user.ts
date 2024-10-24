import mongoose from "mongoose";
import uniqueValidator from "mongoose-unique-validator"; //npm i --save-dev @types/mongoose-unique-validator

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "please provide name."],
      trim: true, // no whitespace 
      minLength: 1, //chars
      maxLength: 30,
    },

    email: {
      type: String,
      required: [true, "please provide email."],
      index: true, // so can find email
      lowercase: true,
      unique: true,
      trim: true,
      minLength: 6,
      maxLength: 30,
    },

    password: String, // don required cuz user might sign in by google,fb...
    role: {
      type: String,
      default: "user",
    },
    image: String, // if login thru google can use image 
    resetPasswordCode: {
        data: {
          type: String,
          trim: true,
          minLength: 6, // Adjust based on code length preference
        },
        expiresAt: {
          type: Date,
          default: () => Date.now() + 30 * 60 * 1000, // Valid for 30 min only
          index: { expires: '30m' }, // MongoDB will automatically delete the document after 30 minutes
        },
      },
      
  },

  { timestamps: true }
);

userSchema.plugin(uniqueValidator, "is already taken!"); // so mongo will give us error msg , and we can send to client

export default mongoose.models.User || mongoose.model("User", userSchema);
// if it already exist we export that || we going to create
