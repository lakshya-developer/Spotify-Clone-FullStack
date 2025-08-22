import React from "react"
import { useContext } from "react";

const loginContext = React.createContext({
  
});

export default useLoginCheck = () => {
  return useContext(loginContext)
}

export const LoginiContext = loginContext.Provider;