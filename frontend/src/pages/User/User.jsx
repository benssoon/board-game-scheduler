import './User.css';
import {useContext, useEffect} from 'react';
import {AuthContext} from '../../context/AuthContext.jsx';
import {Link, Navigate, useParams} from 'react-router-dom';
import useFetch from '../../helpers/useFetch.js';
import InfoBox from '../../components/InfoBox/InfoBox.jsx';

function User() {
    const {username} = useParams();
    const {user: currentUser} = useContext(AuthContext);
    const shouldRedirect = currentUser?.username === username
    const token = localStorage.getItem('token');
    const {data: user, loading, error} = useFetch(shouldRedirect ? null : `/users/${username}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    useEffect(() => {
        console.log(user)
    }, [user]);

    if (shouldRedirect) {
        return <Navigate to={"/profile"} replace/>
    }

    return (
        user ?
            <>
                <h2>This is {username}'s page.</h2>
                <InfoBox
                    type="details"
                >
                    <p>Username: {user.username}</p>
                    <p>Name: {user.name}</p>
                    <p>Area: {user.area}</p>
                </InfoBox>
                <InfoBox
                    type={'hosting'}
                >
                    <ul>
                        {user.hostedEvents.map((event) => {
                            return <li key={event.id}>
                                <Link to={`/events/${event.id}`}>{event.name}</Link>
                            </li>
                        })}
                    </ul>
                </InfoBox>
                <InfoBox
                    type={'joined'}
                >
                    <ul>
                        {user.joinedEvents.map((event) => {
                            return <li key={event.id}>
                                <Link to={`/events/${event.id}`}>{event.name}</Link>
                            </li>
                        })}
                    </ul>
                </InfoBox>
            </>
            :
            loading ?
                <p>Loading...</p>
                :
                error && <p>Error!</p>
    );
}

export default User;