import axios from 'axios';
import { useState, useEffect, useContext, createContext } from 'react';

const SearchContext = createContext();

const SearchProvider = ({ children }) => {
  const [Search, setSearch] = useState({
    keyword: '',
    results: [],
  });

  return (
    <SearchContext.Provider value={[Search, setSearch]}>
      {children}
    </SearchContext.Provider>
  );
};

//Custom Hook
const useSearch = () => useContext(SearchContext);

export { useSearch, SearchProvider };
