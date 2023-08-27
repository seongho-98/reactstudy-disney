import React, { useEffect, useState } from 'react'
import axiosMy from '../api/axios';
import request from '../api/request';
import "./Banner.css";
import styled from 'styled-components';

function Banner() {

  const [movie, setMovie] = useState([]);

  const [isClicked, setIsClicked] = useState(false);

  useEffect(() => {
    fetchData();
  }, [])

  const fetchData = async() => {
    //현재 상영중인 영화 정보 가져오기
    const response = await axiosMy.get(request.fetchNowPlaying);

    const movieId = response.data.results[
      Math.floor(Math.random() * response.data.results.length)
    ].id

    //특정 영화에 더 상세한 정보 가져오기(비디오 정보도 포함)
    const {data : movieDetail} = await axiosMy.get(`movie/${movieId}`,
    {
      params: {append_to_response: 'videos'}
    })
    setMovie(movieDetail);
    console.log(movieDetail);

  }

  const truncate = (str, n) => {
    return str?.length > n? str.substr(0, n) + '...' : str;
  }

  //조건 처리 -> 클릭됨 -> 비디오 배너 생성
  if(isClicked){
    return(
      // 부모요소 반드시 필요 -<> 빈 부모 사용
      <>
      <Container>
        <HomeContainer>
          <Iframe src={`https://www.youtube.com/embed/${movie.videos.results[0].key}?controls=0&autoplay=1&loop=1&mute=1`}></Iframe>
        </HomeContainer>
      </Container>

      <button onClick={() => setIsClicked(false)}>
        X
      </button>
      </>
    )
  }else{
    return (
      <header className='banner'
      style={{
        backgroundImage: `url("https://image.tmdb.org/t/p/original/${movie.backdrop_path}")`,
        backgroundPosition: "top center",
        backgroundSize: "cover",
        // height: "300px",
      }}
      >
        <div className='banner__contents'>
          <h1 className='banner__title'>
            {/* 앞에서 부터, 있는 것을 사용 */}
            {movie.title || movie.name ||movie.original_name}
          </h1>
  
          <div className='banner__buttons'>
            {movie?.videos?.results[0]?.key && 
              <button
                className='banner__button play'
                onClick={() => setIsClicked(true)}
              >
                Play
              </button>
            }
          </div>
  
          <h1 className='banner__description'>
            {truncate(movie.overview, 100) }
          </h1>
  
        </div>
        <div className='banner--fadeBottom'></div>
      </header>
    )
  }
}

export default Banner

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  height: 100vh;
`;

// 100vh와 100%의 차이는 뭘까?
// viewport의 높이의 100%
// parent element의 높이의 100%

const HomeContainer = styled.div`
  width: 100%;
  height: 100%;
`;

const Iframe = styled.iframe`
  width: 100%;
  height: 100%;
  z-index: -1;
  opacity: 0.65;
  border: none;

  &::after{
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
  }
`