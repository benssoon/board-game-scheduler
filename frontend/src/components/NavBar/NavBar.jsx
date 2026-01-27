import logo from '../../assets/placeholder.webp';
import profileIcon from '../../assets/icons/Symbol=User.svg';
import './NavBar.css';
import {NavLink} from 'react-router-dom';
import {useContext} from 'react';
import {AuthContext} from '../../context/AuthContext.jsx';
import userIcon from '../../assets/icons/Symbol=User.svg';
import {handleUserImageError} from '../../helpers/handlers.js';

function NavBar() {
    const {isAuth, user} = useContext(AuthContext);
    console.log(user?.profilePicture)
    return (
        <nav className="navBar">
            <NavLink
                className="nav-icon home-icon"
                to="/">
                <img src={logo} alt="Home"/>
            </NavLink>
            <ul className="links">
                <li>
                    <NavLink
                        to="/">
                        Home
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to="/events">
                        Events
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to="/games">
                        Games
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to="/users">
                        Users
                    </NavLink>
                </li>
            </ul>
            <NavLink
                className="nav-icon profile-icon"
                to="/profile">
                <img
                    src={isAuth ? user.profilePicture : profileIcon}
                    alt="Profile"
                    onError={handleUserImageError}
                />
            </NavLink>
        </nav>
    );
}

export default NavBar;