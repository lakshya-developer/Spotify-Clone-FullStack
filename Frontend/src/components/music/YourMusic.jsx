import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useLoginCheck } from "../../context/LoginContext";
import { Nav } from "../../components";
import { usePlayBarContext } from "../../context/PlayBarContext";

function YourMusic() {
  const { user } = useLoginCheck();
  const [activeTab, setActiveTab] = useState("songs");
  const [userContent, setUserContent] = useState({
    songs: [],
    albums: [],
  });
  const { PlaySong } = usePlayBarContext();

  useEffect(() => {
    // TODO: Replace with actual API calls
    const fetchUserContent = async () => {
      try {
        const userId = user.id;
        const response = await fetch(
          "http://localhost:3000/api/music/getMusic",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              credentials: "include",
            },
            body: JSON.stringify({ userId: userId }),
          }
        );
        if (response.ok) {
          console.log(userContent);
          const data = await response.json();
          setUserContent(data);
        }
      } catch (error) {
        console.error("Error fetching user content:", error);
      }
    };

    fetchUserContent();
  }, []);

  return (
    <div className="main-content bg-gray-900 flex flex-col flex-1">
      <Nav />

      <div className="flex-1 p-8 overflow-y-auto custom-scrollbar">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-white mb-6">Your Music</h1>

          {/* Tabs */}
          <div className="flex space-x-4 mb-8">
            <button
              onClick={() => setActiveTab("songs")}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors cursor-pointer ${
                activeTab === "songs"
                  ? "bg-green-500 text-white"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              Songs
            </button>
            <button
              onClick={() => setActiveTab("albums")}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors cursor-pointer ${
                activeTab === "albums"
                  ? "bg-green-500 text-white"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              albums
            </button>
          </div>

          {/* Content */}
          {activeTab === "songs" ? (
            <div className="space-y-4">
              {userContent.songs.length > 0 ? (
                userContent.songs.map((song, index) => (
                  <div
                    key={song._id}
                    className="bg-gray-800/40 hover:bg-gray-800/60 transition-colors p-4 rounded-lg flex items-center group"
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
                      <p className="text-gray-400 text-sm">
                        {user.firstName + " " + user.lastName}
                      </p>
                    </div>
                    <button
                      onClick={() => PlaySong(song._id, "song")}
                      className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                    >
                      <img className="w-4" src="/img/newplay.svg" alt="Play" />
                    </button>
                    <div className="flex justify-center ml-2 align-center rounded-full px-2 py-1 hover:bg-gray-900">
                      <img
                        className="invert w-4 h-6 opacity-0 group-hover:opacity-100 cursor-pointer"
                        src="https://res.cloudinary.com/dw0ehvbnr/image/upload/v1759040459/icons8-delete_cxk5ju.svg"
                        alt=""
                      />
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-12">
                  <p className="text-gray-400 mb-4">No songs uploaded yet</p>
                  <Link to="/music/add-music">
                    <button className="bg-white text-black px-6 py-3 rounded-full font-bold hover:bg-gray-200 transition-colors cursor-pointer">
                      Upload Your First Song
                    </button>
                  </Link>
                </div>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {userContent.albums.length > 0 ? (
                userContent.albums.map((album) => (
                  <div
                    key={album._id}
                    className="card-hover bg-gray-800 p-4 rounded-lg transition-all duration-300 relative group"
                  >
                    <div className="aspect-square bg-gray-700 rounded-lg mb-4 overflow-hidden">
                      <img
                        src={album.coverPhoto || "/img/default-album.png"}
                        alt={album.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <h3 className="text-white font-medium mb-1 truncate">
                      {album.title}
                    </h3>
                    <p className="text-gray-400 text-sm">Your Album</p>
                    <button className="play-button w-12 h-12 bg-green-500 rounded-full flex items-center justify-center text-black font-bold hover:bg-green-400 transition-all duration-200 absolute right-5 bottom-12 opacity-0 group-hover:opacity-100 group-hover:translate-y-[-2rem] translate-y-0 cursor-pointer">
                      <img className="w-4" src="/img/newplay.svg" alt="Play" />
                    </button>
                  </div>
                  /* <div
                      key={album._id}
                      className="bg-gray-800/40 p-4 rounded-lg cursor-pointer hover:bg-gray-800/60 transition-all group"
                    >
                      <div className="aspect-square bg-gray-700 rounded-lg mb-4 overflow-hidden">
                        <img
                          src={album.coverPhoto || "/img/default-album.png"}
                          alt={album.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <h3 className="text-white font-medium mb-1 truncate">
                        {album.title}
                      </h3>
                      <p className="text-gray-400 text-sm truncate">
                      {album.songCount} songs
                      </p> 
                      <button className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center absolute right-6 bottom-6 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all">
                        <img className="w-4" src="/img/play.svg" alt="Play" />
                      </button>
                    </div> */
                ))
              ) : (
                <div className="col-span-full text-center py-12">
                  <p className="text-gray-400 mb-4">No albums created yet</p>
                  <Link to="/music/add-music">
                    <button className="bg-white text-black px-6 py-3 rounded-full font-bold hover:bg-gray-200 transition-colors cursor-pointer">
                      Create Your First album
                    </button>
                  </Link>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default YourMusic;
