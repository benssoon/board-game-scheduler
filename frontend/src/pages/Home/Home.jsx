import './Home.css';
import axios from 'axios';
import {useState} from 'react';
import EventCard from '../../components/EventCard/EventCard.jsx';
import {createEvent, fetchObject} from '../../helpers/httpRequests.js';

function Home() {


    //<editor-fold desc="State">
    const [formState, setFormState] = useState({
        userId: 0,
        eventId: 0,
    });

    const [eventFormState, setEventFormState] = useState({
        title: '',
        location: '',
        isFull: false,
    });

    const [user, setUser] = useState({});
    const [event, setEvent] = useState({});
    //</editor-fold>

    //<editor-fold desc="Handlers">
    function handleClick(httpRequest, type, id) {
        if (httpRequest === 'post') {
            switch (type) {
                case 'event':
                    createEvent(eventFormState);
                    break;
                default:
                    break;
            }
        } else {
            fetchObject(type, formState[id], setEvent, setUser);
        }
    }

    function handleChange(e) {
        const changedFieldName = e.target.name;
        const newValue = e.target.value;

        setFormState({
            ...formState,
            [changedFieldName]: newValue,
        });
    }

    function handleCreateChange(e) {
        const changedFieldName = e.target.name;
        const newValue = e.target.value;

        setEventFormState({
            ...eventFormState,
            [changedFieldName]: newValue,
        });
    }
    //</editor-fold>

    return (
        <>
            <h1>Home</h1>
            <EventCard
                title={event.title}
                game={event.game}
                host={event.host}
                isFull={event.isFull}
                location={event.location}
                players={event.players}
                possibleTimes={event.possibleTimes}
            />

            {/*Create Event*/}
            <form>
                <label htmlFor="eventTitle">Event title:</label>
                <input
                    type="text"
                    name="title"
                    id="eventTitle"
                    value={eventFormState.title}
                    onChange={handleCreateChange}
                />
                <label htmlFor="eventLocation">Location:</label>
                <input
                    type="text"
                    name="location"
                    id="eventLocation"
                    value={eventFormState.location}
                    onChange={handleCreateChange}
                />
                <button type="button" onClick={() => handleClick('post', 'event')}>Submit</button>
            </form>

            {/*Get Event*/}
            <form>
                <label htmlFor="eventId">Event ID:</label>
                <input
                    type="number"
                    name="eventId"
                    id="eventId"
                    value={formState['eventId']}
                    onChange={handleChange}
                />
                <button type="button" onClick={() => handleClick('get', 'event', 'eventId')}>Get event</button>
            </form>

            {/*Get User*/}
            <form>
                <label htmlFor="UserId">User ID:</label>
                <input
                    type="number"
                    name="userId"
                    id="userId"
                    value={formState['userId']}
                    onChange={handleChange}
                />
                <button type="button" onClick={() => handleClick('get', 'user', 'userId')}>Get user</button>
            </form>
        </>
    );
}

export default Home;