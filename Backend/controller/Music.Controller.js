import Album from "../models/album.js";
import Songs from "../models/songs.js";
import User from "../models/users.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

export const postSongAdd = async (req, res, next) => {
  const { title, userId } = req.body;
  console.log("Title:", title);

  if ([title].some((feild) => feild?.trim() === "")) {
    res.status(400).json({ message: "Feilds cannot be empty." });
  }

  let audioLocalPath = "";
  let coverLocalPath = "";

  if (req.files) {
    audioLocalPath = req.files?.audioFile[0]?.path;
    coverLocalPath = req.files?.coverPhoto[0]?.path;
  }

  if (!coverLocalPath) {
    res.status(400).json({ message: "Cover Image required." });
  }

  const audioFile = await uploadOnCloudinary(audioLocalPath);
  const coverPhoto = await uploadOnCloudinary(coverLocalPath);

  if (!audioFile) {
    res.status(400).json({ message: "Audio file could'nt upload properly." });
  }

  const user = await User.findById(userId);
  // console.log(user);
  const artist = user.firstName + " " + user.lastName;

  const song = await new Songs({
    title: title,
    audioFile: audioFile.url,
    coverPhoto: coverPhoto?.url,
    artist: artist,
    artistId: user._id,
  });
  await song.save();

  const addedSong = await Songs.findById(song._id).select(
    " -audioFile -coverPhoto"
  );

  if (!addedSong) {
    res
      .status(500)
      .json({ message: "Something went wrong while adding song." });
  }

  return res.status(201).json({ addedSong });
};

export const postAlbumAdd = async (req, res, next) => {
  const { title, description, userId } = req.body;
  console.log("Album Title:", title);

  if (title.trim() === "") {
    res.status(400).json({ message: "Feilds cannot be empty." });
  }

  try {
    const exist = await Album.findOne({ title: title });

    if (exist) {
      res.status(400).json({ message: "Named title already esist." });
    }

    let albumCoverPhotoUrl = "";

    if (req.files && req.files.albumCoverPhoto) {
      console.log(req.files.albumCoverPhoto);
      const albumCoverPhotoLocalPath = req.files?.albumCoverPhoto[0]?.path;
      const cloudinaryResponse = await uploadOnCloudinary(
        albumCoverPhotoLocalPath
      );
      if (!cloudinaryResponse) {
        res
          .status(500)
          .json({
            message: "There was an error while uploading files on Cloudinary.",
          });
      }
      albumCoverPhotoUrl = cloudinaryResponse.url;
      console.log(cloudinaryResponse);
    }

    const album = await new Album({
      title: title,
      description: description,
      artistId: userId,
      coverPhoto: albumCoverPhotoUrl,
    });
    await album.save();

    const addAlbum = await Album.findById(album._id).select(
      " -artistId -songs"
    );

    if (!addAlbum) {
      res
        .status(500)
        .json({ message: "There was an error while adding Album." });
    }

    res.status(201).json({ addAlbum });
  } catch (err) {
    console.log("Error Occrured:", err);
  }
};

export const getArtistSongs = async (req, res, next) => {
  const { userId } = req.body;

  const user = await User.findById(userId);

  if (!user) {
    res.status(400).json({ message: "Artist does not exist." });
  }

  const songs = await Songs.find({ artistId: userId });
  const albums = await Album.find({ artistId: userId });

  if (!songs || !albums) {
    res.status(500).json({ message: "Error while fetching the data." });
  }

  res.status(200).json({ songs, albums });
};

export const getMusic = async (req, res, next) => {
  // if(!req.session.isLoggedin){
  //   res.status(400).json({ message: "User is not logged in."});
  // }

  const songs = await Songs.find();
  const albums = await Album.find();

  if (!songs || !albums) {
    res.status(500).json({ message: "Error while fetching the data." });
  }

  res.status(200).json({ songs, albums });
};

export const getMusicInfo = async (req, res, next) => {
  const { id, type } = req.body;

  try {
    if (type === "song") {
      const song = await Songs.findById(id);
      if (!song) {
        res
          .status(400)
          .json({ message: "Something went wrong." });
      }
      res.status(200).json(song);
    } else {
      const album = await Album.findById(id);
      if(!album){
        res
          .status(400)
          .json({ message: "Something went wrong." });
      }
      res.status(200).json(album);
    }
  } catch (error) {
    console.log("An Error Occured", error);
    res.status(500).json({message: "Error Occured"});
  }
};