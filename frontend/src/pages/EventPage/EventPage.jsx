import './EventPage.css';
import {Link, useParams} from 'react-router-dom';
import InfoBox from '../../components/InfoBox/InfoBox.jsx';
import useFetch from '../../helpers/useFetch.js';
import axios from 'axios';
import {API} from '../../globalConstants.js';

function EventPage() {
    const {id} = useParams();
    const {data: event, loading, error} = useFetch(`/events/${id}`)

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
                console.log(response)
            } catch (er) {
                console.error(er);
                console.error(er.response.data)
            }
        } else {
            console.log('must be logged in');
        }
    }

    return (
        event ?
            <>
                <h2>ID is: {id}</h2>
                <InfoBox
                    type="about"
                >{event.description}</InfoBox>
                <InfoBox
                    type="details"
                >
                    <p>Time: {event.definitiveTime}</p>
                    <p>Game: <Link to={`/games/${event.game.id}`}>{event.game.title}</Link></p>
                    <p>Host: {event.host}</p>
                    {event.isFull ? <p>Event full!</p> : <p>Not full</p>}
                    <p>Can take place</p>
                    <p>Location</p>
                    <p>Possible Times</p>
                    <button type="submit" onClick={joinEvent}>Join</button>
                </InfoBox>
                <InfoBox
                    type="participants"
                >
                    <ul>
                        {event?.players.map((player) => {
                            return <li key={player}>{player}</li>
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

export default EventPage;