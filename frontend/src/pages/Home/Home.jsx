// CSS
import './Home.css';

// Components

// Libraries

// Functions
import {useState} from 'react';
import {fetchObject} from '../../helpers/httpRequests.js';

function Home() {


    //<editor-fold desc="State">
    const [formState, setFormState] = useState({
        userId: 0,
        eventId: 0,
        gameId: 0,
    });
    const [user, setUser] = useState({});
    const [game, setGame] = useState({});
    const [event, setEvent] = useState({});
    //</editor-fold>

    //<editor-fold desc="Handlers">
    function handleSubmit(e, type, id, setObject) {
        fetchObject(e, type, formState[id], setObject);
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
            <form onSubmit={(e) => handleSubmit(e, 'event', 'eventId', setEvent)}>
                <label htmlFor="eventId">Event ID:</label>
                <input
                    type="number"
                    name="eventId"
                    id="eventId"
                    value={formState['eventId']}
                    onChange={handleChange}
                />
                <button type="submit">Get event</button>
            </form>
            {/*</editor-fold>*/}

            {/*<editor-fold desc="Get User Form">*/}
            <form onSubmit={(e) => handleSubmit(e,'user', 'userId', setUser)}>
                <label htmlFor="UserId">User ID:</label>
                <input
                    type="number"
                    name="userId"
                    id="userId"
                    value={formState['userId']}
                    onChange={handleChange}
                />
                <button type="submit">Get user</button>
            </form>
            {/*</editor-fold>*/}

            {/*<editor-fold desc="Get Game Form">*/}
            <form onSubmit={(e) => handleSubmit(e, 'game', 'gameId', setGame)}>
                <label htmlFor="gameId">Game ID:</label>
                <input
                    type="number"
                    name="gameId"
                    id="gameId"
                    value={formState['gameId']}
                    onChange={handleChange}
                />
                <button type="submit">Get game</button>
            </form>
            {/*</editor-fold>*/}
        </>
    );
}

export default Home;