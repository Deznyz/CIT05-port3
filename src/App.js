import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Offcanvas from 'react-bootstrap/Offcanvas';
import logo from './imdb icon.png'
import placeholder from './placeholder 305x160.svg'
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Stack from 'react-bootstrap/Stack';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/home';
import TopFiftyMovies from './pages/top-50-movies';
import TopFiftyActors from './pages/top-50-actors';
import Genres from './pages/genres';
import Login from './pages/login';
import CreateUser from './pages/create-user';
import MovieSite from './pages/movie';
import ActorSite from './pages/actor';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/top-50-titles" element={<TopFiftyMovies/>}/>
        <Route path="/top-50-people" element={<TopFiftyActors/>}/>
        <Route path="/genres" element={<Genres/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/create-user" element={<CreateUser/>}/>
        <Route path="/movie/:id" element={<MovieSite/>}/>
        <Route path="/actor/:id" element={<ActorSite/>}/>
      </Routes>
    </Router>
  );
};

export default App;
