import React, { useEffect, useState } from "react";
import { EllipsisVertical } from "lucide-react";
import { Link, NavLink } from "react-router-dom";
import { useLoginCheck } from "../context/LoginContext";
import Nav from "./nav/Nav";
import { usePlayBarContext } from "../context/PlayBarContext";
import { useAlbumLoadContext } from "../context/AlbumLoadContext";
import { likeSong } from "./Functions/likeSong";

export default function RightSide() {
  const [homeContent, setHomeContent] = useState({
    songs: [],
    albums: [],
    artists: [],
  });
  const { PlaySong } = usePlayBarContext();
  const { songLoad } = useAlbumLoadContext();
  // This tracks which song’s menu is open
  const [openMenuId, setOpenMenuId] = useState(null);
  const {user} = useLoginCheck();
  

  const cards = [
    { title: "Today's Top Hits" },
    { title: "RapCaviar" },
    { title: "All Out 2010s" },
    { title: "Rock Classics" },
    { title: "Chill Hits" },
  ];

  useEffect(() => {
    // TODO: Replace with actual API calls
    const fetchUserContent = async () => {
      try {
        const response = await fetch(
          "http://localhost:3000/api/music/getMusicHome",
          {
            credentials: "include",
          }
        );
        const artistResponse = await fetch(
          "http://localhost:3000/api/music/getArtistsInfo"
        );

        if (response.ok && artistResponse.ok) {
          // console.log(homeContent);
          const data = await response.json();
          const artistData = await artistResponse.json();
          setHomeContent({
            songs: data.songs,
            albums: data.albums,
            artists: artistData,
          });
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

      {/* Main Content */}
      <div className="flex-1 p-4 overflow-y-auto">
        <div className="flex-1 p-4 ">
          <h2 className="text-2xl font-bold">Spotify Songs</h2>
          <div className=" p-8 ">
            {/* --- Grid is now 4 columns --- */}
            <div className="grid grid-cols-4 gap-4">
              {homeContent.songs?.map((song) => (
                // <div
                //   key={song._id}
                //   // --- Card is now a flex container for horizontal layout ---
                //   className="card-hover bg-gray-800 p-4 pr-5 rounded-lg transition-all duration-300 relative group flex items-center gap-4"
                // >
                //   {/* --- Image is smaller and has a fixed size --- */}
                //   <div className="w-10 h-10 bg-gray-700 rounded-lg overflow-hidden flex-shrink-0">
                //     <img
                //       src={song.coverPhoto || "/img/default-album.png"}
                //       alt={song.title}
                //       className="w-full h-full object-cover"
                //     />
                //   </div>

                //   {/* --- New div wrapping h3 and p for vertical alignment --- */}
                //   <div className="flex-grow overflow-hidden">
                //     <h3 className="text-white font-medium mb-1 truncate">
                //       {song.title}
                //     </h3>
                //     <p className="text-gray-400 text-sm truncate">
                //       Artist: {song.artist}
                //     </p>
                //   </div>

                //   {/* --- Button is unchanged as per instructions --- */}
                //   <button onClick={() => PlaySong(song._id, "song")} className="play-button w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-black font-bold hover:bg-green-400 transition-all duration-200 absolute right-2 bottom-1 opacity-0 group-hover:opacity-100 group-hover:translate-y-[-1.5rem] translate-y-0 cursor-pointer">
                //     <img className="w-3 cursor-pointer" src="/img/newplay.svg" alt="Play" />
                //   </button>
                // </div>
                <div className="flex flex-col gap-3">
                    <div
                      key={song._id}
                      className="card-hover bg-gray-800 p-4 pr-5 rounded-lg transition-all duration-300 relative group flex items-center gap-4"
                    >
                      {/* --- Song Image --- */}
                      <div className="w-10 h-10 bg-gray-700 rounded-lg overflow-hidden flex-shrink-0">
                        <img
                          src={song.coverPhoto || "/img/default-album.png"}
                          alt={song.title}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {/* --- Song Info --- */}
                      <div className="flex-grow overflow-hidden">
                        <h3 className="text-white font-medium mb-1 truncate">
                          {song.title}
                        </h3>
                        <p className="text-gray-400 text-sm truncate">
                          {song.artist}
                        </p>
                      </div>

                      {/* --- Play Button --- */}
                      <div>

                      </div>
                      <button
                        onClick={() => PlaySong(song._id, "song")}
                        className="play-button w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-black font-bold hover:bg-green-400 transition-all duration-200 absolute right-10 bottom-0 opacity-0 group-hover:opacity-100 group-hover:translate-y-[-1.6rem] translate-y-0 cursor-pointer"
                      >
                        <img
                          className="w-3 cursor-pointer"
                          src="/img/newplay.svg"
                          alt="Play"
                        />
                      </button>

                      {/* --- 3-dot Menu Button --- */}
                      <div className="relative">
                        <button
                          onClick={() =>
                            setOpenMenuId(
                              openMenuId === song._id ? null : song._id
                            )
                          }
                          className="text-gray-400 hover:text-white transition"
                        >
                          <EllipsisVertical size={20} />
                        </button>

                        {openMenuId === song._id && (
                          <div
                            className="absolute right-0 top-6 bg-gray-900 border border-gray-700 rounded-lg shadow-lg py-2 z-50 w-40"
                            onMouseLeave={() => setOpenMenuId(null)}
                          >
                            <button
                              className="block w-full text-left px-4 py-2 text-sm text-gray-200 hover:bg-gray-700"
                              onClick={() =>
                                likeSong(user._id,song._id)
                              }
                            >
                              ❤️ Like
                            </button>
                            <button
                              className="block w-full text-left px-4 py-2 text-sm text-gray-200 hover:bg-gray-700"
                              onClick={() =>
                                console.log(`Favorited: ${song.title}`)
                              }
                            >
                              ⭐ Favorite
                            </button>
                            <button
                              className="block w-full text-left px-4 py-2 text-sm text-gray-200 hover:bg-gray-700"
                              onClick={() =>
                                console.log(`Add to Playlist: ${song.title}`)
                              }
                            >
                              ➕ Add to Playlist
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="flex-1 p-4 ">
          <h2 className="text-2xl font-bold mb-6">Spotify Albums</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {homeContent.albums?.map((album) => (
              <div
                onClick={() => songLoad(album._id)}
                key={album._id}
                className="card-hover bg-gray-800 p-4 rounded-lg cursor-pointer transition-all duration-300 relative group"
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
                <p className="text-gray-400 text-sm">Album</p>
                <button className="play-button w-12 h-12 bg-green-500 rounded-full flex items-center justify-center text-black font-bold hover:bg-green-400 transition-all duration-200 absolute right-5 bottom-12 opacity-0 group-hover:opacity-100 group-hover:translate-y-[-2rem] translate-y-0">
                  <img className="w-4" src="/img/newplay.svg" alt="Play" />
                </button>
              </div>
            ))}
          </div>
        </div>
        <div className="flex-1 p-4 ">
          <h2 className="text-2xl font-bold mb-6">Spotify Albums</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {homeContent.artists?.map((artist) => (
              <div
                onClick={() => songLoad(album._id)}
                key={artist._id}
                className="card-hover bg-gray-800 p-4 rounded-lg cursor-pointer transition-all duration-300 relative group"
              >
                <div className="aspect-square bg-gray-700 rounded-lg mb-4 overflow-hidden">
                  <img
                    src={artist.coverPhoto || "/img/default-album.png"}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-white font-medium mb-1 truncate">
                  {artist.firstName + " " + artist.lastName}
                </h3>
                <p className="text-gray-400 text-sm">Artist</p>
                {/* <button className="play-button w-12 h-12 bg-green-500 rounded-full flex items-center justify-center text-black font-bold hover:bg-green-400 transition-all duration-200 absolute right-5 bottom-12 opacity-0 group-hover:opacity-100 group-hover:translate-y-[-2rem] translate-y-0">
                    <img className="w-4" src="/img/newplay.svg" alt="Play" />
                  </button> */}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
