import './Profile.css';
import {jwtDecode} from 'jwt-decode';
import {useContext, useState} from 'react';
import {AuthContext} from '../../context/AuthContext.jsx';
import InfoBox from '../../components/InfoBox/InfoBox.jsx';
import {Link, useNavigate} from 'react-router-dom';
import useFetch from '../../helpers/useFetch.js';
import Detail from '../../components/Detail/Detail.jsx';
import {API} from '../../globalConstants.js';
import axios from 'axios';
import Roles from '../../components/Roles/Roles.jsx';

function Profile() {
    const [updated, setUpdated] = useState(0);
    const [roles, setRoles] = useState(null);

    const token = localStorage.getItem('token');
    const username = jwtDecode(token).sub;
    const {logout, isAdmin} = useContext(AuthContext);
    const {data: user, loading, error} = useFetch(`/users/${username}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }, updated);
    const navigate = useNavigate();

    async function getUserRoles() {
        try {
            const response = await axios.get(`${API}/users/${username}/roles`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setRoles(response.data);
            console.log(response);
        } catch (er) {
            const response = er.response;
            console.log(response);
        }
    }

    return (
        user ?
            <>
                <h2>Hello {username}!</h2>

                <InfoBox
                    type={'details'}
                    parentPage={'/profile'}
                    isEditable
                >
                    <button type={'button'} onClick={() => navigate(`/profile/change-password`)}>Change Password</button>
                    <Roles/>
                    <Detail name={'username'} label={'Username'} value={username} update={setUpdated}/>
                    <Detail url={`${API}/users/${username}`} name={'name'} label={'Name'} value={user.name} update={setUpdated}/>
                    <Detail url={`${API}/users/${username}`} name={'emailAddress'} label={'Email'} value={user.emailAddress} update={setUpdated}/>
                    <Detail url={`${API}/users/${username}`} name={'telephoneNumber'} label={'Phone'} value={user.telephoneNumber} update={setUpdated}/>
                    <Detail url={`${API}/users/${username}`} name={'age'} label={'Age'} value={user.age} update={setUpdated}/>
                    <Detail url={`${API}/users/${username}`} name={'area'} label={'Area'} value={user.area} update={setUpdated}/>
                    <Detail url={`${API}/users/${username}`} name={'address'} label={'Address'} value={user.address} update={setUpdated}/>
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
            :
            loading ? <p>Loading...</p>
                :
                error && <p>Error! {error.response.data.status} {error.response.data.error}</p>
    );
}

export default Profile;