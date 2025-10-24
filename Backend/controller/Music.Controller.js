import Album from "../models/album.js";
import Songs from "../models/songs.js";
import User from "../models/users.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

export const postSongAdd = async (req, res, next) => {
  const { title, userId } = req.body;
  console.log("Title:", title);

  if ([title].some((feild) => feild?.trim() === "")) {
    return res.status(400).json({ message: "Feilds cannot be empty." });
  }

  let audioLocalPath = "";
  let coverLocalPath = "";

  if (req.files) {
    audioLocalPath = req.files?.audioFile[0]?.path;
    coverLocalPath = req.files?.coverPhoto[0]?.path;
  }

  if (!coverLocalPath) {
    return res.status(400).json({ message: "Cover Image required." });
  }

  const audioFile = await uploadOnCloudinary(audioLocalPath);
  const coverPhoto = await uploadOnCloudinary(coverLocalPath);

  if (!audioFile) {
    return res
      .status(400)
      .json({ message: "Audio file could'nt upload properly." });
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
    return res.status(400).json({ message: "Feilds cannot be empty." });
  }

  try {
    const exist = await Album.findOne({ title: title });

    if (exist) {
      return res.status(400).json({ message: "Named title already esist." });
    }

    let albumCoverPhotoUrl = "";

    if (req.files && req.files.albumCoverPhoto) {
      console.log(req.files.albumCoverPhoto);
      const albumCoverPhotoLocalPath = req.files?.albumCoverPhoto[0]?.path;
      const cloudinaryResponse = await uploadOnCloudinary(
        albumCoverPhotoLocalPath
      );
      if (!cloudinaryResponse) {
        return res.status(500).json({
          message: "There was an error while uploading files on Cloudinary.",
        });
      }
      albumCoverPhotoUrl = cloudinaryResponse.url;
      console.log(cloudinaryResponse);
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User does not Exist." });
    }

    const album = await new Album({
      title: title,
      description: description,
      artistId: userId,
      artistName: user.firstName + " " + user.lastName,
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

    return res.status(201).json({ addAlbum });
  } catch (err) {
    console.log("Error Occrured:", err);
  }
};

export const getArtistSongs = async (req, res, next) => {
  const { userId } = req.body;

  const user = await User.findById(userId);

  if (!user) {
    return res.status(400).json({ message: "Artist does not exist." });
  }

  const songs = await Songs.find({ artistId: userId });
  const albums = await Album.find({ artistId: userId });

  if (!songs || !albums) {
    return res.status(500).json({ message: "Error while fetching the data." });
  }

  res.status(200).json({ songs, albums });
};

export const getMusic = async (req, res, next) => {
  // if(!req.session.isLoggedin){
  //return res.status(400).json({ message: "User is not logged in."});
  // }

  const songs = await Songs.find();
  const albums = await Album.find();

  if (!songs || !albums) {
    return res.status(500).json({ message: "Error while fetching the data." });
  }

  res.status(200).json({ songs, albums });
};

export const getMusicInfo = async (req, res, next) => {
  const { id, type } = req.body;

  try {
    if (type === "song") {
      const song = await Songs.findById(id);
      if (!song) {
        return res.status(400).json({ message: "Something went wrong." });
      }
      return res.status(200).json(song);
    } else if (type === "album") {
      const album = await Album.findById(id).populate("songs");
      if (!album) {
        return res.status(400).json({ message: "Something went wrong." });
      }
      return res.status(200).json(album);
    } else {
      return res.status(404).json({ message: "No such type data exist." });
    }
  } catch (error) {
    console.log("An Error Occured", error);
    return res.status(500).json({ message: "Error Occured" });
  }
};

export const addToAlbum = async (req, res, next) => {
  const { title, userId, albumId } = req.body;
  console.log("Title:", title);

  if ([title].some((feild) => feild?.trim() === "")) {
    return res.status(400).json({ message: "Feilds cannot be empty." });
  }

  let audioLocalPath = "";
  let coverLocalPath = "";

  if (req.files) {
    audioLocalPath = req.files?.audioFile[0]?.path;
    coverLocalPath = req.files?.coverPhoto[0]?.path;
  }

  if (!coverLocalPath) {
    return res.status(400).json({ message: "Cover Image required." });
  }

  const audioFile = await uploadOnCloudinary(audioLocalPath);
  const coverPhoto = await uploadOnCloudinary(coverLocalPath);

  if (!audioFile) {
    return res
      .status(400)
      .json({ message: "Audio file could'nt upload properly." });
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
    albumId: albumId,
  });
  await song.save();
  // const song = {
  //   _id: "68d3c08c3fd98b69a3b6b89c",
  //   title: "Test Song",
  //   audioFile:
  //     "http://res.cloudinary.com/dw0ehvbnr/video/upload/v1758707848/hqwc8zzx5...",
  //   coverPhoto:
  //     "http://res.cloudinary.com/dw0ehvbnr/image/upload/v1758707851/copxzgnov...",
  //   artist: "Lakshya Verma",
  //   artistId: "68d2a8b7c68b05d1bb8f4f2a",
  //   likes: 0,
  //   type: "individual",
  //   albumId: null,
  //   __v: 0,
  // };

  const album = await Album.findById({ _id: albumId });

  console.log(album);

  album.songs.push(song);
  const updatedAlbum = await album.save();

  console.log(updatedAlbum);

  if (!album) {
    return res.status(404).json({ message: "Album not found." });
  }

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

export const getArtistsInfo = async (req, res, next) => {
  try {
    const artists = await User.find({ userType: "artist" }).select(
      " -password -userType"
    );
    if (!artists) {
      res
        .status(500)
        .json({ message: "There was an error retriving the Artists data." });
    }
    return res.status(200).json(artists);
  } catch (error) {
    console.log("Error Occured:", error);
  }
};

export const getUserMusicData = async (req, res, next) => {
  const { userId, type } = req.body;
  try {
    if (type === "songs") {
      const user = await User.findById(userId).populate("likedSongs");
      if (!user) {
        return res.status(404).json({ message: "User does not exist." });
      }
      const songs = user.likedSongs;
      return res.status(200).json(songs);
    } else if (type === "playlist") {
      const user = await User.findById(userId).populate("playlist");
      if (!user) {
        return res.status(404).json({ message: "User does not exist." });
      }
      const playlist = user.playlist;
      return res.status(200).json(playlist);
    } else if (type === "album") {
      const user = await User.findById(userId).populate("likedAlbums");
      if (!user) {
        return res.status(404).json({ message: "User does not exist." });
      }
      const albums = user.likedAlbums;
      return res.stauts(200).json(albums);
    }
    if (type === "all") {
      const userSongs = await User.findById(userId).populate("likedSongs");
      if (!userSongs) {
        return res.status(404).json({ message: "User does not exist." });
      }
      const userPlaylist = await User.findById(userId).populate("playlist");
      const userAlbums = await User.findById(userId).populate("likedAlbums");
      const songs = userSongs.likedSongs;
      const playlist = userPlaylist.playlist;
      const albums = userAlbums.likedAlbums;
      return res.status(200).json({ songs, playlist, albums });
    }
  } catch (err) {
    console.log("Error Occured:", err);
  }
};

export const postLikeSong = async (req, res, next) => {
  const { userId, songId } = req.body;
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User does not exist." });
    }
    const alreadyExist = await User.findOne({
      _id: userId,
      likedSongs: songId,
    });
    if (alreadyExist) {
      return res.status(200).json({ message: "Song Already Liked." });
    }
    const song = await Songs.findById(songId);
    if (!song) {
      return res.status(404).json({ message: "Song does not exist." });
    }
    await User.updateOne({ _id: userId }, { $push: { likedSongs: songId } });
    await Songs.updateOne({ _id: songId }, { $set: { likes: song.likes + 1 } });
    return res.status(200).json({ message: "Song Liked" });
  } catch (error) {
    console.log("Error Occured:", error);
  }
};

