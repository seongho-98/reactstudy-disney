# 주제
- 디즈니 plus 만들어보기 - react

## 기술
### firebase
- 로그인을 위해 사용

---

- 영화 정보를 얻어와야함

- axios 인스턴스화
    - 중복 코드 줄일 수 있음

- api key 분리
    1. 최상위에 .env 만들기
    2. REACT_API_000 : 리액트 환경 변수 규칙
    3. process.env.REACT_API_000으로 사용하기.

- styled component
    - JS 안에서 css 처리할 수 있는 라이브러리
    - 장점
        - 컴포넌트와 연결이 좋음 -> props 활용해 css 적용 시 조건 적용가능
        - 디자인의 확장(상속) 가능

- 메모이제이션 훅(useCallback, useMemo)
    - 메모이제이션 : 계산된 값을 저장해두고 이후에 사용
    - 왜 사용??
        - 컴포넌트 렌더링마다, 함수가 생성됨
        - fetchUrl이 바뀔때만 함수를 생성해주면 됨
        - useCallBack을 사용(Row.js)
    - useMemo
        - 메모이제이션된 값 반환
    - useCallback
        - 메모이제이션된 콜백 반환
    ```
  const fetchMovieData = useCallback(async () => {
    const response = await myAxios.get(fetchUrl);
    setMovies(response.data.results);
  }, [fetchUrl])
  
  useEffect(() => {
    fetchMovieData();
  }, [fetchMovieData])
    ```

- 검색 기능
    - 경로 정보(pathname) : useLocation API를 사용하면 얻어올 수 있음
        - useLocation().search : 쿼리 파라미터 얻어옴
        - URLSearchParams : 쿼리 파라미터에서 keyt로 값을 뽑아올 수 있음.
    - 페이지 이동 : useNavigate 사용
        - useNavigate에 url을 넣어주면 페이지 이동

- 리액트 요소 선택자
    - 종류
        - 클래스형 컴포넌트 -> createRef
        - 함수형 컴포넌트 -> useRef
    
    - 사용법(함수형)
        ```
            -- 선택할 요소에 ref 적용 --

            const Myref = useRef();
            <div ref={Myref}>

            -- ref 사용 --
            Myref.current -> Myref값을 가지는 <div> 선택됨
        ```
---

- 신기한 것
 - 부모 요소를 <>~~</>로 작성 가능