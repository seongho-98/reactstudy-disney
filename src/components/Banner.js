import React, { useEffect, useState } from 'react'
import axiosMy from '../api/axios';
import request from '../api/request';

function Banner() {

  const [movie, setMovie] = useState([]);

  useEffect(() => {
    fetchData();
  }, [])

  const fetchData = async() => {
    //현재 상여웆ㅇ인 영화 정보 가져오기
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

  return (
    <div>Banner</div>
  )
}

export default Banner