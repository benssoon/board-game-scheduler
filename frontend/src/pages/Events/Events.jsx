import './Events.css';
import FiltersBox from '../../components/FiltersBox/FiltersBox.jsx';
import DisplayGrid from '../../components/DisplayGrid/DisplayGrid.jsx';
import {useContext, useState} from 'react';
import axios from 'axios';
import {API} from '../../globalConstants.js';
import {useNavigate} from 'react-router-dom';
import {AuthContext} from '../../context/AuthContext.jsx';
import InfoBox from '../../components/InfoBox/InfoBox.jsx';

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
            <div className={'categoryHeader'}>
                <h2>Events</h2>
                {(isAdmin || isUser) && <InfoBox
                    type={'actions'}
                >
                    {isUser && <button type="button" onClick={createEvent}>Create Event</button>}
                    {isAdmin && <button type="button" onClick={deleteEvents}>Delete all</button>}
                </InfoBox>}
            </div>
            {/*<editor-fold desc="Events Grid">*/}
            <section className="categoryBox">
                <FiltersBox
                    setParam={setParam} // Set param inside FiltersBox and give param to DisplayGrid
                    searchingFor={'events'}
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