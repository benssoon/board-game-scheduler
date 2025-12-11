import './App.css'
import Home from './pages/Home/Home.jsx';
import EventsPage from './pages/EventsPage/EventsPage.jsx';
import {NavLink, Route, Routes} from 'react-router-dom';
import Profile from './pages/Profile/Profile.jsx';
import GamesPage from './pages/GamesPage/GamesPage.jsx';
import UsersPage from './pages/UsersPage/UsersPage.jsx';

import logo from './assets/placeholder.webp';
import Login from './pages/Login/Login.jsx';
import EventPage from './pages/EventPage/EventPage.jsx';
import GamePage from './pages/GamePage/GamePage.jsx';

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
                        to="/users">
                        Users
                    </NavLink></li>
                </ul>
                <NavLink
                    className="profile-icon"
                    to="/profile">
                    <img src={logo} alt="Profile"/>
                </NavLink>
                {/*TODO Remove this link once the redirect (to login?) is set up on the profile page*/}
                <NavLink
                    className="profile-icon"
                    to="/login">
                    <img src={logo} alt="Login"/>
                </NavLink>
            </nav>

            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/profile" element={<Profile/>}/>
                <Route path="/events" element={<EventsPage/>}/>
                <Route path="/games" element={<GamesPage/>}/>
                <Route path="/users" element={<UsersPage/>}/>
                <Route path="/events/:id" element={<EventPage/>}/>
                <Route path="/games/:id" element={<GamePage/>}/>
            </Routes>
        </>
    )
}

export default App
