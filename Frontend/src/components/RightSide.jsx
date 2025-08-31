import React from "react";
import { Link } from "react-router-dom";
import { useLoginCheck } from "../context/LoginContext";

export default function RightSide() {
  const { isLoggedIn, user } = useLoginCheck();

  const cards = [
    { title: "Today's Top Hits" },
    { title: "RapCaviar" },
    { title: "All Out 2010s" },
    { title: "Rock Classics" },
    { title: "Chill Hits" },
  ];  

  return (
    <div className="main-content bg-gray-900 flex flex-col flex-1">
      {/* Navigation */}
      <div className="bg-gray-800 h-20 flex items-center justify-end px-6 rounded-lg m-2">
        <div className="flex items-center gap-4">
          {isLoggedIn && user ? (
            <Link
              to="/music/user-profile"
              className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center cursor-pointer hover:w-10 hover:h-10 transition-all"
            >
              {user.firstName.charAt(0)}
            </Link>
          ) : (
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
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-4 overflow-y-auto custom-scrollbar">
        <h2 className="text-2xl font-bold mb-6">Spotify Playlist</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {cards.map((card, idx) => (
            <div
              key={idx}
              className="card-hover bg-gray-800 p-4 rounded-lg cursor-pointer transition-all duration-300 relative group"
            >
              <div className="w-full aspect-square bg-gray-700 rounded-lg mb-3 flex items-center justify-center">
                <i className="fas fa-music text-gray-500 text-3xl"></i>
              </div>
              <h3 className="text-white font-medium mb-1 truncate">
                {card.title}
              </h3>
              <p className="text-gray-400 text-sm">Playlist</p>
              <button 
                className="play-button w-12 h-12 bg-green-500 rounded-full flex items-center justify-center text-black font-bold hover:bg-green-400 transition-all duration-200 absolute right-5 bottom-12 opacity-0 group-hover:opacity-100 group-hover:translate-y-[-2rem] translate-y-0"
              >
                <img className="w-4" src="/img/newplay.svg" alt="Play" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
