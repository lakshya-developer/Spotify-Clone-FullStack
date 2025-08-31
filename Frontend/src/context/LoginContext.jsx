import React, { useEffect, createContext, useContext, useState } from "react";

const LoginContext = createContext({
  isLoggedIn: false,
  setIsLoggedIn: () => {},
  user: null,
  setUser: () => {},
  isLoading: true,
  error: null,
});

// Provider Component

function LoginProvider({children}) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch login status form API when the app loads

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/auth", {
          credentials: "include"
        });

        if (response.status === 200) {
          const userData = await response.json();
          setIsLoggedIn(true);
          setUser(userData);
        } else {
          setIsLoggedIn(false);
          setUser(null);
        }
      } catch (err) {
        setError("Failed to check authentication status");
        setIsLoggedIn(false);
        setUser(null);
      } finally {
        // setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  return (
    <LoginContext.Provider 
      value={{
        isLoggedIn, 
        setIsLoggedIn, 
        user, 
        setUser,
        isLoading,
        error
      }}
    >
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