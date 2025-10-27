export const Search = async (title, setSearchResults, setError) => {
  try {
    const response = await fetch(
      "http://localhost:3000/api/music/search",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title }),
      }
    );
    if(response.ok){
      const data = await response.json();
      setSearchResults(data);
    }else if(response.status === 400){
      const data = await response.json();
      setError(data.message);
    }
  } catch (error) {
    console.log(error);
  }
}