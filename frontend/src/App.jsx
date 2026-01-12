import './App.css'
import Home from './pages/Home/Home.jsx';
import Events from './pages/Events/Events.jsx';
import {Navigate, Route, Routes} from 'react-router-dom';
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
import EditGame from './components/EditGame/EditGame.jsx';
import CreateGame from './pages/CreateGame/CreateGame.jsx';
import Register from './pages/Register/Register.jsx';
import EditProfile from './pages/EditProfile/EditProfile.jsx';
import ChangePassword from './pages/ChangePassword/ChangePassword.jsx';

function App() {
    const {isAuth} = useContext(AuthContext);
    return (
        <>
            <NavBar/>
            <div className={'page-container'}>
                <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/users" element={<Users/>}/>
                <Route path="/users/:username" element={isAuth ? <User/> : <Navigate to={'/login'}/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/profile" element={isAuth ? <Profile/> : <Navigate to={"/login"}/>}/>
                <Route path="/profile/edit" element={<EditProfile/>}/>
                <Route path="/profile/change-password" element={<ChangePassword/>}/>
                <Route path="/register" element={<Register/>}/>
                <Route path="/events" element={<Events/>}/>
                <Route path="/events/create" element={<CreateEvent/>}/>
                <Route path="/events/:id" element={<Event/>}/>
                <Route path="/events/:id/edit" element={<EditEvent/>}/>
                <Route path="/games" element={<Games/>}/>
                <Route path="/games/create" element={<CreateGame/>}/>
                <Route path="/games/:id" element={<Game/>}/>
                <Route path="/games/:id/edit" element={<EditGame/>}/>
            </Routes>
            </div>
        </>
    )
}

export default App;