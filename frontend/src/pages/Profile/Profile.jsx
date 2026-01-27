import './Profile.css';
import {useContext, useEffect, useState} from 'react';
import {AuthContext} from '../../context/AuthContext.jsx';
import InfoBox from '../../components/InfoBox/InfoBox.jsx';
import {Link, useNavigate} from 'react-router-dom';
import useFetch from '../../helpers/useFetch.js';
import Detail from '../../components/Detail/Detail.jsx';
import {API} from '../../globalConstants.js';
import Roles from '../../components/Roles/Roles.jsx';
import {jwtDecode} from 'jwt-decode';

function Profile() {
    const [updated, setUpdated] = useState(0);

    const token = localStorage.getItem('token');
    const {logout, user} = useContext(AuthContext);
    //const username = jwtDecode(token).sub;
    const username = user?.username;
    const {data: userData, loading, error} = useFetch(`/users/${username}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }, updated);
    const navigate = useNavigate();

    return (
        userData ?
            <>
                <h2>Hello {username}!</h2>
                <div className={'info-box-container'}>
                    <div className={'info-group left'}>
                        <InfoBox
                            type={'details'}
                            parentPage={'/profile'}
                            isEditable
                        >
                            <Detail name={'username'} label={'Username'} value={username} update={setUpdated}/>
                            <Detail url={`${API}/users/${username}`} name={'name'} label={'Name'} value={userData.name}
                                    update={setUpdated}/>
                            <Detail url={`${API}/users/${username}`} name={'emailAddress'} label={'Email'}
                                    value={userData.emailAddress} update={setUpdated}/>
                            <Detail url={`${API}/users/${username}`} name={'telephoneNumber'} label={'Phone'}
                                    value={userData.telephoneNumber} update={setUpdated}/>
                            <Detail url={`${API}/users/${username}`} name={'age'} label={'Age'} value={userData.age}
                                    update={setUpdated}/>
                            <Detail url={`${API}/users/${username}`} name={'area'} label={'Area'} value={userData.area}
                                    update={setUpdated}/>
                            <Detail url={`${API}/users/${username}`} name={'address'} label={'Address'}
                                    value={userData.address}
                                    update={setUpdated}/>
                        </InfoBox>
                        <InfoBox
                            type={'address'}
                        >
                            <h4>Placeholder details</h4>
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
                                {userData.hostedEvents.map((event) => {
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
                                {userData.joinedEvents.map((event) => {
                                    return <li key={event.id}>
                                        <Link to={`/events/${event.id}`}>{event.name}</Link>
                                    </li>
                                })}
                            </ul>
                        </InfoBox>
                    </div>
                    <div className={'info-group right'}>
                        <img className={'profile-picture info-box'}
                             src={`${API}/images/test.png`}
                             alt={'Profile picture'}
                        />
                        <InfoBox
                            type={'actions'}
                            parentPage={'/profile'}
                        >
                            <button type={'button'} onClick={() => navigate('/profile/change-picture')}>Change Photo</button>
                            <button type={'button'} onClick={() => navigate(`/profile/change-password`)}>Change Password</button>
                            <button type="button" onClick={logout}>Logout</button>
                            <Roles username={username}/>
                        </InfoBox>
                    </div>
                </div>
            </>
            :
            loading ? <p>Loading...</p>
                :
                error && <p>Error! {error.response.data.status} {error.response.data.error}</p>
    );
}

export default Profile;