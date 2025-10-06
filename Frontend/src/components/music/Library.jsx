import React from "react";
import Nav from "../nav/Nav";

function Library() {
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
    { name: "Top Artists" },
    {
      name: "Top Songs",
      cover:
        "https://res.cloudinary.com/dw0ehvbnr/image/upload/v1759039811/music_zbhrzs.svg",
    },
    {
      name: "Rock Collection",
      cover:
        "https://res.cloudinary.com/dw0ehvbnr/image/upload/v1759039811/music_zbhrzs.svg",
    },
  ];

  return (
    <div className="main-content bg-gray-900 flex flex-col flex-1">
      <Nav />
      <div className="flex flex-col justify-between align-center gap-4 p-8 h-full overflow-y-auto custom-scrollbar">
        {library.map((items, idx) => (
          <li
            key={idx}
            className="flex items-center justify-between p-5 border-2 border-gray-600 rounded-lg hover:bg-gray-700 transition-colors group"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gray-700 rounded flex items-center justify-center">
                <img className="invert w-6 h-8" src={items?.cover} alt="" />
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
                <img className="invert w-6 h-8" src="/img/play.svg" alt="" />
              </button>
            </div>
          </li>
        ))}
      </div>
    </div>
  );
}

export default Library;
