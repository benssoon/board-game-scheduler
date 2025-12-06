import axios from 'axios';
import {API} from '../globalConstants.js';
import {jwtDecode} from 'jwt-decode';

//<editor-fold desc="Get Requests">
export async function fetchObject(e, type, id, setObject) {
    e.preventDefault();
    try {
        const response = await axios.get(`${API}/${type}s/${id}`);
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
//</editor-fold>

//<editor-fold desc="Post Requests">
export async function createEventPostRequest(e, data) {
    e.preventDefault();
    try {
        const response = await axios.post(API+'/events', data, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            }
        });
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
        const response = await axios.post(API+'/users', {
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
        }
        return errors;
    }
}

export async function createGame(e, data) {
    e.preventDefault();
    try {
        const response = await axios.post(API+'/games', data)
        console.log(response);
    } catch (er) {
        const response = er.response.data;
        const missingKeys = Object.keys(response);
        console.error(er);
        let errors = [];
        for (const key in missingKeys) {
            const missingKey = missingKeys[key]
            const keyProblem = response[missingKey]
            const err = `"${missingKey}" ${keyProblem}`;
            errors.push(err);
        }
        console.log(errors);
        return errors;
    }
}
//</editor-fold>

//<editor-fold desc="Delete requests">
export async function deleteEvent(e, id) {
    e.preventDefault();
    try {
        const response = await axios.delete(`${API}/events/${id}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            }
        });
        console.log(response);
    } catch (er) {
        console.error(er.message + ': ' + er.response.data);
        console.error(`${API}/events/${id}`);
    }
}

export async function deleteGame(e) {
    e.preventDefault();
    console.log("This should be replaced with a custom hook!")
}

export async function deleteEvents(e) {
    e.preventDefault();
    console.log(jwtDecode(localStorage.getItem('token')).sub);
    try {
        const response = await axios.delete(`${API}/events/deleteAll`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        });
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