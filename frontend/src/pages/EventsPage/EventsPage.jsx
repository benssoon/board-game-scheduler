import './EventsPage.css';
import EventCard from '../../components/EventCard/EventCard.jsx';
import axios from 'axios';
import {useState} from 'react';

const devApiUrl = 'http://localhost:8080';

function EventsPage() {
    const [user, setUser] = useState({});
    const [event, setEvent] = useState({});

    async function fetchObject(type, id) {
        try {
            const response = await axios.get(`${devApiUrl}/${type}s/${id}`);
            console.log(response);
            switch (type) {
                case 'event':
                    setEvent(response.data);
                    break;
                case 'user':
                    setUser(response.data);
                    break;
                default:
                    break;
            }
        } catch (e) {
            console.error(e.message + ': ' + e.response.data);
        }
    }
    return (
        <>
            <h2>Events</h2>
            <section className="allEvents">
                <EventCard
                    title={event.title}
                    game={event.game}
                    host={event.host}
                    isFull={event.isFull}
                    location={event.location}
                    players={event.players}
                    possibleTimes={event.possibleTimes}
                />
            </section>
        </>
    );
}

export default EventsPage;