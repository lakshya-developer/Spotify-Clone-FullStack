import React, { useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { usePlayBarContext } from "../../context/PlayBarContext";
import { useAlbumLoadContext } from "../../context/AlbumLoadContext";

function AlbumLoad() {
  const { setCurrentSong, PlaySong, audioRef } = usePlayBarContext();
  const { albumSongs, currentSongIndex, setCurrentSongIndex, albumSongPlay, setSelectedItem } = useAlbumLoadContext();
  const navigate = useNavigate();

  const library = [
    {
      name: "Liked Songs",
      cover:
        "https://res.cloudinary.com/dw0ehvbnr/image/upload/v1759738027/heart_kso9me.svg",
    },
    {
      name: "Playlists",
      cover:
        "https://res.cloudinary.com/dw0ehvbnr/image/upload/v1759737485/playlist-play_uezlht.svg",
    },
    {
      name: "Favourate",
      cover:
        "https://res.cloudinary.com/dw0ehvbnr/image/upload/v1759738128/favourite_hs7ipy.svg",
    },
    {
      name: "Top Artists",
      cover:
        "https://res.cloudinary.com/dw0ehvbnr/image/upload/v1759039811/music_zbhrzs.svg",
    },
    {
      name: "Top Songs",
      cover:
        "https://res.cloudinary.com/dw0ehvbnr/image/upload/v1759039811/music_zbhrzs.svg",
    },
  ];

  const onLibraryClick = (name) => {
    setSelectedItem(name);
    navigate("/music/library");
  }

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
          : library.map((items, idx) => (
              <li
                key={idx}
                className="flex items-center justify-between p-3 border-2 border-gray-600 rounded-lg hover:bg-gray-700 transition-colors group"
                onClick={() => onLibraryClick(items.name)}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gray-700 rounded flex items-center justify-center">
                    <img
                      className="invert w-6 h-8"
                      src={items.cover}
                      alt=""
                    />
                  </div>
                  <div>
                    <div className="text-white text-sm font-medium">
                      {items.name}
                    </div>
                    <div className="text-gray-400 text-xs">Library</div>
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
