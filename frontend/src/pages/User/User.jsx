import './User.css';
import {useContext, useEffect, useState} from 'react';
import {AuthContext} from '../../context/AuthContext.jsx';
import {Link, Navigate, redirect, useNavigate, useParams} from 'react-router-dom';
import useFetch from '../../helpers/useFetch.js';
import InfoBox from '../../components/InfoBox/InfoBox.jsx';
import axios from 'axios';
import {API} from '../../globalConstants.js';
import Roles from '../../components/Roles/Roles.jsx';
import Detail from '../../components/Detail/Detail.jsx';
import Notification from '../../components/Notification/Notification.jsx';
import userIcon from '/src/assets/icons/Symbol=User.svg';
import areaIcon from '/src/assets/icons/Symbol=Location.svg';

function User() {
    const [errorNotification, setErrorNotification] = useState(null);
    const [successNotification, setSuccessNotification] = useState(null);

    const {username} = useParams();
    const navigte = useNavigate();
    const {user: currentUser, isAdmin} = useContext(AuthContext);
    const shouldRedirect = currentUser?.username === username
    const token = localStorage.getItem('token');
    console.log(currentUser)
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

    async function handleDeleteUser(e) {
        e.preventDefault();
        try {
            const result = await axios.delete(`${API}/users/${username}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log(result);
            setSuccessNotification(`User ${username} has been deleted!`);
            navigte('/users');
        } catch (er) {
            const response = er.response;
            console.log(response);
            setErrorNotification(response.data);
        }
    }

    return (
        user ?
            <>
                <h2>This is {username}'s page.</h2>
                <div className={'info-box-container'}>
                    <div className={'info-group left'}>
                        <InfoBox
                            type="details"
                        >
                            <Detail icon={userIcon} name={'username'} label={'Username'} value={username}/>
                            <Detail icon={userIcon} name={'name'} label={'Name'} value={user.name}/>
                            <Detail icon={areaIcon} name={'area'} label={'Area'} value={user.area}/>
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
                    </div>
                    {isAdmin &&
                        <div className={'info-group right'}>
                            <InfoBox
                                type={'actions'}
                            >
                                <button type={'button'} onClick={handleDeleteUser}>Delete User</button>
                                <Roles username={username}/>

                                {/* TODO make context for notifications
                                {errorNotification && <Notification setParent={setErrorNotification} isError={errorNotification}>{errorNotification}</Notification> }
                                {successNotification && <Notification setParent={setSuccessNotification}>{successNotification}</Notification> }
                                */}

                            </InfoBox>
                        </div>
                    }
                </div>
            </>
            :
            loading ?
                <p>Loading...</p>
                :
                error && <p>Error!</p>
    );
}

export default User;