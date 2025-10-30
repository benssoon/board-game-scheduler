import './Home.css';
import axios from 'axios';
import {useState} from 'react';
import Card from '../../components/Card/Card.jsx';
import {createEvent, fetchObject} from '../../helpers/httpRequests.js';

function Home() {


    //<editor-fold desc="State">
    const [formState, setFormState] = useState({
        userId: 0,
        eventId: 0,
    });



    const [user, setUser] = useState({});
    const [event, setEvent] = useState({});
    //</editor-fold>

    //<editor-fold desc="Handlers">
    function handleClick(type, id) {
        fetchObject(type, formState[id]);
    }

    function handleChange(e) {
        const changedFieldName = e.target.name;
        const newValue = e.target.value;

        setFormState({
            ...formState,
            [changedFieldName]: newValue,
        });
    }


    //</editor-fold>

    return (
        <>
            <h1>Home</h1>

            {/*<editor-fold desc="Get Event Form">*/}
            <form>
                <label htmlFor="eventId">Event ID:</label>
                <input
                    type="number"
                    name="eventId"
                    id="eventId"
                    value={formState['eventId']}
                    onChange={handleChange}
                />
                <button type="button" onClick={() => handleClick('event', 'eventId')}>Get event</button>
            </form>
            {/*</editor-fold>*/}

            {/*<editor-fold desc="Get User Form">*/}
            <form>
                <label htmlFor="UserId">User ID:</label>
                <input
                    type="number"
                    name="userId"
                    id="userId"
                    value={formState['userId']}
                    onChange={handleChange}
                />
                <button type="button" onClick={() => handleClick('user', 'userId')}>Get user</button>
            </form>
            {/*</editor-fold>*/}
        </>
    );
}

export default Home;