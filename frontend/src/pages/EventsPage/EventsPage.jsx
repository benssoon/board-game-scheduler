// CSS
import './EventsPage.css';

// Components
import Card from '../../components/Card/Card.jsx';

// Libraries

// Functions
import {useEffect, useState} from 'react';
import {createEvent, deleteEvent, deleteEvents} from '../../helpers/httpRequests.js';
import FiltersBox from '../../components/FiltersBox/FiltersBox.jsx';
import {handleFormChange} from '../../helpers/handlers.js';
import DisplayGrid from '../../components/DisplayGrid/DisplayGrid.jsx';
import useFetch from '../../useFetch.js';

function EventsPage() {

    //<editor-fold desc="State">
    const initialEventFormState = {
        title: '',
        location: '',
        isFull: false,
    }
    const [eventFormState, setEventFormState] = useState(initialEventFormState);
    const [eventId, setEventId] = useState(2);
    //</editor-fold>

    //<editor-fold desc="Handlers">
    function handleDeleteChange(e) {
        const newValue = e.target.value;

        if (newValue <= 1) {
            setEventId(2);
        } else {
            setEventId(newValue);
        }
    }

    function handleEventSubmit(e) {
        setEventFormState(initialEventFormState);
        createEvent(e, eventFormState);
    }
    //</editor-fold>

    return (
        <div className="categoryPage">
            <h2>Events</h2>

            {/*<editor-fold desc="Create Event Form">*/}
            <h2>Create Event</h2>
            <form onSubmit={handleEventSubmit}>
                <label htmlFor="eventTitle">Event title:</label>
                <input
                    type="text"
                    name="title"
                    id="eventTitle"
                    value={eventFormState.title}
                    onChange={(e) => handleFormChange(e, eventFormState, setEventFormState)}
                />
                <label htmlFor="eventLocation">Location:</label>
                <input
                    type="text"
                    name="location"
                    id="eventLocation"
                    value={eventFormState.location}
                    onChange={(e) => handleFormChange(e, eventFormState, setEventFormState)}
                />
                <button type="submit">Submit</button>
            </form>
            {/*</editor-fold>*/}

            {/*<editor-fold desc="Delete Event Form">*/}
            <form onSubmit={(e) => deleteEvent(e, eventId)}>
                <label htmlFor="deleteEventId">Event ID:</label>
                <input
                    type="number"
                    name="deleteEventId"
                    id="deleteEventId"
                    value={eventId}
                    onChange={handleDeleteChange}
                />
                <button type="submit">Delete event</button>
            </form>
            {/*</editor-fold>*/}

            <button type="button" onClick={deleteEvents}>Delete all</button>

            {/*<editor-fold desc="Events Grid">*/}
            <section className="categoryBox">
                <FiltersBox/>
                <DisplayGrid
                    type="event"
                />
            </section>
            {/*</editor-fold>*/}
        </div>
    );
}

export default EventsPage;