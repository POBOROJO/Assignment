import mongoose, { Schema, Document } from "mongoose";

const UserSchema = new Schema(
  {
    username: {
      type: String,
      required: [true, "Username is required"],
      trim: true, // trim whitespace from the beginning and end of the username
      unique: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      match: [/.+@.+\..+/, "Please enter a valid email address"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
  },
  { timestamps: true },
);

// here we are telling mongoose that we want to use the UserSchema as the type for the User model
const UserModel = mongoose.model("User", UserSchema);

export default UserModel;
