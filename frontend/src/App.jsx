import { useState } from 'react'
import './App.css'
import EventCard from './components/EventCard/EventCard.jsx';
import axios from 'axios';
import Home from './pages/Home/Home.jsx';
import EventsPage from './pages/EventsPage/EventsPage.jsx';
import {NavLink, Route, Routes} from 'react-router-dom';
import Profile from './pages/Profile/Profile.jsx';
import GamesPage from './pages/GamesPage/GamesPage.jsx';
import PlayersPage from './pages/PlayersPage/PlayersPage.jsx';

import logo from './assets/placeholder.webp';

function App() {
    return (
        <>
            <nav className="navBar">
                <NavLink
                    className="home-icon"
                    to="/">
                    <img src={logo} alt="Home"/>
                </NavLink>
                <ul className="links">
                    <li><NavLink
                        to="/events">
                        Events
                    </NavLink></li>
                    <li><NavLink
                        to="/games">
                        Games
                    </NavLink></li>
                    <li><NavLink
                        to="/players">
                        Players
                    </NavLink></li>
                </ul>
                <NavLink
                    className="profile-icon"
                    to="/profile">
                    <img src={logo} alt="Profile"/>
                </NavLink>
            </nav>

            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/events" element={<EventsPage/>}/>
                <Route path="/profile" element={<Profile/>}/>
                <Route path="/games" element={<GamesPage/>}/>
                <Route path="/players" element={<PlayersPage/>}/>
            </Routes>
        </>
    )
}

export default App
