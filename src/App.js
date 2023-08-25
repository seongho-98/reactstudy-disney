import { Outlet, Route, Routes } from 'react-router-dom';
import './App.css';
import Nav from './components/Nav';
import LoginPage from './pages/LoginPage';
import MainPage from './pages/MainPage';
import DetailPage from './pages/DetailPage';
import SearchPage from './pages/SearchPage';

// 레이아웃 추가
const Layout = () => {
  return (
    <div>
      <Nav />
      <Outlet />
    </div>
  )
}

function App() {

  return (
    <div className='app'>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<LoginPage />}></Route>
          <Route path="main" element={<MainPage/>}></Route>
          <Route path=":movieId" element={<DetailPage />}></Route>
          <Route path="search" element={<SearchPage />}></Route>
        </Route>
      </Routes>

    </div>
  ); 
}

export default App;

