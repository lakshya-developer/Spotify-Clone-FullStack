import { Router } from "express";
import * as MusicController from "../controller/Music.Controller.js";
import * as SearchController from "../controller/Search.Controller.js"
import { upload } from "../middlewares/multer.middleware.js";

const router = Router();

router.route("/addSong").post(
  upload.fields([
    {
      name: "audioFile",
      maxCount: 1,
    },
    {
      name: "coverPhoto",
      maxCount: 1,
    },
  ]),
  MusicController.postSongAdd
);

router.route("/addAlbum").post(
  upload.fields([
    {
      name: "albumCoverPhoto",
      maxCount: 1,
    },
  ]),
  MusicController.postAlbumAdd
);

router.route("/getMusic").post(MusicController.getArtistSongs);
router.route("/getMusicHome").get(MusicController.getMusic);
router.route("/getMusicInfo").post(MusicController.getMusicInfo);
router.route("/addToAlbum").post(
  upload.fields([
    {
      name: "audioFile",
      maxCount: 1,
    },
    {
      name: "coverPhoto",
      maxCount: 1,
    },
  ]),
  MusicController.addToAlbum
);
router.route("/getArtistsInfo").get(MusicController.getArtistsInfo);
router.route("/getUserMusicData").post(MusicController.getUserMusicData);
router.route("/likeSong").post(MusicController.postLikeSong);
router.route("/likeAlbum").post(MusicController.postLikeAlbum);
router.route("/createPlaylist").post(MusicController.createPlaylist);
router.route("/addToPlaylist").post(MusicController.addToPlaylist);
router.route("/playlistSongs").post(MusicController.playlistSongs);
router.route("/search").post(SearchController.searchContent);

export default router;