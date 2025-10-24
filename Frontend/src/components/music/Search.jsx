import React, { useEffect } from 'react'
import Nav from '../nav/Nav'
import { useSearchBarContext } from '../../context/SearchBarContext';

function Search() {
  const { searchBar, setSearchBar } = useSearchBarContext();

  useEffect(() => {
    setSearchBar(true);
  })

  return (
    <div className="main-content bg-gray-900 flex flex-col flex-1">
      <Nav />

    </div>
  )
}

export default Search;