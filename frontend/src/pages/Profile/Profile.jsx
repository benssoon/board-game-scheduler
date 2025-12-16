import './Profile.css';
import {jwtDecode} from 'jwt-decode';
import {useContext} from 'react';
import {AuthContext} from '../../context/AuthContext.jsx';

function Profile() {
    const token = localStorage.getItem('token');
    const username = jwtDecode(token).sub
    const {logout} = useContext(AuthContext)

    return (
        <>
            <h2>Hello {username}!</h2>
            <h2>Logout</h2>

            <button type="button" onClick={logout}>Logout</button>
        </>
    );
}

export default Profile;