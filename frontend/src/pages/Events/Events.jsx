// CSS
import './Events.css';

// Components
import FiltersBox from '../../components/FiltersBox/FiltersBox.jsx';
import DisplayGrid from '../../components/DisplayGrid/DisplayGrid.jsx';

// Libraries

// Functions
import {useEffect, useRef, useState} from 'react';
import {handleFormChange} from '../../helpers/handlers.js';
import axios from 'axios';
import {API} from '../../globalConstants.js';
import FormField from '../../components/FormField/FormField.jsx';
import {cleanupData} from '../../helpers/processingAndFormatting.js';
import DatePicker, {DateObject} from 'react-multi-date-picker';
import TimePicker from 'react-multi-date-picker/plugins/time_picker';
import DatePanel from 'react-multi-date-picker/plugins/date_panel';
import SearchBar from '../../components/SearchBar/SearchBar.jsx';
import {useNavigate} from 'react-router-dom';
import EventForm from '../../components/EventForm/EventForm.jsx';

function Events() {
    //<editor-fold desc="State">
    const initialEventFormState = {
        name: '',
        location: '',
        gameId: 0,
        isHostPlaying: false,
        definitiveTime: '',
        possibleTimes: [],
    }
    const [param, setParam] = useState('');
    const [eventId, setEventId] = useState(2);
    const [updated, setUpdated] = useState(0);
    //</editor-fold>

    const navigate = useNavigate();

    //<editor-fold desc="Effects">
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

    async function handleDeleteEventSubmit(e) {
        e.preventDefault();
        try {
            const response = await axios.delete(`${API}/events/${eventId}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                }
            });
            console.log(response);
        } catch (er) {
            console.error(er.message + ': ' + er.response.data);
            console.error(`${API}/events/${eventId}`);
        }
        await new Promise(r => setTimeout(r, 2000)); // small delay
        setUpdated(updated+1);
    }

    async function deleteEvents(e) {
        e.preventDefault();
        try {
            const response = await axios.delete(`${API}/events/deleteAll`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });
            console.log(response);
        } catch (er) {
            console.error(er);
        }
        setUpdated(updated+1);
    }
    //</editor-fold>

    return (
        <div className="categoryPage">
            <h2>Events</h2>

            <button type="button" onClick={() => navigate('/events/create')}>Create Event</button>

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
                <FiltersBox
                    setParam={setParam} // Set param inside FiltersBox and give param to DisplayGrid
                />
                <DisplayGrid
                    type="event"
                    updated={updated}
                    param={param}
                />
            </section>
            {/*</editor-fold>*/}
        </div>
    );
}

export default Events;