import './Profile.css';
import {jwtDecode} from 'jwt-decode';
import {useContext, useEffect} from 'react';
import {AuthContext} from '../../context/AuthContext.jsx';
import InfoBox from '../../components/InfoBox/InfoBox.jsx';

function Profile() {
    const token = localStorage.getItem('token');
    const username = jwtDecode(token).sub;
    const {user, logout} = useContext(AuthContext);

    useEffect(() => {
        console.log(user)
    }, [user]);

    return (
        <>
            <h2>Hello {username}!</h2>

            <InfoBox
                type={'details'}
            >
                <p>Username: {username}</p>
                <p>Name: {user.name}</p>
                <p>Email: {user.emailAddress}</p>
                <p>Phone: {user.telephoneNumber}</p>
                <p>Age: {user.age}</p>
                <p>Area: {user.area}</p>
            </InfoBox>
            <InfoBox
                type={'address'}
            >
                <p>Street: </p>
                <p>House number: </p>
                <p>City: </p>
                <p>Postal Code: </p>
                <p>State/Province: </p>
                <p>Country: </p>
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
            <h2>Logout</h2>

            <button type="button" onClick={logout}>Logout</button>
        </>
    );
}

export default Profile;