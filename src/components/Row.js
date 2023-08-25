import React, { useCallback, useEffect, useState } from 'react'
import myAxios from '../api/axios'
import './Row.css'

const Row = ({title, id, fetchUrl}) => {
  const [movies, setMovies] = useState([]);

  // 컴포넌트가 렌더링 될 때마다, fetchMovieData가 새로 생성됨
  // 함수를 메모이제이션 해주면 성능 개선 가능
  const fetchMovieData = useCallback(async () => {
    const response = await myAxios.get(fetchUrl);
    setMovies(response.data.results);
  }, [fetchUrl])
  
  useEffect(() => {
    fetchMovieData();
  }, [fetchMovieData])
  // [] : dependency 함수에 fetchUrl을 넣어주자
  // fetchUrl이 변경되면, dependency 함수를 실행시킴
  
  return (
    <div>
      <h2>{title}</h2>
      <div className='slider'>
        <div className='slider__arrow-left'>
          <span className='arrow'
            onClick={() => {
              document.getElementById(id).scrollLeft -= window.innerWidth - 80;
            }}
          >
            {"<"}
          </span>
        </div>
        <div id={id} className='row__posters'>
          {movies.map(movie => (
            <img key={movie.id}
              className='row__poster'
              src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
              alt={movie.title}
            ></img>
          ))}
        </div>

        <div className='slider__arrow-right'>
          <span className='arrow'
            onClick={() => {
              document.getElementById(id).scrollLeft += window.innerWidth - 80;
            }}
          >
            {">"}
          </span>
        </div>
      </div>
    </div>
  )
}

export default Row