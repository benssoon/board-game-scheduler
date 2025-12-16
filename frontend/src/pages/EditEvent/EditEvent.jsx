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
import EventForm from '../../components/EventForm/EventForm.jsx';

function EditEvent() {
    return (
        <>
            <EventForm
                type={'edit'}
            />
        </>
    );
}

export default EditEvent;