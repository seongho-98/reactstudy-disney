import Myaxios from '../../api/axios';
import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';

const SearchPage = () => {
  
  const [searchResults, setSearchResults] = useState([]);

  const useQuery = () => {
    return new URLSearchParams(useLocation().search);
  }

  let query = useQuery();
  const searchTerm = query.get("q");

  useEffect(() => {
    if(searchTerm){ //searchTerm이 있을 때
      fetchSearchMovie(searchTerm);
    }
  },[searchTerm])

  const fetchSearchMovie = async (searchTerm) => {
    try{
      const response = await Myaxios.get(`/search/multi?include_adult=false&query=${searchTerm}`);
      setSearchResults(response.data.results);
      console.log(response.data.results);
    }catch(error){
      console.log(error);
    }
  }

  return (
    <div> SearchPage</div>
  )
}

export default SearchPage