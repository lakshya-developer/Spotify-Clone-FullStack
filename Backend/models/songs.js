// Core Modules
import mongoose from "mongoose";

const songSchema = mongoose.Schema({
  title: { type: String, required: [true, "Title is required."] },
  audioFile: { type: String, required: [true, "Audio file is required."] },
  coverPhoto: { type: String, default: "" },
  artist: { type: String, required: [true, "Artist name is required."] },
  artistId: {
    type: mongoose.Schema.Types.ObjectId,
    required: [true, "Artist Id is required."]
  },
  playsCount: { type: Number },
  likes: { type: Number, default: 0 },
  type: {
    type: String,
    enum: ["individual", "playlist"],
    default: "individual",
  },
  albumId: {
    type: mongoose.Schema.Types.ObjectId,
    default: null
  },
});

const Songs = mongoose.model("Songs", songSchema);

export default Songs;