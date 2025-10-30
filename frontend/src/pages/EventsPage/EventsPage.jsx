// CSS
import './EventsPage.css';

// Components
import Card from '../../components/Card/Card.jsx';
import Pill from '../../components/Pill/Pill.jsx';

// Libraries
import axios from 'axios';

// Functions
import {useState} from 'react';
import {fetchEvents, createEvent} from '../../helpers/httpRequests.js';

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
                <button type="button" onClick={(e) => createEvent(e, eventFormState)}>Submit</button>
            </form>
            {/*</editor-fold>*/}

            <button type="button" onClick={(e) => fetchEvents(e, setAllEvents)}>Get all</button>

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