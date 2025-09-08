export const checkLogin = async () => {
  const response = await fetch("http://localhost:3000/api/auth", {credentials: "include"});

  if(response.status === 200){
    const userData = response.json;
  }
}