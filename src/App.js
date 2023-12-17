import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/home';
import TopFiftyMovies from './pages/top-50-movies';
import TopFiftyActors from './pages/top-50-actors';
import Login from './pages/login';
import CreateUser from './pages/create-user';
import MovieSite from './pages/movie';
import ActorSite from './pages/actor';
import SearchResult from './pages/search-result';
import UserProfile from './pages/user-profile';


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/top-50-titles/:id" element={<TopFiftyMovies/>}/>
        <Route path="/top-50-people/:id" element={<TopFiftyActors/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/create-user" element={<CreateUser/>}/>
        <Route path="/movie/:id" element={<MovieSite/>}/>
        <Route path="/actor/:id" element={<ActorSite/>} />
        <Route path="/search-result/:id" element={<SearchResult/>}/>
        <Route path="/user-profile" element={<UserProfile/>}/>
      </Routes>
    </Router>
  );
};

export default App;
