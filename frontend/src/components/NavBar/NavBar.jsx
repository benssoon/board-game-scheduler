import logo from '../../assets/placeholder.webp';
import profileIcon from '../../assets/icons/Symbol=User.svg';
import './NavBar.css';
import {NavLink} from 'react-router-dom';

function NavBar() {
    return (
        <nav className="navBar">
            <NavLink
                className="home-icon"
                to="/">
                <img src={logo} alt="Home"/>
            </NavLink>
            <ul className="links">
                <li>
                    <NavLink
                        className="home-icon"
                        to="/">
                        Home
                    </NavLink>
                </li>
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
                <img src={profileIcon} alt="Profile"/>
            </NavLink>
        </nav>
    );
}

export default NavBar;