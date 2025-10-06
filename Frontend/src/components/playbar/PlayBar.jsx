import React from "react";
import { useRef, useState, useEffect } from "react";
import { Play, Pause } from "lucide-react";
import { usePlayBarContext } from "../../context/PlayBarContext";
import { useAlbumLoadContext } from "../../context/AlbumLoadContext";

export default function PlayBar() {
  const { currentSong, setCurrentSong, audioRef } = usePlayBarContext();
  const { albumSongs, currentSongIndex, setCurrentSongIndex, albumSongPlay } =
    useAlbumLoadContext();
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(1);
  const [duration, setDuration] = useState("0:00");
  const [currentTime, setCurrentTime] = useState("0:00");
  const [seekBar, setSeekBar] = useState(0);

  const formateTime = (time) => {
    const minute = Math.floor(time / 60);
    const second = Math.floor(time % 60);
    const result = minute + ":" + (second < 10 ? "0" : "") + second;
    return result;
  };

  const handleVolumeChange = (e) => {
    const value = e.target.value / 100;
    setVolume(value);
    audioRef.current.volume = value;
  };

  useEffect(() => {
    if (currentSong && audioRef.current) {
      audioRef.current.play();
      setIsPlaying(true);
    }
  }, [currentSong]);

  if (!currentSong) return null;

  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    if (!audioRef.current) return;
    if (volume > 0) {
      setVolume(0);
      audioRef.current.volume = 0;
    } else {
      setVolume(0.5);
      audioRef.current.volume = 0.5;
    }
  };

  const handelSeekBar = (curTime, duration) => {
    if (!audioRef.current) return;
    const percent = Math.floor((curTime / duration) * 1000);
    const result = (percent / 1000) * 1100;
    setSeekBar(result);
  };

  const handelRangeBar = (curTime, duration) => {
    if (!audioRef.current) return;
    const percent = Math.floor((curTime / duration) * 100);
    const result = (percent / 1000) * 1100;
    setSeekBar(result);
  };

  const playNext = () => {
    if (!albumSongs) {
      setIsPlaying(false);
      return null;
    }
    if (currentSongIndex < albumSongs?.length - 1) {
      albumSongPlay(albumSongs[currentSongIndex + 1]?._id);
    } else {
      setCurrentSongIndex(null);
      // setCurrentSong(null);
      setIsPlaying(false);
    }
  };

  return (
    <div className="fixed bottom-5 left-1/2 mb-4 transform -translate-x-1/2 w-3/4 bg-gray-800 rounded-lg p-4 z-50">
      <div className="flex items-center justify-between mb-2">
        <div className="flex flex-row">
          <div className="w-12 h-12 bg-gray-700 rounded overflow-hidden mr-4">
            <img
              src={currentSong.coverPhoto || "/img/default-song.png"}
              alt="image"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="songinfo text-sm">
            <div className="text-white font-medium">{currentSong.title}</div>
            <div className="text-gray-400 text-sm">{currentSong.artist}</div>
          </div>
        </div>
        <audio
          ref={audioRef}
          src={currentSong.audioFile}
          preload="metadata"
          onLoadedMetadata={(e) => setDuration(formateTime(e.target.duration))}
          onTimeUpdate={(e) => {
            setCurrentTime(formateTime(e.target.currentTime));
            handelSeekBar(e.target.currentTime, e.target.duration);
          }}
          onEnded={() => playNext()}
        />
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <img
              className="invert w-5 h-5 cursor-pointer"
              src={
                volume == 0
                  ? "https://res.cloudinary.com/dw0ehvbnr/image/upload/v1759039525/mute_gvwlpq.svg"
                  : "https://res.cloudinary.com/dw0ehvbnr/image/upload/v1759039490/volume_h22tfz.svg"
              }
              alt="Volume"
              onClick={toggleMute}
            />
            <input
              id="volume"
              onChange={(e) => handleVolumeChange(e)}
              className="w-20 cursor-pointer"
              type="range"
              name="volume"
              value={volume * 100}
            />
          </div>
          <div className="flex items-center gap-4">
            <img
              className="invert w-5 h-5 cursor-pointer"
              src="https://res.cloudinary.com/dw0ehvbnr/image/upload/v1759039735/prevsong_zuz9gt.svg"
              alt="Previous"
            />
            <img
              id="play"
              onClick={togglePlay}
              className="invert w-5 h-5 cursor-pointer"
              src={
                isPlaying
                  ? "https://res.cloudinary.com/dw0ehvbnr/image/upload/v1759039441/pause_qaxtuj.svg"
                  : "https://res.cloudinary.com/dw0ehvbnr/image/upload/v1759039413/newplay_ed4019.svg"
              }
              alt="Play"
            />
            <img
              className="invert w-5 h-5 cursor-pointer"
              src="https://res.cloudinary.com/dw0ehvbnr/image/upload/v1759039737/nextsong_k9tgyp.svg"
              alt="Next"
            />
          </div>
          <div className="songtime text-sm text-gray-400">
            {currentTime} / {duration}
          </div>

          <div
            onClick={() => setCurrentSong(null)}
            className="w-5 h-5 p-1 rounded-full flex items-center justify-center hover:bg-gray-700 cursor-pointer transition-colors"
          >
            <img
              className="invert w-6 h-8"
              src="https://res.cloudinary.com/dw0ehvbnr/image/upload/v1759039805/close_vm8fhk.svg"
              alt=""
            />
          </div>
        </div>
      </div>
      {/* <div className="relative w-full h-0.5 bg-white rounded cursor-pointer">
        <div
          className="seekbar-circle w-3 h-3 bg-white rounded-full cursor-pointer absolute -bottom-1 transition ease-in-out"
          style={{ left: `${seekBar}px` }}
        ></div>
      </div> */}
      <input
        type="range"
        // min="0"
        // max={duration} // total length of song
        value={(audioRef?.current?.currentTime/audioRef?.current?.duration)*100} // current position
        onChange={(e) => (audioRef.current.currentTime = (e.target.value/100*audioRef.current.duration))}
        className="w-full h-0.5 cursor-pointer appearance-none bg-white rounded"
        style={{
          background: `linear-gradient(to right, white ${
            (currentTime / duration) * 100
          }%, rgba(255,255,255,0.3) 0%)`,
        }}
      />
    </div>
  );
}
