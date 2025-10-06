import React from "react";
import { createContext, useRef, useState } from "react";
import { useContext } from "react";
import { useLoginCheck } from "./LoginContext";

const PlayBarContext = createContext();

function PlayBarProvider({ children }) {
  const audioRef = useRef(null);
  const [ currentSong, setCurrentSong ] = useState(null);
  const { isLoggedIn } = useLoginCheck();


  const PlaySong = async (songId) => {
    try {

      if(!isLoggedIn){
        alert("Please Login First to listen a song.");
        return null;
      }

      const response = await fetch(
        "http://localhost:3000/api/music/getMusicInfo",
        {
          method: "POST",
          credentials: "include",
          headers: {
            "content-Type": "application/json",
          },
          body: JSON.stringify({id: songId, type: "song"})
        }
      );

      if(!response){
        console.log("Error occured while sending request.");
      }

      const data = await response.json();

      // Wait until state updates, then play
      setTimeout(() => {
        if (audioRef.current) {
          audioRef.current.play();
        }
      }, 0);

      setCurrentSong(data);
    } catch (error) {
      console.log("Error Occured", error);
    }
  };
  

  

  return (
    <PlayBarContext.Provider value={{currentSong, setCurrentSong, PlaySong, audioRef}}>
      {children}
    </PlayBarContext.Provider>
  );
}

function usePlayBarContext() {
  const context = useContext(PlayBarContext);
  return context;
}

export { PlayBarProvider, usePlayBarContext };