import Myaxios from '../../api/axios';
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import "./SearchPage.css"

const SearchPage = () => {
  
  const [searchResults, setSearchResults] = useState([]);
  const navigate = useNavigate();

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

  if(searchResults.length > 0){
  return ( 
    <section className='search-container'>
      {searchResults.map((movie) => {
        if(movie.backdrop_path !== null && movie.media_type !== "person"){
          const movieImageUrl = 
            "https://image.tmdb.org/t/p/w500" + movie.backdrop_path;
          
            return(
              <div>
                <div className="movie" key={movie.id}>
                  <div
                    onClick={() => navigate(`/${movie.id}`)}
                    className='movie__column-poster'
                  >
                    <img src={movieImageUrl}
                      alt="movie"
                      className='movie__poster'
                    />
                  </div>
                </div>
              </div>
            )
        }
      })}

    </section>
  )
  }else{
    return (
      <div className='no-results'>
        <p className='no-results__text'>
          찾고자 하는 검색어 "{searchTerm}"이 없습니다.
        </p>
      </div>
    )
  }
}

export default SearchPage