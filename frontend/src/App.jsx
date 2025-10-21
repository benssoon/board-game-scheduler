import { useState } from 'react'
import './App.css'
import EventCard from './components/eventCard/EventCard.jsx';
import axios from 'axios';

function App() {
    const devApiUrl = 'http://localhost:8080';

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

    function handleCreateChange(e) {
        const changedFieldName = e.target.name;
        const newValue = e.target.value;
        console.log(changedFieldName);
        console.log(newValue);

        setEventFormState({
            ...eventFormState,
            [changedFieldName]: newValue,
        });
    }
    //</editor-fold>

    //<editor-fold desc="HTTP requests">
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

    async function createEvent(e) {
        e.preventDefault();
        try {
            const response = await axios.post(devApiUrl+'/events', eventFormState)
            console.log(response);
        } catch (e) {
            const response = e.response.data;
            const missingKeys = Object.keys(response);
            console.error(e);
            let errors = [];
            for (const key in missingKeys) {
                const missingKey = missingKeys[key]
                const keyProblem = response[missingKey]
                const err = `"${missingKey}" ${keyProblem}`;
                console.error(err);
                errors.push(err);
                return errors;
            }
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
            const response = e.response.data;
            const missingKeys = Object.keys(response);
            console.error(e);
            let errors = [];
            for (const key in missingKeys) {
                const missingKey = missingKeys[key]
                const keyProblem = response[missingKey]
                const err = `"${missingKey}" ${keyProblem}`;
                console.error(err);
                errors.push(err);
                return errors;
            }
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

            {/* Create Event */}
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
                <button type="button" onClick={createEvent}>Submit</button>
            </form>

            {/* Create User */}
            <form>
                <label htmlFor="name">Name:</label>
                <input type="text" id="name"/>
                <label htmlFor="email">Email:</label>
                <input type="text" id="email" />
                <button type="button" onClick={createUser}>Submit</button>
            </form>

            {/* Get Event */}
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

            {/* Get User */}
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
