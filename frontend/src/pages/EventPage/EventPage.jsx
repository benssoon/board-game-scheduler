import './EventPage.css';
import {useParams} from 'react-router-dom';
import InfoBox from '../../components/InfoBox/InfoBox.jsx';
import useFetch from '../../helpers/useFetch.js';

function EventPage() {
    const {id} = useParams();
    const {data: event, loading, error} = useFetch(`/events/${id}`)
    //const {data: game, loading, error} = useFetch('/games/') //TODO ID here!!
    console.log(event)
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
                    <p>Game: {event.game}</p>
                    <p>Host: {event.host}</p>
                    {event.isFull ? <p>Event full!</p> : <p>Not full</p>}
                    <p>Can take place</p>
                    <p>Location</p>
                    <p>Possible Times</p>
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