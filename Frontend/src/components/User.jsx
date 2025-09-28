import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useLoginCheck } from "../context/LoginContext";
import { Nav } from "../components";
import { useEffect } from "react";

function User() {
  const { isLoggedIn, user, setIsLoggedIn, handleLogout } = useLoginCheck();
  const [albumsNo, setalbumsNo] = useState({
    songs: 0,
    albums: 0,
  });

  useEffect((e) => {
    if (user.userType === "artist") {
      const fetchAlbumsN0 = async () => {
        const response = await fetch(
          "http://localhost:3000/api/music/getMusic",
          {
            method: "POST",
            headers: {
              credentials: "true",
              "content-type": "application/json",
            },
            body: JSON.stringify({ userId: user.id }),
          }
        );

        if (response.ok) {
          const data = await response.json();
          if (data.albums && data.songs) {
            setalbumsNo({
              songs: data?.songs?.length ?? 0,
              albums: data?.albums?.length ?? 0,
            });
          }
        }
      };

      fetchAlbumsN0();
    }
  }, []);

  const profileImage = user.coverPhoto || "/img/default-profile.png"; // Fallback image

  // Protection against null user or not logged in state
  if (!isLoggedIn || !user) {
    return (
      <div className="main-content bg-gray-900 flex flex-col flex-1 items-center justify-center">
        <div className="text-white text-xl mb-4">
          Please log in to view your profile
        </div>
        <Link
          to="/login"
          className="bg-green-500 text-white px-6 py-3 rounded-full font-bold hover:bg-green-600 transition-all"
        >
          Go to Login
        </Link>
      </div>
    );
  }

  // Rest of your component remains the same but wrapped in a fragment
  return (
    <div className="main-content bg-gray-900 flex flex-col flex-1">
      {/* Navigation */}
      <Nav />

      {/* Main Content */}
      <div className="flex-1 p-8 overflow-y-auto custom-scrollbar">
        {/* User Profile Header */}
        <div className="flex items-center gap-8 mb-12">
          <div className="w-48 h-48 bg-gray-700 rounded-full flex items-center justify-center">
            {/* <i className="fas fa-user text-6xl text-gray-400"></i> */}
            <img
              src={profileImage}
              className="w-full h-full rounded-full object-cover"
              alt="User Profile"
            />
          </div>
          <div>
            <h1 className="text-4xl font-bold mb-2">
              {user?.firstName} {user?.lastName}
            </h1>
            <p className="text-gray-400 mb-4">{user?.userType}</p>
            <div className="flex gap-6 text-sm text-gray-400">
              {user.userType === "artist" ? (
                <div className="flex gap-6 text-gray-300">
                  <div>
                    <span className="font-bold text-white">
                      {albumsNo.songs}
                    </span>{" "}
                    Songs
                  </div>
                  <div>
                    <span className="font-bold text-white">
                      {albumsNo.albums}
                    </span>{" "}
                    Albums
                  </div>
                  <div>
                    <span className="font-bold text-white">234</span> Likes
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        </div>

        {/* User Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-gray-800 p-6 rounded-xl">
            <h3 className="text-lg font-semibold mb-2">Top Genre</h3>
            <p className="text-3xl font-bold text-green-500">Pop</p>
          </div>
          <div className="bg-gray-800 p-6 rounded-xl">
            <h3 className="text-lg font-semibold mb-2">Minutes Listened</h3>
            <p className="text-3xl font-bold text-purple-500">45.2K</p>
          </div>
          <div className="bg-gray-800 p-6 rounded-xl">
            <h3 className="text-lg font-semibold mb-2">Favorite Artist</h3>
            <p className="text-3xl font-bold text-blue-500">The Weeknd</p>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Recent Activity</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <div
                key={item}
                className="bg-gray-800 p-4 rounded-lg group relative"
              >
                <div className="aspect-square bg-gray-700 rounded-lg mb-3">
                  <img
                    src={`/img/album${item}.jpg`}
                    alt="Album Cover"
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>
                <h3 className="text-sm font-medium truncate">
                  Recently Played
                </h3>
                <p className="text-xs text-gray-400 truncate">3 hours ago</p>
                <button className="play-button w-10 h-10 bg-green-500 rounded-full flex items-center justify-center absolute right-6 bottom-16 opacity-0 group-hover:opacity-100 transition-all duration-200 -translate-y-2 group-hover:translate-y-0">
                  <img className="w-4" src="/img/play.svg" alt="Play" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Public Playlists */}
        <div>
          <h2 className="text-2xl font-bold mb-6">Public Playlists</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((playlist) => (
              <div
                key={playlist}
                className="flex bg-gray-800/50 rounded-xl overflow-hidden hover:bg-gray-800 transition-colors group"
              >
                <div className="w-24 h-24 bg-gray-700 flex-shrink-0">
                  <img
                    src={`/img/playlist${playlist}.jpg`}
                    alt="Playlist Cover"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 p-4 flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold mb-1">
                      My Playlist #{playlist}
                    </h3>
                    <p className="text-sm text-gray-400">32 tracks</p>
                  </div>
                  <button className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200">
                    <img className="w-4" src="/img/play.svg" alt="Play" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default User;
