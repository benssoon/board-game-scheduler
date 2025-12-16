import './App.css'
import Home from './pages/Home/Home.jsx';
import Events from './pages/Events/Events.jsx';
import {Navigate, NavLink, Route, Routes} from 'react-router-dom';
import Profile from './pages/Profile/Profile.jsx';
import Games from './pages/Games/Games.jsx';
import Users from './pages/Users/Users.jsx';

import Login from './pages/Login/Login.jsx';
import Event from './pages/Event/Event.jsx';
import Game from './pages/Game/Game.jsx';
import EditEvent from './pages/EditEvent/EditEvent.jsx';
import CreateEvent from './pages/CreateEvent/CreateEvent.jsx';
import {useContext} from 'react';
import {AuthContext} from './context/AuthContext.jsx';
import NavBar from './components/NavBar/NavBar.jsx';
import User from './pages/User/User.jsx';

function App() {
    const {isAuth} = useContext(AuthContext);
    return (
        <>
            <NavBar/>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/users" element={<Users/>}/>
                <Route path="/users/:username" element={<User/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/profile" element={isAuth ? <Profile/> : <Navigate to={"/login"}/> }/>
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
