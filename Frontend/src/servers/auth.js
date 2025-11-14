import API_BASE_URL from "../config"

export const checkLogin = async () => {
  const response = await fetch(`${API_BASE_URL}/api/auth`, {credentials: "include"});

  if(response.status === 200){
    const userData = response.json;
  }
}