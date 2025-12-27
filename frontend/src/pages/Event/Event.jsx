import './Event.css';
import {Link, useLocation, useParams} from 'react-router-dom';
import InfoBox from '../../components/InfoBox/InfoBox.jsx';
import useFetch from '../../helpers/useFetch.js';
import axios from 'axios';
import {API} from '../../globalConstants.js';
import {useContext, useEffect, useState} from 'react';
import {AuthContext} from '../../context/AuthContext.jsx';

function Event() {
    const [updated, setUpdated] = useState(0);
    const [gameId, setGameId] = useState(0);
    const [addingUsername, setAddingUsername] = useState('');
    const [authError, setAuthError] = useState(''); // Used to display errors related to being logged in or not.

    const {id} = useParams();
    const {data: event, loading, error} = useFetch(`/events/${id}`, {}, updated)
    const {isAuth, isAdmin, isUser, user, logout} = useContext(AuthContext);
    const isHost = event?.host.username === user?.username;
    const location = useLocation();

    useEffect(() => {
        console.log(event)
    }, [event]);

    async function changeParticipation(action) {
        if (isAuth && isUser) {
            setAuthError('');
            const token = localStorage.getItem('token');
            try {
                const response = await axios.post(`${API}/events/${id}/${action}`, {}, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                console.log(response);
                setUpdated(updated+1);
            } catch (er) {
                console.error(er);
                console.error(er.response.data)
            }
        } else {
            if (!isAuth) {
                console.log('Must be logged in');
                setAuthError(
                    <p>
                        Must be logged in to leave or join an event.
                        <Link
                            to={'/login'}
                            state={{from: location}} // Sends the user back to this page after they have logged in.
                        >Click here</Link> to go to the login page.
                    </p>
                );
            } else {
                setAuthError(
                    <p>
                        Only users with role USER can participate in events.
                        <Link
                            to={logout} // TODO Should log user out and reroute to the login page.
                            state={{from: location}} // Sends the user back to this page after they have logged in.
                        >Click here</Link> to log out and go to the login page, to log in as a user with role USER.
                    </p>
                )
            }
        }
    }

    async function handleSubmitChangeGame(e) {
        e.preventDefault();
        if (isAuth) {
            const token = localStorage.getItem('token');
            console.log(token)
            try {
                const response = await axios.put(`${API}/events/${id}/game/${gameId}`, {}, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                console.log(response);
                setUpdated(updated+1);
            } catch (er) {
                console.error(er);
                console.error(er.response.data)
            }
        } else {
            console.log('must be logged in');
        }
    }

    function handleChangeGameId(e) {
        const newValue = e.target.value;
        setGameId(newValue);
    }
    function handleChangeAddingUsername(e) {
        const newValue = e.target.value;
        setAddingUsername(newValue);
    }

    async function handleAddRemovePlayer(e, username, type) {
        console.log(e);
        e.preventDefault();
        if (isAuth && (isHost || isAdmin)) {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.post(`${API}/events/${id}/${type}-player/${username}`, {}, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                console.log(response);
            } catch (er) {
                console.log(er);
            }
            setUpdated(updated+1);
            setAddingUsername('');
        } else {
            console.log(`Only the host of this event or an admin is allowed to ${type} other players.`)
        }
    }

    return (
        event ?
            <>
                <h2>{event.name}</h2>
                <InfoBox
                    type="about"
                    parentPage={`/events/${id}`}
                    isEditable={user?.username === event?.host.username}
                >
                    <p>{event.description}</p>
                </InfoBox>
                <InfoBox
                    type="details"
                >
                    <p>Time: {event.definitiveTime}</p>
                    <p>Game: <Link to={`/games/${event.game.id}`}>{event.game.title}</Link></p>
                    <p>Host: <Link to={`/users/${event.host.username}`}>{event.host.username}</Link></p>
                    {event.isFull ? <p>Event full!</p> : <p>Not full</p>}
                    {event.isReadyToStart ? <p>Can take place</p> : <p>Waiting for more players...</p>}
                    <p>Location: {event.location}</p>
                    <p>Possible Times: {event.possibleTimes}</p>
                    <button type="submit" onClick={() => changeParticipation('join')}>Join</button>
                    <button type="submit" onClick={() => changeParticipation('leave')}>Leave</button>
                    {authError}
                </InfoBox>
                <InfoBox
                    type="participants"
                >
                    <ul>
                        {event?.players.map((player) => {
                            return <li key={player}>
                                <Link to={`/users/${player}`}>{player}</Link>
                                {isHost && <button type="button" onClick={(e) => handleAddRemovePlayer(e, player, 'remove')}>Remove</button>}
                            </li>
                        })}
                    </ul>
                </InfoBox>

                {/*<editor-fold desc="Change Game Form">*/}
                <form onSubmit={handleSubmitChangeGame}>
                    <label htmlFor="changeGame">Game ID:</label>
                    <input
                        type="number"
                        name="changeGame"
                        id="changeGame"
                        value={gameId}
                        onChange={handleChangeGameId}
                    />
                    <button type="submit">Change Game</button>
                </form>
                {/*</editor-fold>*/}
                {/*<editor-fold desc="Remove Player Form">*/}
                <form onSubmit={(e) => handleAddRemovePlayer(e, addingUsername, 'add')}>
                    <label htmlFor="addUser">Username:</label>
                    <input
                        type="text"
                        name="addUser"
                        id="addUser"
                        value={addingUsername}
                        onChange={handleChangeAddingUsername}
                    />
                    <button type="submit">Add player</button>
                </form>
                {/*</editor-fold>*/}
            </>
            :
            loading ?
                <p>Loading...</p>
                :
                error && <p>Error!</p>
    );
}

export default Event;