import './User.css';
import {useContext, useEffect} from 'react';
import {AuthContext} from '../../context/AuthContext.jsx';
import {useNavigate, useParams} from 'react-router-dom';

function User() {
    const {username} = useParams();
    const {isAuth, user} = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (isAuth && username === user.username) {
            return navigate('/profile');
        }
    }, []);

    return (
        <>
            <h2>This is {username}'s page.</h2>
        </>
    );
}

export default User;