import React from "react";

export default function LeftSidebar() {
  const playlists = [
    { name: "Liked Songs" },
    { name: "My Playlist #1" },
    { name: "Discover Weekly" },
    { name: "Release Radar" },
    { name: "Chill Vibes" },
    { name: "Rock Collection" },
  ];
  return (
    <div
      className="left-sidebar p-2 bg-black min-w-[220px] max-w-xs flex flex-col"
      style={{ width: "25%" }}
    >
      <div className="mb-4">
        <div className="flex justify-between items-center mb-2">
          <img
            className="invert w-25 h-8"
            src="/img/logo.svg"
            alt="Spotify Logo"
          />
        </div>
        <ul className="bg-gray-800 text-gray-400 rounded-lg p-4 space-y-3">
          <li className="flex items-center gap-4 cursor-pointer hover:text-white transition-colors">
            <img className="invert w-6 h-8" src="/img/home.svg" alt="" />
            <a href="/">Home</a>
          </li>
          <li className="flex items-center gap-4 cursor-pointer hover:text-white transition-colors">
            <img className="invert w-6 h-8" src="/img/search.svg" alt="" />
            <span>Search</span>
          </li>
        </ul>
      </div>
      <div className="flex flex-col bg-gray-800 rounded-lg min-h-0 flex-1">
        <div className="flex items-center justify-between p-4 border-b border-gray-700">
          <div className="flex items-center gap-3 cursor-pointer hover:text-white transition-colors">
            <img className="invert w-6 h-8" src="/img/library.svg" alt="" />
            <span>Your library</span>
          </div>
          <div className="flex gap-2">
            <div className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-gray-700 cursor-pointer transition-colors">
              <img className="invert w-6 h-8" src="/img/close.svg" alt="" />
            </div>
            <button className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-gray-700 cursor-pointer transition-colors">
              <img
                className="invert cursor-pointer w-6 h-8"
                src="/img/play.svg"
                alt=""
              />
            </button>
          </div>
        </div>
        <div className="flex-1 overflow-y-auto custom-scrollbar p-4">
          <ul className="space-y-3">
            {playlists.map((playlist, idx) => (
              <li
                key={idx}
                className="flex items-center justify-between p-3 border-2 border-gray-600 rounded-lg cursor-pointer hover:bg-gray-700 transition-colors group"
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
                  <button className="text-green-500 hover:text-green-400 opacity-0 group-hover:opacity-100 transition-opacity">
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
        </div>
      </div>
    </div>
  );
}
