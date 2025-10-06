// Core Modules
import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  firstName: { type: String, required: [true, "First name is required  "] },
  lastName: String,
  email: { type: String, required: [true, "Email is required"], unique: true },
  password: { type: String, required: [true, "Password is required"] },
  userType: { type: String, enum: ["artist", "listner"], default: "listner" },
  coverPhoto: { type: String, default: "" },
  playlist: { type: mongoose.Schema.Types.ObjectId, ref: "songs" },
  likedSongs: { type: mongoose.Schema.Types.ObjectId, ref: "songs"},
  likedAlbums: { type: mongoose.Schema.Types.ObjectId, ref: "albums"}
});

const User = mongoose.model("User", userSchema);

export default User;