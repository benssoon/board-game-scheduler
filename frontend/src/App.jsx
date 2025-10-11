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

    return (
        <>
            <h1>Hello</h1>
            <EventCard title={event.title}/>
            <button type="submit" onClick={fetchEvent}>Get event</button>
        </>
    )
}

export default App