export const postLikeAlbum = async (req, res, next) => {
  const { userId, albumId } = req.body;
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User does not exist." });
    }
    const alreadyExist = await User.findOne({
      _id: userId,
      likedAlbums: albumId,
    });
    if (alreadyExist) {
      return res.status(200).json({ message: "Album already liked." });
    }
    const album = await Album.findById(albumId);
    if (!album) {
      return res.status(404).json({ message: "Song does not exist." });
    }
    await User.updateOne({ _id: userId }, { $push: { likedAlbums: albumId } });
    await Songs.updateOne(
      { _id: songId },
      { $set: { likes: album.likes + 1 } }
    );
    return res.status(200).json({ message: "Song Liked" });
  } catch (error) {
    console.log("Error Occured:", error);
  }
};

export const createPlaylist = async (req, res, next) => {
  const { userId, title } = req.body;
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User does not exist." });
    }
    const alreadyExist = await User.findOne({
      _id: userId,
      playlist: { $elemMatch: { name: title } },
    });
    if (alreadyExist) {
      return res.status(400).json({ message: "Playlist already exist." });
    }
    user.playlist.push({ name: title });
    await user.save();
    return res.status(201).json({ message: "Playlist created." });
  } catch (error) {
    console.log(error);
  }
};

export const addToPlaylist = async (req, res, next) => {
  const { userId, playlistName, songId } = req.body;
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User does not exist." });
    }
    const alreadyExist = await User.findOne({
      _id: userId,
      playlist: {
        $elemMatch: {
          name: playlistName,
          songs: songId, // checks if this songId exists in the songs array
        },
      },
    });
    if (alreadyExist) {
      return res
        .status(400)
        .json({ message: "Song already exist in Playlist." });
    }
    const playlist = user.playlist.find((p) => p.name === playlistName);

    if (!playlist.songs.includes(songId)) {
      playlist.songs.push(songId);
      await user.save();
      console.log("Song added!");
    }
    return res.status(200).json({ message: "Song added to playlist." });
  } catch (error) {
    console.log(error);
  }
};

export const playlistSongs = async (req, res, next) => {
  const { userId } = req.body;
  try {
    const user = await User.findOne({_id: userId}).populate("playlist.songs");
    if(!user){
      return res.status(404).json({ message: "User does not exist." });
    }
    const songs = user.playlist;
    return res.status(200).json(songs);
  } catch (error) {
    console.log(error);
  }
}