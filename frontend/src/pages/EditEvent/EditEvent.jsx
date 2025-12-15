import './EditEvent.css';
import InfoBox from '../../components/InfoBox/InfoBox.jsx';
import {cleanupData} from '../../helpers/processingAndFormatting.js';
import {useRef, useState} from 'react';
import {API} from '../../globalConstants.js';
import axios from 'axios';
import {handleFormChange} from '../../helpers/handlers.js';
import FormField from '../../components/FormField/FormField.jsx';
import DatePicker from 'react-multi-date-picker';
import DatePanel from 'react-multi-date-picker/plugins/date_panel';
import TimePicker from 'react-multi-date-picker/plugins/time_picker';

function EditEvent() {
    const initialEventFormState = {
        name: '',
        location: '',
        gameId: 0,
        isHostPlaying: false,
        definitiveTime: '',
        possibleTimes: [],
    }
    const [eventFormState, setEventFormState] = useState(initialEventFormState);
    const [formError, setFormError] = useState(null);
    const [updated, setUpdated] = useState(0);
    const nameRef = useRef(null);

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
                console.error(response);
                setFormError(response)
                return response;
            }
        } else {
            console.error('User must be logged in to create new events.');
            //TODO add on-page error
        }
        setEventFormState(initialEventFormState);
        setUpdated(updated+1);
        nameRef.current.focus();
    }

    return (
        <>
            <h2>Edit event</h2>
            <InfoBox
                type="edit"
            >
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
                {/*<SearchBar
                    handleChange????????
                How do I make it so this can be used in a form as well?
                />*/}
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
            </InfoBox>
        </>
    );
}

export default EditEvent;1