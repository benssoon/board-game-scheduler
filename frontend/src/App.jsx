import { useState } from 'react'
import './App.css'
import EventCard from './components/eventCard/EventCard.jsx';
import axios from 'axios';

function App() {
    const [id, setId] = useState(1)
    const [event, setEvent] = useState({})
    const devApiUrl = 'http://localhost:8080';

    async function fetchEvent() {
        try {
            const response = await axios.get(devApiUrl+'/events/'+id)
            console.log(response);
            setEvent(response.data)
        } catch (e) {
            console.error(devApiUrl+'/events/'+id)
            console.error(e)
        }
    }

    async function createEvent() {
        console.log('hi');
        try {
            const response = await axios.post(devApiUrl+'/events', {
                title: 'Arcs',
                isFull: false,
            })
            console.log(response);
            console.log("hi");
        } catch (e) {
            console.error(e);
        }
    }

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
                <button type="submit" onSubmit={createEvent}>Submit</button>
            </form>

            <button type="submit" onClick={fetchEvent}>Get event</button>
        </>
    )
}

export default App
