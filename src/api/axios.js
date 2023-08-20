import axios from 'axios';

//axios 인스턴스 생성하는 메서드
const instance = axios.create({
    baseURL: 'https://api.themoviedb.org/3',
    params:{
        api_key: process.env.REACT_APP_MOVIE_API_KEY,
        language: "ko-KR"
    }
})

//다른 곳에서도 사용할 수 있도록
export default instance;
