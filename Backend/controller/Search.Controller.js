import Album from "../models/album.js";
import Songs from "../models/songs.js";
import User from "../models/users.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

export const searchContent = async (req, res, next) => {
  const { title } = req.body;
  try {
    const songsData = await Songs.find({
      title: { $regex: title, $options: "i" },
    });
    const albumData = await Album.find({
      title: { $regex: title, $options: "i" },
    });
    const artist = await User.find({
      userType: "artist",
      $or: [
        { firstName: { $regex: title, $options: "i" } },
        { lastName: { $regex: title, $options: "i" } },
      ],
    });
    if (!songsData && !albumData && !artist) {
      res.status(400).json({ message: "does not exist." });
    }
    const data = { songs: songsData, albums: albumData,artists: artist };
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
  }
};
