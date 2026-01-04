import './User.css';
import {useContext, useEffect, useState} from 'react';
import {AuthContext} from '../../context/AuthContext.jsx';
import {Link, Navigate, useParams} from 'react-router-dom';
import useFetch from '../../helpers/useFetch.js';
import InfoBox from '../../components/InfoBox/InfoBox.jsx';
import axios from 'axios';
import {API} from '../../globalConstants.js';
import Roles from '../../components/Roles/Roles.jsx';
import Detail from '../../components/Detail/Detail.jsx';

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
                    <Roles/>
                    <Detail name={'username'} label={'Username'} value={username}/>
                    <Detail name={'name'} label={'Name'} value={user.name}/>
                    <Detail name={'area'} label={'Area'} value={user.area}/>
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