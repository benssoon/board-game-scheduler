import './User.css';
import {useContext} from 'react';
import {AuthContext} from '../../context/AuthContext.jsx';
import {Navigate, useParams} from 'react-router-dom';
import useFetch from '../../helpers/useFetch.js';
import InfoBox from '../../components/InfoBox/InfoBox.jsx';

function User() {
    const {username} = useParams();
    const {user: currentUser} = useContext(AuthContext);
    if (currentUser.username === username) {
        return <Navigate to={"/profile"} replace/>
    }
    const {data: user, loading, error} = useFetch(`/users/${username}`, {});

    return (
        user ?
            <>
                <h2>This is {username}'s page.</h2>
                <InfoBox
                    type="details"
                >
                    <p>{user.username}</p>
                    <p>{user.password}</p>
                    <p>{user.name}</p>
                    <p>{user.emailAddress}</p>
                    <p>{user.telephoneNumber}</p>
                    <p>{user.age}</p>
                    <p>{user.area}</p>
                    <p>{user.street}</p>
                    <p>{user.house}</p>
                    <p>{user.city}</p>
                    <p>{user.postalCode}</p>
                    <p>{user.state}</p>
                    <p>{user.country}</p>
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