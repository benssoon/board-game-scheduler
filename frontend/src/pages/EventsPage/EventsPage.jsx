import './EventsPage.css';
import Card from '../../components/Card/Card.jsx';
import axios from 'axios';
import {useState} from 'react';
import Pill from '../../components/Pill/Pill.jsx';

const devApiUrl = 'http://localhost:8080';

function EventsPage() {

    //<editor-fold desc="State">
    const [eventFormState, setEventFormState] = useState({
        title: '',
        location: '',
        isFull: false,
    });
    const [allEvents, setAllEvents] = useState([]);
    //</editor-fold>

    //<editor-fold desc="Handlers">
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

    //<editor-fold desc="HTTP">
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

    async function fetchEvents(e) {
        e.preventDefault();
        try {
            const response = await axios.get(`${devApiUrl}/events`);
            console.log(response.data);
            setAllEvents(response.data);
        } catch (e) {
            console.error(e.message + ': ' + e.response.data);
            setAllEvents([])
        }
    }
    //</editor-fold>


    return (
        <>
            <h2>Events</h2>

            {/*<editor-fold desc="Create Event Form">*/}
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
            {/*</editor-fold>*/}

            <button type="button" onClick={fetchEvents}>Get all</button>

            {/*<editor-fold desc="Events Grid">*/}
            <section className="categoryPage">
                <Pill/>
                <div className="eventsGrid">
                    {allEvents.map((event) => {
                        return (<Card
                                key={event.id}
                                title={event.title}
                                game={event.game}
                                host={event.host}
                                isFull={event.isFull}
                                location={event.location}
                                players={event.players}
                                possibleTimes={event.possibleTimes}
                                className="card"
                            />
                        )
                    })}
                </div>
            </section>
            {/*</editor-fold>*/}
        </>
    );
}

export default EventsPage;