import './App.css'
import Home from './pages/Home/Home.jsx';
import Events from './pages/Events/Events.jsx';
import {NavLink, Route, Routes} from 'react-router-dom';
import Profile from './pages/Profile/Profile.jsx';
import Games from './pages/Games/Games.jsx';
import Users from './pages/Users/Users.jsx';

import logo from './assets/placeholder.webp';
import Login from './pages/Login/Login.jsx';
import Event from './pages/Event/Event.jsx';
import Game from './pages/Game/Game.jsx';
import EditEvent from './pages/EditEvent/EditEvent.jsx';
import CreateEvent from './pages/CreateEvent/CreateEvent.jsx';

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
                <Route path="/users" element={<Users/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/profile" element={<Profile/>}/>
                <Route path="/events" element={<Events/>}/>
                <Route path="/events/create" element={<CreateEvent/>}/>
                <Route path="/events/:id" element={<Event/>}/>
                <Route path="/events/:id/edit" element={<EditEvent/>}/> {/*TODO secure by checking that only users can access*/}
                <Route path="/games" element={<Games/>}/>
                <Route path="/games/:id" element={<Game/>}/>
            </Routes>
        </>
    )
}

export default App
