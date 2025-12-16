import './Event.css';
import {Link, useNavigate, useParams} from 'react-router-dom';
import InfoBox from '../../components/InfoBox/InfoBox.jsx';
import useFetch from '../../helpers/useFetch.js';
import axios from 'axios';
import {API} from '../../globalConstants.js';
import {useContext, useState} from 'react';
import {AuthContext} from '../../context/AuthContext.jsx';

function Event() {
    const [updated, setUpdated] = useState(0);
    const [gameId, setGameId] = useState(0);

    const {id} = useParams();
    const navigate = useNavigate();
    const {data: event, loading, error} = useFetch(`/events/${id}`, {}, updated)
    const {user} = useContext(AuthContext);
    const isHost = event?.host.username === user.username;

    async function joinEvent() {
        const token = localStorage.getItem('token');
        if (token) {
            console.log(token)
            try {
                const response = await axios.post(`${API}/events/${id}/join`, {}, {
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

    async function leaveEvent() {
        const token = localStorage.getItem('token');
        if (token) {
            console.log(token)
            try {
                const response = await axios.post(`${API}/events/${id}/leave`, {}, {
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

    async function handleSubmitChangeGame(e) {
        e.preventDefault();
        const token = localStorage.getItem('token');
        if (token) {
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

    async function handleRemovePlayer() {
        try {
            const response = await axios.
        } catch (er) {

        }
    }

    return (
        event ?
            <>
                <h2>{event.name}</h2>
                <InfoBox
                    type="about"
                    parentPage={`/events/${id}`}
                    isEditable={user.username === event.host.username}
                >
                    <p>{event.description}</p>
                </InfoBox>
                <InfoBox
                    type="details"
                >
                    <p>Time: {event.definitiveTime}</p>
                    <p>Game: <Link to={`/games/${event.game.id}`}>{event.game.title}</Link></p>
                    <p>Host: {event.host.username}</p>
                    {event.isFull ? <p>Event full!</p> : <p>Not full</p>}
                    {event.isReadyToStart ? <p>Can take place</p> : <p>Waiting for more players...</p>}
                    <p>Location: {event.location}</p>
                    <p>Possible Times: {event.possibleTimes}</p>
                    <button type="submit" onClick={joinEvent}>Join</button>
                    <button type="submit" onClick={leaveEvent}>Leave</button>
                </InfoBox>
                <InfoBox
                    type="participants"
                >
                    <ul>
                        {event?.players.map((player) => {
                            return <li key={player}>{player}{isHost && <button type="button" onClick={handleRemovePlayer}>Remove</button>}</li>
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
            </>
            :
            loading ?
                <p>Loading...</p>
                :
                error && <p>Error!</p>
    );
}

export default Event;