import axios from 'axios';
const devApiUrl = 'http://localhost:8080';

//<editor-fold desc="Get Requests">
export async function fetchObject(e, type, id, setObject) {
    e.preventDefault();
    try {
        const response = await axios.get(`${devApiUrl}/${type}s/${id}`);
        console.log(response);
        switch (type) {
            case 'event':
                setObject(response.data);
                break;
            case 'user':
                setObject(response.data);
                break;
            default:
                break;
        }
    } catch (er) {
        console.error(er.message + ': ' + er.response.data);
    }
}

export async function fetchEvents(e, setAllEvents) {
    e.preventDefault();
    try {
        const response = await axios.get(`${devApiUrl}/events`);
        console.log(response.data);
        setAllEvents(response.data);
    } catch (er) {
        console.error(er.message + ': ' + er.response.data);
        setAllEvents([])
    }
}

export async function fetchGames(e, setAllGames) {
    e.preventDefault();
    console.log("This should be a custom hook!");
    try {
        const response = await axios.get(`${devApiUrl}/games`);
        console.log(response.data);
        setAllGames(response.data);
    } catch (er) {
        console.error(er.message + ': ' + er.response.data);
        setAllGames([])
    }
}
//</editor-fold>

//<editor-fold desc="Post Requests">
export async function createEvent(e, eventFormState) {
    e.preventDefault();
    try {
        const response = await axios.post(devApiUrl+'/events', eventFormState)
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

export async function createUser(e) {
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

export async function createGame(e) {
    e.preventDefault();
    console.log("This should be replaced with a custom hook!")
}
//</editor-fold>

//<editor-fold desc="Delete requests">
export async function deleteEvent(e, id) {
    e.preventDefault();
    try {
        const response = await axios.delete(`${devApiUrl}/events/${id}`)
        console.log(response.data);
    } catch (er) {
        console.error(er.message + ': ' + er.response.data);
        console.error(`${devApiUrl}/events/${id}`);
    }
}

export async function deleteGame(e) {
    e.preventDefault();
    console.log("This should be replaced with a custom hook!")
}

export async function deleteEvents(e) {
    e.preventDefault();
    try {
        const response = await axios.delete(`${devApiUrl}/events/deleteAll`)
        console.log(response.data);
    } catch (er) {
        console.error(er);
    }
}

export async function deleteGames(e) {
    e.preventDefault();
    console.log("This should be replaced with a custom hook!")
}
//</editor-fold>