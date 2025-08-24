import React, { useEffect, createContext, useContext, useState } from "react";

const LoginContext = createContext({
  isLoggedIn: false,
  setIsLoggedIn: () => {},
});

// Provider Component

export function LoginProvider({children}) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Fetch login status form API when the app loads

  useEffect(() => {
    fetch("http://localhost:3000/api/auth", {credentials: "include"})
      .then((res) => {
        if(res.status === 200) setIsLoggedIn(true);
        else setIsLoggedIn(false);
      })
      .catch(() => {
        setIsLoggedIn(false);
      });
  }, []);

  return (
    <LoginContext.Provider value={{isLoggedIn, setIsLoggedIn}}>
      {children}
    </LoginContext.Provider>
  );
}

export function useLoginCheck() {
  const context = useContext(LoginContext);
  if (context === undefined) {
    throw new Error('useLoginCheck must be used within a LoginProvider');
  }
  return context;
}

