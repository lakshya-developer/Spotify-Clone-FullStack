import React, {useState, createContext, useContext} from 'react'

const SearchBarContext = createContext();

function SearchBarProvider({ children }) {
  const [ searchBar, setSearchBar ] = useState(false);
  const [searchResults, setSearchResults] = useState({
    songs: [],
    albums: [],
    artists: [],
  });
  const [browseContent, setBrowseContent] = useState([]); // 🎨 predisplayed categories
  const [query, setQuery] = useState("");
  const [error, setError] = useState(null);
  

  return (
    <SearchBarContext.Provider value={{
      searchBar,
      setSearchBar,
      searchResults,
      setSearchResults,
      browseContent,
      setBrowseContent,
      query,
      setQuery,
      error,
      setError,
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