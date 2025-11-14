import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useLoginCheck } from "../../context/LoginContext";
import { useSearchBarContext } from "../../context/SearchBarContext";
import { Search } from "../Functions/search";
import API_BASE_URL from "../../config";

export default function Nav() {
  const { isLoggedIn, setIsLoggedIn, user, setUser } = useLoginCheck();
  const navigate = useNavigate();
  const { searchBar, setSearchBar, setSearchResults, setBrowseContent, query, setQuery, setError } = useSearchBarContext();

  const handleLogout = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/logout`, {
        method: "POST",
        credentials: "include",
      });

      if (response.status === 200) {
        setIsLoggedIn(false);
        setUser(null);
        console.log("Logout Successfull");
      } else {
        console.error("Logout Fail");
      }
    } catch (error) {
      console.log("error occured while logging out:", error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim() !== "") {
      Search(query.trim(), setSearchResults, setError);
    }
    
  };

  return (
    <div className="bg-gray-800 h-20 flex items-center justify-end px-6 rounded-lg m-2 relative">
      {searchBar ? ( <div className="absolute left-10">
        <form
          onSubmit={handleSubmit}
          className="flex items-center bg-gray-800 rounded-full px-4 py-2 w-full max-w-md mx-auto shadow-md"
        >
          <img
            src="/img/search.svg"
            alt="Search"
            className="w-5 h-5 invert opacity-70"
          />
          <input
            type="text"
            placeholder="Search songs..."
            value={query}
            onChange={(e) => {setQuery(e.target.value); Search(query, setSearchResults, setError)}}
            className="bg-transparent text-white placeholder-gray-400 outline-none ml-3 w-full"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery("")}
              className="text-gray-400 hover:text-white ml-2"
            >
              ✕
            </button>
          )}
          <button
              type="button"
              onClick={() => {setSearchBar(false); navigate("/")}}
              className="text-gray-400 hover:text-white ml-2"
            >
              ✕
            </button>
        </form>
      </div>) : null}
      <div className="flex items-center gap-4 relative">
        {isLoggedIn ? (
          <>
            {user?.userType === "artist" ? (
              <>
                <NavLink
                  to="/music/your-music"
                  className={({ isActive }) =>
                    `bg-gray-700 text-white px-4 py-2 rounded-full text-sm font-bold cursor-pointer hover:text-base transition-all ${
                      isActive ? "bg-gray-800" : "hover:bg-gray-800"
                    }`
                  }
                >
                  Your Music
                </NavLink>
                <NavLink
                  to="/music/add-music"
                  className={({ isActive }) =>
                    `bg-gray-700 text-white px-4 py-2 rounded-full text-sm font-bold cursor-pointer hover:text-base transition-all ${
                      isActive ? "bg-gray-800" : "hover:bg-gray-800"
                    }`
                  }
                >
                  Add Music
                </NavLink>
              </>
            ) : (
              <NavLink
                to="/music/library"
                className={({ isActive }) =>
                  `bg-gray-700 text-white px-4 py-2 rounded-full text-sm font-bold cursor-pointer hover:text-base transition-all ${
                    isActive ? "bg-gray-800" : "hover:bg-gray-800"
                  }`
                }
              >
                Library
              </NavLink>
            )}

            {/* Profile icon and dropdown */}
            <div className="relative group">
              <div className="w-9 h-9 bg-gray-700 rounded-full flex items-center justify-center cursor-pointer overflow-hidden border border-gray-600 group-hover:border-gray-400 transition-all">
                <img
                  className="rounded-full w-full h-full object-cover"
                  src={user.coverPhoto}
                  alt={user.firstName?.charAt(0) || "U"}
                />
              </div>

              {/* Dropdown - hover fix */}
              <div
                className="absolute right-0 top-11 bg-gray-900 text-white text-sm rounded-lg shadow-lg opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-all duration-200 w-40 py-2 z-50"
                onMouseEnter={(e) =>
                  e.currentTarget.classList.add("opacity-100", "visible")
                }
                onMouseLeave={(e) =>
                  e.currentTarget.classList.remove("opacity-100", "visible")
                }
              >
                <NavLink
                  to="/music/user-profile"
                  className="block px-4 py-2 hover:bg-gray-800"
                >
                  Your Profile
                </NavLink>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-2 hover:bg-gray-800"
                >
                  Logout
                </button>
              </div>
            </div>
          </>
        ) : (
          <>
            <NavLink
              to="/sign-up"
              className={({ isActive }) =>
                `${
                  isActive ? "bg-gray-200" : "bg-white hover:bg-gray-200"
                } text-black px-4 py-2 rounded-full text-sm font-bold cursor-pointer hover:bg-gray-800 hover:text-white hover:text-base transition-all`
              }
            >
              Sign Up
            </NavLink>
            <NavLink
              to="/login"
              className={({ isActive }) =>
                `${
                  isActive ? "bg-gray-800" : "bg-gray-700"
                } bg-gray-700 text-white px-4 py-2 rounded-full text-sm font-bold cursor-pointer hover:bg-gray-800 hover:text-base transition-all`
              }
            >
              Login
            </NavLink>
          </>
        )}
      </div>
    </div>
  );
}
