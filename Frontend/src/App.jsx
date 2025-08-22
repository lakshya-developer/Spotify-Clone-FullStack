import React from "react";
import { useState } from 'react'
import { Outlet } from "react-router-dom";
import {LeftSidebar, PlayerBar, RightSide} from './components'
import './App.css'


function App() {
  const [count, setCount] = useState(0)

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

export default App
