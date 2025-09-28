import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useLoginCheck } from "../../context/LoginContext";

export default function Nav() {
  const { isLoggedIn, setIsLoggedIn, user } = useLoginCheck();

  const handleLogout = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });

      if (response.status === 200) {
        setIsLoggedIn(false);
        console.log("Logout Successfull");
      } else {
        console.error("Logout Fail");
      }
    } catch (error) {
      console.log("error occured while logging out:", error);
    }
  };


  return (
    <div className="bg-gray-800 h-20 flex items-center justify-end px-6 rounded-lg m-2">
      <div className="flex items-center gap-4">
        {isLoggedIn && user ? (
          <>
            {user.userType === "artist" ? (
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
            ) : null }

            <NavLink
              to="/music/user-profile"
              className={({ isActive }) =>
                `w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center cursor-pointer hover:text-base transition-all ${
                  isActive ? "bg-gray-800" : "hover:bg-gray-800"
                }`
              }
            >
              <img className="rounded-full " src={user.coverPhoto} alt={user.firstName.charAt[0]} />
            </NavLink>
            <button
              onClick={handleLogout}
              className="bg-gray-700 text-white px-4 py-2 rounded-full text-sm font-bold cursor-pointer hover:bg-gray-800 hover:text-base transition-all"
            >
              Logout
            </button>
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
