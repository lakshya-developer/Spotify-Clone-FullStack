import React, { useEffect, useState } from "react";
import Nav from "../nav/Nav";
import { useLoginCheck } from "../../context/LoginContext";

function Library() {
  const { user } = useLoginCheck();
  const [selectedItem, setSelectedItem] = useState(null); // track which section is opened
  const [selectedAlbum, setSelectedAlbum] = useState(null); // for album content
  const [userContent, setUserContent] = useState({
    albums: [],
    playlists: [],
    likedSongs: [],
  });

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
          console.log(data);
          setUserContent({
            albums: data.albums,
            playlists: data.playlists,
            likedSongs: data.songs
          });
        }
      } catch (err) {
        console.log("Error Occurred:", err);
      }
    };
  
    fetchUserMusicData();
  }, []);
  
  

  const PlaySong = (id, type) => {
    console.log("Playing:", id, type);
  };

  const fetchAlbumSongs = (albumId) => {
    const album = userContent.albums.find((a) => a._id === albumId);
    setSelectedAlbum(album);
    setSelectedItem("Album");
  };

  return (
    <div className="main-content bg-gray-900 flex flex-col flex-1">
      <Nav />

      <div className="flex flex-col justify-between align-center gap-4 p-8 h-full overflow-y-auto custom-scrollbar">
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
              <div>
                <h2 className="text-white text-lg font-semibold mb-4">
                  Liked Songs
                </h2>
                {userContent.likedSongs?.map((song) => (
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
                      <p className="text-gray-400 text-sm">You</p>
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
                {userContent.playlists?.map((album) => (
                  <div
                    key={album._id}
                    onClick={() => fetchAlbumSongs(album._id)}
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

            {selectedItem === "Favourate" && selectedAlbum && (
              <div>
                <h2 className="text-white text-lg font-semibold mb-4">
                  {selectedAlbum.title}
                </h2>
                {selectedAlbum.albums?.map((song) => (
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
          </>
        )}
      </div>
    </div>
  );
}

export default Library;
