// CSS
import './EventsPage.css';

// Components
import Card from '../../components/Card/Card.jsx';

// Libraries

// Functions
import {useContext, useState} from 'react';
import {createEventPostRequest, deleteEvent, deleteEvents} from '../../helpers/httpRequests.js';
import FiltersBox from '../../components/FiltersBox/FiltersBox.jsx';
import {handleFormChange} from '../../helpers/handlers.js';
import DisplayGrid from '../../components/DisplayGrid/DisplayGrid.jsx';
import {AuthContext} from '../../context/AuthContext.jsx';

function EventsPage() {
    const {user} = useContext(AuthContext);
    //<editor-fold desc="State">
    const initialEventFormState = {
        name: '',
        location: '',
        gameId: 0,
        isHostPlaying: false,
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
        createEventPostRequest(e, eventFormState);
    }

    function handleDeleteEventSubmit(e) {
        deleteEvent(e, eventId);
    }
    //</editor-fold>

    return (
        <div className="categoryPage">
            <h2>Events</h2>

            {/*<editor-fold desc="Create Event Form">*/}
            <h2>Create Event</h2>
            <form onSubmit={handleEventSubmit}>
                <label htmlFor="eventName">Event name:</label>
                <input
                    type="text"
                    name="name"
                    id="eventName"
                    value={eventFormState.name}
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
                <label htmlFor="gameId">Game ID:</label>
                <input
                    type="number"
                    name="gameId"
                    id="gameId"
                    value={eventFormState.gameId}
                    onChange={(e) => handleFormChange(e, eventFormState, setEventFormState)}
                />
                <label htmlFor="isHostPlaying">Will you also be playing?</label>
                <input
                    type="checkbox"
                    name="isHostPlaying"
                    id="isHostPlaying"
                    checked={eventFormState.isHostPlaying}
                    onChange={(e) => handleFormChange(e, eventFormState, setEventFormState)}
                />
                <button type="submit">Submit</button>
            </form>
            {/*</editor-fold>*/}

            {/*<editor-fold desc="Delete Event Form">*/}
            <form onSubmit={handleDeleteEventSubmit}>
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