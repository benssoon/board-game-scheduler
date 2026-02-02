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
    const {user, isUser} = useContext(AuthContext);

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

    async function handleEventSubmit(e) {
        e.preventDefault();
        if ((type === 'create' && isUser) || (type === 'edit' && user.username === event?.host.username)) { // Only users with the role USER may create events. Only the event's host may edit the event.
            const cleanData = cleanupData(eventFormState);
            const token = localStorage.getItem('token');
            try {
                const response = await axios[(type === 'create' && 'post') || (type === 'edit' && 'patch')](`${API}/events${type === 'edit' ? `/${id}` : ''}`, cleanData, {
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
            if (id) {
                navigate(`/events/${id}`);
            } else {
                navigate('/events');
            }
        } else {
            if (type === 'create') {
                console.log('Only users with the role USER may create events.')
            }
            if (type === 'edit') {
                console.log(`Only the host, user ${event.host.username}, may edit this event.`)
            }
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
                <form className="create-form" onSubmit={handleEventSubmit}>
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
                    {type === 'create' && <FormField
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
                    <button type="submit">{type === 'edit' ? 'Save' : 'Submit'}</button>
                    <button type="button" onClick={() => navigate(type === 'edit' ? `/events/${id}` : '/events')}>Cancel</button>
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