// CSS
import './Events.css';

// Components
import FiltersBox from '../../components/FiltersBox/FiltersBox.jsx';
import DisplayGrid from '../../components/DisplayGrid/DisplayGrid.jsx';

// Libraries

// Functions
import {useContext, useEffect, useRef, useState} from 'react';
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
import {AuthContext} from '../../context/AuthContext.jsx';

function Events() {
    //<editor-fold desc="State">
    const [param, setParam] = useState('');
    const [updated, setUpdated] = useState(0);
    //</editor-fold>

    const navigate = useNavigate();
    const {isAdmin, isUser} = useContext(AuthContext);

    //<editor-fold desc="Handlers">
    function createEvent() {
        if (isUser) {
            navigate('/events/create');
        } else {
            console.error('Only a user can create an event.');
        }
    }

    async function deleteEvents(e) {
        e.preventDefault();
        if (isAdmin) {
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
            setUpdated(updated + 1);
        } else {
            console.error('Only an admin can delete all events.')
        }
    }
    //</editor-fold>

    return (
        <div className="categoryPage">
            <h2>Events</h2>

            <button type="button" onClick={createEvent}>Create Event</button>

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