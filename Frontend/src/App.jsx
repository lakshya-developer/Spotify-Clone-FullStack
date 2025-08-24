import React, { useContext } from "react";
import { LeftSidebar, PlayerBar, RightSide } from "./components";
import "./App.css";
import { useLoginCheck } from "./context/LoginContext";

function App() {
  const { isLoggedIn, setIsLoggedIn } = useLoginCheck(); // Destructure the object correctly
  console.log(isLoggedIn);
  
  return (
    <div className="bg-black text-white min-h-screen m-0 p-0 font-['Roboto']">
      <div className="flex h-screen">
        <LeftSidebar />
        <RightSide />
      </div>
      <PlayerBar />
    </div>
  );
}

export default App;
