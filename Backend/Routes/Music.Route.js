import { Router } from "express";
import * as MusicController from "../controller/Music.Controller.js"; 
import { upload } from "../middlewares/multer.middleware.js";

const router = Router();

router.route('/addSong').post(
  upload.fields([{
    name: "audioFile",
    maxCount: 1
  },{
    name: "coverPhoto",
    maxCount: 1
  }]),
  MusicController.postSongAdd
);

router.route('/addAlbum').post(
  upload.fields([
    {
      name: "albumCoverPhoto",
      maxCount: 1
    }
  ]),
  MusicController.postAlbumAdd
)

router.route('/getMusic').post(MusicController.getArtistSongs);
router.route('/getMusicHome').get(MusicController.getMusic);
router.route('/getMusicInfo').post(MusicController.getMusicInfo);

export default router;