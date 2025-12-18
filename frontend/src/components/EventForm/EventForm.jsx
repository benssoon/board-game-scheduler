import './EventForm.css';
import InfoBox from '../../components/InfoBox/InfoBox.jsx';
import {cleanupData} from '../../helpers/processingAndFormatting.js';
import {useContext, useEffect, useRef, useState} from 'react';
import {API} from '../../globalConstants.js';
import axios from 'axios';
import {handleFormChange} from '../../helpers/handlers.js';
import FormField from '../../components/FormField/FormField.jsx';
import {useNavigate, useParams} from 'react-router-dom';
import useFetch from '../../helpers/useFetch.js';
import {DateObject} from 'react-multi-date-picker';
import {AuthContext} from '../../context/AuthContext.jsx';
import SearchBar from '../SearchBar/SearchBar.jsx';


function EventForm({type}) { // type is either create or edit
    const {id} = useParams();
    const [formError, setFormError] = useState(null);
    const [submitError, setSubmitError] = useState(null);
    const [updated, setUpdated] = useState(0);
    const nameRef = useRef(null);
    const endpoint = id ? `/events/${id}` : null
    const {data: event} = useFetch(endpoint, {})
    const initialEventFormState = {
        name: '',
        location: '',
        gameId: 0,
        isHostPlaying: false,
        definitiveTime: '',
        possibleTimes: [],
    }
    const [eventFormState, setEventFormState] = useState(initialEventFormState);
    const navigate = useNavigate();
    const {user, isAdmin, isUser} = useContext(AuthContext);

    useEffect(() => {
        if (event) {
            setEventFormState({
                name: event.name,
                location: event.location,
                gameId: event.game.id,
                isHostPlaying: event.isHostPlaying,
                definitiveTime: event.definitiveTime || '',
                possibleTimes: event.possibleTimes ?
                    event.possibleTimes.map((date) => {
                        return new DateObject({date: date})
                    })
                    : [],
            });
        }
    }, [event]);

    async function handleCreateEventSubmit(e) {
        e.preventDefault();
        if (isUser) { // Only users with the role USER may create events
            const cleanData = cleanupData(eventFormState);
            const token = localStorage.getItem('token');
            try {
                const response = await axios.post(API + '/events', cleanData, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                });
                console.log(response);
                setFormError(null);
                setSubmitError(null);
            } catch (er) {
                console.error(er)
                const response = er.response.data;
                if (er.status === 400) { // Get the response from backend in state to put on the page
                    setFormError(response);
                } else {
                    setSubmitError(response);
                }
                return response;
            }
            setEventFormState(initialEventFormState);
            setUpdated(updated + 1);
            nameRef.current.focus();
            if (id) {
                navigate(`/events/${id}`);
            } else {
                navigate('/events');
            }
        } else {
            console.log('Only users with the role USER may create events.')
        }
    }

    async function handleUpdateEventSubmit(e) {
        e.preventDefault();
        if (user.username === event?.host.username) { // Only the host may update an event.
            const cleanData = cleanupData(eventFormState);
            const token = localStorage.getItem('token');
            try {
                const response = await axios.patch(API + `/events/${id}`, cleanData, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                });
                console.log(response);
                setFormError(null);
                setSubmitError(null);
            } catch (er) {
                console.error(er)
                const response = er.response.data;
                if (er.status === 400) { // Get the response from backend in state to put on the page
                    setFormError(response);
                } else {
                    setSubmitError(response);
                }
                return response;
            }
            setUpdated(updated + 1);
            nameRef.current.focus();
            if (id) {
                navigate(`/events/${id}`);
            } else {
                navigate('/events');
            }
        } else {
            console.log(`The host, user ${event.host.username}, must be logged in to edit this event.`)
        }
    }

    async function deleteEvent() {
        if (user.username === event?.host.username) {
            const token = localStorage.getItem('token')
            try {
                const response = await axios.delete(`${API}/events/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                });
                console.log(response);
            } catch (er) {
                console.error(er.message);
                console.error(er.response)
                console.error(`${API}/events/${id}`);
            }
        } else {
            console.log(`User ${event.host.username} must be logged in to delete this event.`)
        }
        setUpdated(updated+1);
        navigate("/events");
    }

    return (
        <>
            <InfoBox
                type={type}
                parentType={'event'}
            >
                <form onSubmit={id ? handleUpdateEventSubmit : handleCreateEventSubmit} className="create-form">
                    <FormField
                        start={nameRef}
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
                        isRequired={true}
                        label="Location"
                        type="text"
                        name="location"
                        id="eventLocation"
                        formState={eventFormState}
                        errors={formError}
                        handleChange={(e) => handleFormChange(e, eventFormState, setEventFormState)}
                    />
                    <FormField
                        isRequired
                        label="Game"
                        type="filter"
                        name="gameId"
                        id="gameId"
                        formState={eventFormState}
                        errors={formError}
                        handleChange={setEventFormState}
                    />
                    {/* Only ask host if they are playing when creating a new event */}
                    {!id && <FormField
                        label="Will you also be playing?"
                        type="checkbox"
                        name="isHostPlaying"
                        id="isHostPlaying"
                        formState={eventFormState}
                        errors={formError}
                        handleChange={(e) => handleFormChange(e, eventFormState, setEventFormState)}
                    />}
                    <FormField
                        label="Definitive time"
                        type="datetime-local"
                        name="definitiveTime"
                        id="definitiveTime"
                        formState={eventFormState}
                        errors={formError}
                        handleChange={(e) => handleFormChange(e, eventFormState, setEventFormState)}
                    />
                    <FormField
                        label="Possible times"
                        type="date-picker"
                        name="possibleTimes"
                        id="possibleTimes"
                        formState={eventFormState}
                        errors={formError}
                        handleChange={(e) => handleFormChange(e, eventFormState, setEventFormState)}
                    />
                    <button type="submit">{id ? 'Save' : 'Submit'}</button>
                    <button type="button" onClick={() => navigate(id ? `/events/${id}` : '/events')}>Cancel</button>
                    {/* Display an error on the page if there is any other error than expected. TODO remove unnecessary? */}
                    {submitError && <span className={'field-error'}>
                        {submitError}
                    </span>}
                </form>
                {type === 'edit' && <button type="button" onClick={deleteEvent}>Delete</button>}
            </InfoBox>
        </>
    );
}

export default EventForm;