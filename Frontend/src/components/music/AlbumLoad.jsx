import React, { useEffect } from "react";
import { usePlayBarContext } from "../../context/PlayBarContext";
import { useAlbumLoadContext } from "../../context/AlbumLoadContext";

function AlbumLoad() {
  const { setCurrentSong, PlaySong, audioRef } = usePlayBarContext();
  const { albumSongs, currentSongIndex, setCurrentSongIndex, albumSongPlay } = useAlbumLoadContext();

  const playlists = [
    { name: "Liked Songs" },
    { name: "Playlists" },
    { name: "Favourate" },
    { name: "Top Artists" },
    { name: "Top Songs" },
    { name: "Rock Collection" },
  ];

  return (
    <div className="flex-1 overflow-y-auto custom-scrollbar p-4">
      <ul className="space-y-3">
        {albumSongs
          ? albumSongs.map((song) => (
              <li
                onClick={() => {
                  albumSongPlay(song._id);
                }}
                key={song._id}
                className="flex items-center justify-between p-3 border-2 border-gray-600 rounded-lg hover:bg-gray-700 transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gray-700 rounded flex items-center justify-center">
                    <img
                      className="invert w-6 h-8"
                      src={song.coverPhoto}
                      alt="/img/music.svg"
                    />
                  </div>
                  <div>
                    <div className="text-white text-sm font-medium">
                      {song.title}
                    </div>
                    <div className="text-gray-400 text-xs">{song.artist}</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button className="text-green-500 hover:text-green-400 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                    <img
                      className="invert w-6 h-8"
                      src="/img/play.svg"
                      alt=""
                    />
                  </button>
                </div>
              </li>
            ))
          : playlists.map((playlist, idx) => (
              <li
                key={idx}
                className="flex items-center justify-between p-3 border-2 border-gray-600 rounded-lg hover:bg-gray-700 transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gray-700 rounded flex items-center justify-center">
                    <img
                      className="invert w-6 h-8"
                      src="/img/music.svg"
                      alt=""
                    />
                  </div>
                  <div>
                    <div className="text-white text-sm font-medium">
                      {playlist.name}
                    </div>
                    <div className="text-gray-400 text-xs">Playlist</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button className="text-green-500 hover:text-green-400 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                    <img
                      className="invert w-6 h-8"
                      src="/img/play.svg"
                      alt=""
                    />
                  </button>
                </div>
              </li>
            ))}
      </ul>

      {albumSongs?.length === 0 ? (
        <p className="text-gray-400 mb-4">No songs in the Album.</p>
      ) : null}
    </div>
  );
}

export default AlbumLoad;
