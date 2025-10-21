import { useState } from 'react'
import './App.css'
import EventCard from './components/eventCard/EventCard.jsx';
import axios from 'axios';

function App() {
    //<editor-fold desc="State">
    const [formState, setFormState] = useState({
        userId: 0,
        eventId: 0,
    });
    const [userId, setUserId] = useState(0);
    const [eventId, setEventId] = useState(0);
    const [event, setEvent] = useState({});
    const devApiUrl = 'http://localhost:8080';
    //</editor-fold>

    //<editor-fold desc="Handlers">
    function handleClick(type, id) {
        fetchObject(type, formState[id]);
    }

    function handleChange(e) {
        const changedFieldName = e.target.name;
        const newValue = e.target.value;

        setFormState({
            ...formState,
            [changedFieldName]: newValue,
        });
    }
    //</editor-fold>

    //<editor-fold desc="HTTP requests">
    async function fetchObject(type, id) {
        try {
            const response = await axios.get(`${devApiUrl}/${type}s/${id}`);
            console.log(response);
            if (type === 'event') {
                setEvent(response.data);
            }
        } catch (e) {
            console.error(e.message + ': ' + e.response.data);
        }
    }

    async function createEvent(e) {
        e.preventDefault();
        try {
            const response = await axios.post(devApiUrl+'/events', {
                title: 'Arcs',
                isFull: false,
            })
            console.log(response);
        } catch (e) {
            console.error(e);
        }
    }

    async function createUser(e) {
        e.preventDefault();
        try {
            const response = await axios.post(devApiUrl+'/users', {
                name: 'Ben',
                emailAddress: 'ben@ben.com',
            })
            console.log(response);
        } catch (e) {
            console.error(e);
        }
    }
//</editor-fold>


    return (
        <>
            <h1>Hello</h1>
            <EventCard
                title={event.title}
                game={event.game}
                host={event.host}
                isFull={event.isFull}
                location={event.location}
                players={event.players}
                possibleTimes={event.possibleTimes}
            />

            <form>
                <label htmlFor="eventTitle">Event title:</label>
                <input type="text" id="eventTitle"/>
                <label htmlFor="numberPlayers">Number of players:</label>
                <input type="number" id="numberPlayers" />
                <button type="button" onClick={createEvent}>Submit</button>
            </form>

            <form>
                <label htmlFor="name">Name:</label>
                <input type="text" id="name"/>
                <label htmlFor="email">Email:</label>
                <input type="text" id="email" />
                <button type="button" onClick={createUser}>Submit</button>
            </form>

            <form>
                <label htmlFor="eventId">Event ID:</label>
                <input
                    type="number"
                    name="eventId"
                    id="eventId"
                    value={formState['eventId']}
                    onChange={handleChange}
                />
                <button type="button" onClick={() => handleClick('event', 'eventId')}>Get event</button>
            </form>
            <form>
                <label htmlFor="UserId">User ID:</label>
                <input
                    type="number"
                    name="userId"
                    id="userId"
                    value={formState['userId']}
                    onChange={handleChange}
                />
                <button type="button" onClick={() => handleClick('user', 'userId')}>Get user</button>
            </form>
        </>
    )
}

export default App
