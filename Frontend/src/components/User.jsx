import React from 'react';
import { Link } from 'react-router-dom';
import { useLoginCheck } from "../context/LoginContext";

function User() {
  const { isLoggedIn } = useLoginCheck();

  return (
    <div className="main-content bg-gray-900 flex flex-col flex-1">
      {/* Navigation */}
      <div className="bg-gray-800 h-20 flex items-center justify-end px-6 rounded-lg m-2">
        <div className="flex items-center gap-4">
          {isLoggedIn ? (
            <>
              <Link
                to="/sign-up"
                className="bg-white text-black px-4 py-2 rounded-full text-sm font-bold cursor-pointer hover:px-5 hover:py-2.5 hover:text-base transition-all"
              >
                Sign Up
              </Link>
              <Link
                to="/login"
                className="bg-gray-700 px-4 py-2 rounded-full text-sm font-bold cursor-pointer hover:px-5 hover:py-2.5 transition-all hidden md:block"
              >
                Login
              </Link>
            </>
          ) : (
            <Link
              to="/music/user-profile"
              className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center cursor-pointer hover:w-10 hover:h-10 transition-all"
            >
              User
            </Link>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8 overflow-y-auto custom-scrollbar">
        {/* User Profile Header */}
        <div className="flex items-center gap-8 mb-12">
          <div className="w-48 h-48 bg-gray-700 rounded-full flex items-center justify-center">
            <i className="fas fa-user text-6xl text-gray-400"></i>
          </div>
          <div>
            <h1 className="text-4xl font-bold mb-2">John Doe</h1>
            <p className="text-gray-400 mb-4">Premium Member</p>
            <div className="flex gap-6 text-sm text-gray-400">
              <div>
                <span className="font-bold text-white">12</span> Playlists
              </div>
              <div>
                <span className="font-bold text-white">234</span> Following
              </div>
              <div>
                <span className="font-bold text-white">1.2K</span> Followers
              </div>
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
              <div key={item} className="bg-gray-800 p-4 rounded-lg group relative">
                <div className="aspect-square bg-gray-700 rounded-lg mb-3">
                  <img 
                    src={`/img/album${item}.jpg`} 
                    alt="Album Cover" 
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>
                <h3 className="text-sm font-medium truncate">Recently Played</h3>
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
              <div key={playlist} className="flex bg-gray-800/50 rounded-xl overflow-hidden hover:bg-gray-800 transition-colors group">
                <div className="w-24 h-24 bg-gray-700 flex-shrink-0">
                  <img 
                    src={`/img/playlist${playlist}.jpg`} 
                    alt="Playlist Cover" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 p-4 flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold mb-1">My Playlist #{playlist}</h3>
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