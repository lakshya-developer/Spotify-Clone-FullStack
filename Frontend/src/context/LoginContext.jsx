import React, { useEffect, createContext, useContext, useState } from "react";

const LoginContext = createContext();

// Provider Component

function LoginProvider({children}) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [ isLoading, setIsLoading ] = useState(true);

  const checkAuthStatus = async () => {
    try {
      setIsLoading(true)
      const response = await fetch("http://localhost:3000/api/auth/checkAuth", {
        credentials: "include"
      });

      if (response.status === 200) {
        const userData = await response.json();
        setIsLoggedIn(true);
        setUser(userData);
        setIsLoading(false);
      } else {
        setIsLoggedIn(false);
        setUser(null);
      }
    } catch (error) {
      console.error("Auth check error:", error);
      setIsLoggedIn(false);
      setUser(null);
    }
  };

  useEffect(() => {
    checkAuthStatus();
  }, []);

  return (
    <LoginContext.Provider value={{
      isLoggedIn,
      isLoading,
      setIsLoggedIn,
      user,
      setUser,
      checkAuthStatus,
    }}>
      {children}
    </LoginContext.Provider>
  );
}

function useLoginCheck() {
  const context = useContext(LoginContext);
  if (context === undefined) {
    throw new Error('useLoginCheck must be used within a LoginProvider');
  }
  return context;
}

export { LoginProvider, useLoginCheck };