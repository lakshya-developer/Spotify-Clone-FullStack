import React, { useState, useEffect, useContext } from "react";
import { EllipsisVertical } from "lucide-react";
import Nav from "../nav/Nav";
import { usePlayBarContext } from "../../context/PlayBarContext";
import { useLoginCheck } from "../../context/LoginContext";
import HomeLoading from "../ui/HomeLoading";
import { useSearchBarContext } from "../../context/SearchBarContext";

function Search() {
  const { setSearchBar, searchResults, browseContent, query } = useSearchBarContext();

  const { user, isLoading } = useLoginCheck();
  const [openMenuId, setOpenMenuId] = useState(null);

  
  useEffect(() => {
    setSearchBar(true);
  });


  if (isLoading) return <HomeLoading />;
  if (!user) return null;

  return (
    <div className="main-content bg-gray-900 flex flex-col flex-1">

      <Nav />

      <div className="flex-1 p-6 overflow-y-auto">
        {/* 🔍 Search Bar */}
        {/* <div className="w-full mb-8">
          <input
            type="text"
            value={query}
            onChange={handleSearch}
            placeholder="What do you want to listen to?"
            className="w-full p-3 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div> */}

        {/* 🖼️ Default Browse Section (no query yet) */}
        {!query && (
          <div className="flex flex-col gap-8">
            <h2 className="text-2xl font-bold mb-4">Browse all</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {browseContent.map((item, idx) => (
                <div
                  key={idx}
                  className="relative rounded-lg overflow-hidden cursor-pointer group"
                >
                  <img
                    src={item.coverPhoto || "/img/default-album.png"}
                    alt={item.title}
                    className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black via-black/40 to-transparent">
                    <h3 className="text-white text-lg font-semibold">
                      {item.title}
                    </h3>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 🔍 Search Results Section */}
        {query && (
          <div className="flex flex-col gap-8">
            {/* Songs */}
            {searchResults?.songs && (
              <div>
                <h2 className="text-2xl font-bold mb-4">Songs</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {searchResults.songs.map((song) => (
                    <div
                      key={song._id}x
                      className="card-hover bg-gray-800 p-4 rounded-lg relative group flex items-center gap-4 transition-all"
                    >
                      <img
                        src={song.coverPhoto || "/img/default-album.png"}
                        alt={song.title}
                        className="w-12 h-12 object-cover rounded-lg"
                      />
                      <div className="flex-grow overflow-hidden">
                        <h3 className="text-white font-medium truncate">
                          {song.title}
                        </h3>
                        <p className="text-gray-400 text-sm truncate">
                          {song.artist}
                        </p>
                      </div>

                      {/* Play */}
                      <button
                        onClick={() => PlaySong(song._id, "song")}
                        className="play-button absolute right-4 bottom-3 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all"
                      >
                        <img
                          src="/img/newplay.svg"
                          alt="Play"
                          className="w-3"
                        />
                      </button>

                      {/* Menu */}
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
                          <button className="block w-full text-left px-4 py-2 text-sm text-gray-200 hover:bg-gray-700">
                            ❤️ Like
                          </button>
                          <button className="block w-full text-left px-4 py-2 text-sm text-gray-200 hover:bg-gray-700">
                            ➕ Add to Playlist
                          </button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Albums */}
            {searchResults?.albums && (
              <div>
                <h2 className="text-2xl font-bold mb-4">Albums</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                  {searchResults.albums.map((album) => (
                    <div
                      key={album._id}
                      className="card-hover bg-gray-800 p-4 rounded-lg cursor-pointer group transition-all"
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
                      <p className="text-gray-400 text-sm truncate">
                        {album.artistName}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Artists */}
            {searchResults?.artists && (
              <div>
                <h2 className="text-2xl font-bold mb-4">Artists</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                  {searchResults.artists.map((artist) => (
                    <div
                      key={artist._id}
                      className="card-hover bg-gray-800 p-4 rounded-lg cursor-pointer group transition-all"
                    >
                      <div className="aspect-square bg-gray-700 rounded-full mb-4 overflow-hidden">
                        <img
                          src={artist.coverPhoto || "/img/default-artist.png"}
                          alt={artist.firstName}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <h3 className="text-white font-medium mb-1 truncate">
                        {artist.firstName} {artist.lastName}
                      </h3>
                      <p className="text-gray-400 text-sm">Artist</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Search;
