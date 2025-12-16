import './EventForm.css';
import InfoBox from '../../components/InfoBox/InfoBox.jsx';
import {cleanupData} from '../../helpers/processingAndFormatting.js';
import {useEffect, useRef, useState} from 'react';
import {API} from '../../globalConstants.js';
import axios from 'axios';
import {handleFormChange} from '../../helpers/handlers.js';
import FormField from '../../components/FormField/FormField.jsx';
import {useNavigate, useParams} from 'react-router-dom';
import useFetch from '../../helpers/useFetch.js';
import {DateObject} from 'react-multi-date-picker';


function EventForm({type}) {
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
            if (er.status === 400) {
                setFormError(response);
            } else {
                setSubmitError(response);
            }
            return response;
        }
        setEventFormState(initialEventFormState);
        setUpdated(updated+1);
        nameRef.current.focus();
        if (id) {
            navigate(`/events/${id}`);
        } else {
            navigate('/events');
        }
    }

    async function handleUpdateEventSubmit(e) {
        e.preventDefault();
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
            if (er.status === 400) {
                setFormError(response);
            } else {
                setSubmitError(response);
            }
            return response;
        }
        setUpdated(updated+1);
        nameRef.current.focus();
        if (id) {
            navigate(`/events/${id}`);
        } else {
            navigate('/events');
        }
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
                        isRequired={true}
                        label="Game ID"
                        type="number"
                        name="gameId"
                        id="gameId"
                        formState={eventFormState}
                        errors={formError}
                        handleChange={(e) => handleFormChange(e, eventFormState, setEventFormState)}
                    />
                    {/*<SearchBar
                    handleChange????????
                How do I make it so this can be used in a form as well?
                />*/}
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
                    {submitError && <span className={'field-error'}>
                        {submitError}
                    </span>}
                </form>
            </InfoBox>
        </>
    );
}

export default EventForm;