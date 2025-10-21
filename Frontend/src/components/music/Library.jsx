import React, { useEffect, useState } from "react";
import { EllipsisVertical } from "lucide-react";
import { Link, NavLink } from "react-router-dom";
import { usePlayBarContext } from "../../context/PlayBarContext";
import { useAlbumLoadContext } from "../../context/AlbumLoadContext";
import { likeSong, likeAlbum } from "../Functions/likeFunction";
import Nav from "../nav/Nav";
import { useLoginCheck } from "../../context/LoginContext";

function Library() {
  const { user } = useLoginCheck();
  const [selectedAlbum, setSelectedAlbum] = useState(null); // for album content
  const { selectedItem, setSelectedItem } = useAlbumLoadContext();
  const [userContent, setUserContent] = useState({
    songs: [],
    playlist: [],
    albums: [],
  });
  const { PlaySong } = usePlayBarContext();
  // This tracks which song’s menu is open
  const [openMenuId, setOpenMenuId] = useState(null);

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

  useEffect(() => {
    const fetchUserMusicData = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/music/getUserMusicData", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ userId: user.id, type: "all" })
        });
  
        if (response.ok) {
          const data = await response.json();
          setUserContent(prev => ({
            ...prev,
            songs: data.songs,
            playlist: data.playlist,
            albums: data.albums,
          }));
        }
      } catch (err) {
        console.log("Error Occurred:", err);
      }
    };
  
    fetchUserMusicData();
  }, []);
  

  return (
    <div className="main-content bg-gray-900 flex flex-col flex-1">
      <Nav />

      <div className="flex flex-col align-center gap-4 p-8 h-full overflow-y-auto custom-scrollbar">
        {!selectedItem ? (
          // Default Library List
          library.map((items, idx) => (
            <li
              key={idx}
              onClick={() => setSelectedItem(items.name)}
              className="flex items-center justify-between p-5 border-2 border-gray-600 rounded-lg hover:bg-gray-700 transition-colors group cursor-pointer"
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
          ))
        ) : (
          // When a section is selected
          <>
            <button
              onClick={() => {
                setSelectedItem(null);
                setSelectedAlbum(null);
              }}
              className="text-gray-400 hover:text-white mb-4"
            >
              ← Back to Library
            </button>

            {selectedItem === "Liked Songs" && (
              <div className="flex flex-col gap-3">
                <h2 className="text-white text-lg font-semibold mb-4">
                  Liked Songs
                </h2>
                {userContent.songs?.map((song) => (
                  <div
                    key={song._id}
                    className="bg-gray-800/40 hover:bg-gray-800/60 p-4 rounded-lg flex items-center group"
                  >
                    <div className="w-12 h-12 bg-gray-700 rounded overflow-hidden mr-4">
                      <img
                        src={song.coverPhoto || "/img/default-song.png"}
                        alt={song.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-grow">
                      <h3 className="text-white font-medium">{song.title}</h3>
                      <p className="text-gray-400 text-sm">{song.artist}</p>
                    </div>
                    <button
                      onClick={() => PlaySong(song._id, "song")}
                      className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <img className="w-4" src="/img/newplay.svg" alt="Play" />
                    </button>
                  </div>
                ))}
              </div>
            )}

            {selectedItem === "Playlists" && (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                {userContent.playlist?.map((album) => (
                  <div
                    key={album._id}
                    onClick={() => ""}
                    className="card-hover bg-gray-800 p-4 rounded-lg cursor-pointer hover:bg-gray-700"
                  >
                    <div className="aspect-square bg-gray-700 rounded-lg mb-4 overflow-hidden">
                      <img
                        src={album.coverPhoto || "/img/default-album.png"}
                        alt={album.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <h3 className="text-white font-medium mb-1 truncate">
                      {album.title}
                    </h3>
                    <p className="text-gray-400 text-sm">Your Playlist</p>
                  </div>
                ))}
              </div>
            )}

            {selectedItem === "Favourate" && (
              <div className="flex flex-col gap-3">
                <h2 className="text-white text-lg font-semibold mb-4">
                  Liked Albums
                </h2>
                {userContent.albums?.map((album) => (
                  <div
                  onClick={() => songLoad(album._id)}
                  key={album._id}
                  className="card-hover w-50 bg-gray-800 p-4 rounded-lg cursor-pointer transition-all duration-300 relative group"
                >
                  <div className="aspect-square bg-gray-700 rounded-lg mb-4 overflow-hidden">
                    <img
                      src={album.coverPhoto || "/img/default-album.png"}
                      alt={album.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="text-white font-medium mb-1 truncate">
                    {album.title}
                  </h3>
                  <div className="flex justify-between">
                    <p className="text-gray-400 text-sm">Album </p>
                    <div className="relative">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setOpenMenuId(
                            openMenuId === album._id ? null : album._id
                          );
                        }}
                        className="text-gray-400 hover:text-white transition"
                      >
                        <EllipsisVertical size={20} />
                      </button>
  
                      {openMenuId === album._id && (
                        <div
                          className="absolute right-0 top-6 bg-gray-900 border border-gray-700 rounded-lg shadow-lg py-2 z-50 w-40"
                          onMouseLeave={() => setOpenMenuId(null)}
                        >
                          <button
                            className="block w-full text-left px-4 py-2 text-sm text-gray-200 hover:bg-gray-700"
                            onClick={() => likeAlbum(user.id, album._id)}
                          >
                            ❤️ Like
                          </button>
                          <button
                            className="block w-full text-left px-4 py-2 text-sm text-gray-200 hover:bg-gray-700"
                            onClick={() => console.log(`Favorited: `)}
                          >
                            ⭐ Favorite
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                  <button className="play-button w-12 h-12 bg-green-500 rounded-full flex items-center justify-center text-black font-bold hover:bg-green-400 transition-all duration-200 absolute right-5 bottom-16 opacity-0 group-hover:opacity-100 group-hover:translate-y-[-2rem] translate-y-0">
                    <img className="w-4" src="/img/newplay.svg" alt="Play" />
                  </button>
                </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default Library;