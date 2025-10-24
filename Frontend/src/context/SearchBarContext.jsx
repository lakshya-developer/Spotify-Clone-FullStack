import React, {useState, createContext, useContext} from 'react'

const SearchBarContext = createContext();

function SearchBarProvider({ children }) {
  const [ searchBar, setSearchBar ] = useState(false);

  return (
    <SearchBarContext.Provider value={{
      searchBar,
      setSearchBar
    }}>
      {children}
    </SearchBarContext.Provider>
  )
}

const useSearchBarContext = () => {
  const context = useContext(SearchBarContext);
  if (context === undefined) {
    throw new Error('useLoginCheck must be used within a LoginProvider');
  }
  return context;
}

export {SearchBarProvider, useSearchBarContext}