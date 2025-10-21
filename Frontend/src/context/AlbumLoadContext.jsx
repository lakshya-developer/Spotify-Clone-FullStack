import React, { useContext, useState } from "react";
import { createContext } from "react";
import { usePlayBarContext } from "./PlayBarContext";

const AlbumLoadContext = createContext();

function AlbumLoadProvider({ children }) {
  const [albumSongs, setAlbumSongs] = useState(null);
  const [currentSongIndex, setCurrentSongIndex] = useState(null);
  const { PlaySong } = usePlayBarContext();
  const [selectedItem, setSelectedItem] = useState(null); // track which section is opened

  const songLoad = async (albumId) => {
    try {
      const response = await fetch(
        "http://localhost:3000/api/music/getMusicInfo",
        {
          method: "POST",
          credentials: "include",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({ id: albumId, type: "album" }),
        }
      );

      if (!response) {
        console.log("error occured while request.", response?.json()?.message);
      }
      const data = await response.json();
      setAlbumSongs(data.songs);
    } catch (err) {
      console.log("Error Occured", err);
    }
  };

  const songLoadPlay = async (albumId) => {
    try {
      songLoad(albumId);
    } catch (err) {
      console.log("Error Occured", err);
    }
  };

  const albumSongPlay = (songId) => {
    try {
      PlaySong(songId);
      setCurrentSongIndex(albumSongs.findIndex(song => song._id === songId));
    } catch (error) {
      console.log("Error Occured:", error);
    }
  };

  return (
    <AlbumLoadContext.Provider
      value={{
        albumSongs,
        setAlbumSongs,
        songLoad,
        songLoadPlay,
        currentSongIndex,
        setCurrentSongIndex,
        albumSongPlay,
        selectedItem,
        setSelectedItem
      }}
    >
      {children}
    </AlbumLoadContext.Provider>
  );
}

const useAlbumLoadContext = () => {
  const context = useContext(AlbumLoadContext);
  return context;
};

export { AlbumLoadProvider, useAlbumLoadContext };
