// CSS
import './EventsPage.css';

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

function EventsPage() {
    //<editor-fold desc="State">
    const initialEventFormState = {
        name: '',
        location: '',
        gameId: 0,
        isHostPlaying: false,
        definitiveTime: '',
        possibleTimes: [],
    }
    const [dates, setDates] = useState([

    ]);
    const [date, setDate] = useState(new Date());
    const [eventFormState, setEventFormState] = useState(initialEventFormState);
    const [eventId, setEventId] = useState(2);
    const [updated, setUpdated] = useState(0);
    const [formError, setFormError] = useState(null);
    //</editor-fold>

    const nameRef = useRef(null);

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

    async function handleEventSubmit(e) {
        e.preventDefault();
        const cleanData = cleanupData(eventFormState);
        const token = localStorage.getItem('token');
        if (token) {
            try {
                const response = await axios.post(API + '/events', cleanData, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                });
                console.log(response);
                setFormError(null);
            } catch (er) {
                const response = er.response.data;
                const missingKeys = Object.keys(response);
                console.error(er.response.data);
                setFormError(er.response.data)
                //TODO send errors to an object stored in state, like with create game
                const errors = [];
                for (const key in missingKeys) {
                    const missingKey = missingKeys[key]
                    const keyProblem = response[missingKey]
                    const err = `"${missingKey}" ${keyProblem}`;
                    console.error(err);
                    errors.push(err);
                    return errors;
                }
            }
        } else {
            console.error('User must be logged in to create new events.');
        }
        setEventFormState(initialEventFormState);
        setUpdated(updated+1);
        nameRef.current.focus();
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

            {/*<editor-fold desc="Create Event Form">*/}
            <h2>Create Event</h2>
            <form onSubmit={handleEventSubmit} className="create-form">
                <FormField
                    ref={nameRef}
                    isRequired={true}
                    label="Event name"
                    type="text"
                    name="name"
                    id="eventName"
                    formState={eventFormState}
                    errors={formError}
                    handleChange={(e) => handleFormChange(e, eventFormState, setEventFormState)}
                />
                <FormField
                    label="Location"
                    type="text"
                    name="location"
                    id="eventLocation"
                    formState={eventFormState}
                    errors={formError}
                    handleChange={(e) => handleFormChange(e, eventFormState, setEventFormState)}
                />
                <FormField
                    label="Game ID"
                    type="number"
                    name="gameId"
                    id="gameId"
                    formState={eventFormState}
                    errors={formError}
                    handleChange={(e) => handleFormChange(e, eventFormState, setEventFormState)}
                />
                <FormField
                    label="Will you also be playing?"
                    type="checkbox"
                    name="isHostPlaying"
                    id="isHostPlaying"
                    formState={eventFormState}
                    errors={formError}
                    handleChange={(e) => handleFormChange(e, eventFormState, setEventFormState)}
                />
                <FormField
                    label="Definitive time"
                    type="datetime-local"
                    name="definitiveTime"
                    id="definitiveTime"
                    formState={eventFormState}
                    errors={formError}
                    handleChange={(e) => handleFormChange(e, eventFormState, setEventFormState)}
                />
                <DatePicker
                    name="possibleTimes"
                    id="possibleTimes"
                    sort
                    plugins={[
                        <DatePanel />,
                        <TimePicker />,
                    ]}
                    value={eventFormState.possibleTimes}
                    onChange={(date) => {setEventFormState({...eventFormState, possibleTimes: date})}}
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
                    updated={updated}
                />
            </section>
            {/*</editor-fold>*/}
        </div>
    );
}

export default EventsPage;