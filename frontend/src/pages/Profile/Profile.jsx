import './Profile.css';
import {jwtDecode} from 'jwt-decode';

function Profile() {
    const token = localStorage.getItem('token');
    const username = jwtDecode(token).sub
    return (
        <>
            <h2>Hello {username}!</h2>
        </>
    );
}

export default Profile;