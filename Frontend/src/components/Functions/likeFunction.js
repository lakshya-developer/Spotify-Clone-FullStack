export const likeSong = async (userId, songId) => {
  try {
    const response = await fetch("http://localhost:3000/api/music/likeSong",{
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },    
      body: JSON.stringify({userId, songId})
    });
    if(response.ok){
      console.log("Song Liked.");
    }
  } catch (error) {
    console.log(error);
  }
}

export const likeAlbum = async (userId, albumId) => {
  try {
    const response = await fetch("http://localhost:3000/api/music/likeAlbum",{
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },    
      body: JSON.stringify({userId, albumId})
    });
    if(response.ok){
      console.log("Album Liked.");
    }
  } catch (error) {
    console.log(error);
  }
}