import API_BASE_URL from "../../config"

export const createPlaylist = async (userId, title, setUserContent, setNewPlaylistName, setShowNewPlaylistForm, setError) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/api/music/createPlaylist`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, title }),
      }
    );
    if (response.ok) {
      const data = await response.json();
      setUserContent((prev) => ({
        ...prev,
        playlist: [...prev.playlist, data],
      }));
      setNewPlaylistName("");
      setShowNewPlaylistForm(false);
    }else if(response.status === 400){
      const data = await  response.json();
      setError(data.message);
    }
  } catch (err) {
    console.error("Error creating playlist:", err);
  }
};

export const addToPlaylist = async (userId, playlistName, songId) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/api/music/createPlaylist`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, playlistName, songId }),
      }
    );
    if (response.ok) {
      const data = await response.json();
      console.log(data.message);
    }else {
      const data = await  response.json();
      console.log(data.message);
    }
  } catch (err) {
    console.error("Error creating playlist:", err);
  }
}

export const playlistSongs = async (userId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/music/playlistSongs`,{
      method: "POST",
      headers: { "Content-Type": "application/json"},
      body: JSON.stringify({userId})
    });
    if(response.ok){
      const data = await response.json();
      return data;
    }
  } catch (error) {
    console.log(error);
  }
}