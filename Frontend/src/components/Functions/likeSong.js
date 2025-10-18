export const likeSong = async (userId, songId) => {
  try {
    const response = fetch("http://localhost:3000/api/music/likeSong",{
      method: "POST",
      headers: {
        "Content-Type": "Application/json"
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