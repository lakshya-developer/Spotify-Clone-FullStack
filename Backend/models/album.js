import mongoose from "mongoose";

const albumSchema = mongoose.Schema({
  title: {type: String, required: [true, "Album title required."]},
  description: {type: String},
  artistId: {type: mongoose.Schema.Types.ObjectId},
  artistName: {type: String, required: [true, "Artist name is required."]},
  coverPhoto: {type: String,  required: [true, "Cover Photo is required."]},
  songs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Songs",
    },
  ],
  albumLikes: {type: Number, default: 0}
});

const Album = mongoose.model("Album", albumSchema)

export default Album;