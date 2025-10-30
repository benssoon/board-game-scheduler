import axios from 'axios';
const devApiUrl = 'http://localhost:8080';

export async function fetchObject(type, id, setEvent, setUser) {
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

export async function fetchEvents(e, setAllEvents) {
        e.preventDefault();
        try {
            const response = await axios.get(`${devApiUrl}/events`);
            console.log(response.data);
            setAllEvents(response.data);
        } catch (e) {
            console.error(e.message + ': ' + e.response.data);
            setAllEvents([])
        }
    }

export async function createEvent(e, eventFormState) {
    console.log(e);
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