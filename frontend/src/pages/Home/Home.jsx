import './Home.css';
import axios from 'axios';
import {useState} from 'react';
import Card from '../../components/Card/Card.jsx';

function Home() {
    const devApiUrl = 'http://localhost:8080';

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

    //<editor-fold desc="HTTP requests">
    async function fetchObject(type, id) {
        try {
            const response = await axios.get(`${devApiUrl}/${type}s/${id}`);
            console.log(response);
            switch (type) {
                case 'event':
                    setEvent(response.data);
                    break;
                case 'user':
                    setUser(response.data);
                    break;
                default:
                    break;
            }
        } catch (e) {
            console.error(e.message + ': ' + e.response.data);
        }
    }


    async function createUser(e) {
        e.preventDefault();
        try {
            const response = await axios.post(devApiUrl+'/users', {
                name: 'Ben',
                emailAddress: 'ben@ben.com',
            })
            console.log(response);
        } catch (e) {
            const response = e.response.data;
            const missingKeys = Object.keys(response);
            console.error(e);
            let errors = [];
            for (const key in missingKeys) {
                const missingKey = missingKeys[key]
                const keyProblem = response[missingKey]
                const err = `"${missingKey}" ${keyProblem}`;
                console.error(err);
                errors.push(err);
                return errors;
            }
        }
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