import React from "react";
import { NavLink } from "react-router-dom";
import { AlbumLoad } from "./";
import { useAlbumLoadContext } from "../context/AlbumLoadContext";
import { useLoginCheck } from "../context/LoginContext";

export default function LeftSidebar() {
  const { setAlbumSongs } = useAlbumLoadContext();
  const { searchBar, setSearchBar } = useLoginCheck();

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
            <NavLink
              to="/"
              onClick={() => {
                setSearchBar(false);
                console.log(searchBar);
              }}
            >
              Home
            </NavLink>
          </li>
          <li className="flex items-center gap-4 cursor-pointer hover:text-white transition-colors">
            <img className="invert w-6 h-8" src="/img/search.svg" alt="" />
            <NavLink
              to="/music/search"
              // onClick={() => {
              //   setSearchBar(true);
              //   console.log(searchBar);
              // }}
            >
              Search
            </NavLink>
          </li>
        </ul>
      </div>
      <div className="flex flex-col bg-gray-800 rounded-lg min-h-0 flex-1">
        <div className="flex items-center justify-between p-4 border-b border-gray-700">
          <div className="flex items-center gap-3 cursor-pointer hover:text-white transition-colors">
            <img className="invert w-6 h-8" src="/img/library.svg" alt="" />
            <NavLink to="/music/library">
              <span>Your library</span>
            </NavLink>
          </div>
          <div className="flex gap-2">
            <div
              onClick={() => setAlbumSongs(null)}
              className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-gray-700 cursor-pointer transition-colors"
            >
              <img
                className="invert w-6 h-8"
                src="https://res.cloudinary.com/dw0ehvbnr/image/upload/v1759039805/close_vm8fhk.svg"
                alt=""
              />
            </div>
            <button className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-gray-700 cursor-pointer transition-colors">
              <img
                className="invert cursor-pointer w-4 h-6"
                src="https://res.cloudinary.com/dw0ehvbnr/image/upload/v1759039413/newplay_ed4019.svg"
                alt=""
              />
            </button>
          </div>
        </div>
        <AlbumLoad />
      </div>
    </div>
  );
}
