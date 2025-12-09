import axios from 'axios';
import {API} from '../globalConstants.js';
import {jwtDecode} from 'jwt-decode';
import {concatKeysValues} from './processingAndFormatting.js';

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
    const token = localStorage.getItem('token');
    if (token) {
        try {
            const response = await axios.post(API + '/events', data, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });
            console.log(response);
        } catch (er) {
            const response = er.response.data;
            const missingKeys = Object.keys(response);
            console.error(er);
            if (er.status === 403) {
                console.error(er.response.data);
                return er.response.data;
            }
            //TODO send errors to an object stored in state, like with create game
            const errors = [];
            for (const key in missingKeys) {
                const missingKey = missingKeys[key]
                const keyProblem = response[missingKey]
                const err = `"${missingKey}" ${keyProblem}`;
                console.error(err);
                errors.push(err);
                return errors;
            }
        }
    } else {
        console.error('User must be logged in to create new events.');
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

export async function createGamePostRequest(e, data, setErrorArray, setErrorObject) {
    e.preventDefault();
    const token = localStorage.getItem('token');
    try {
        const response = await axios.post(API+'/games', data, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        console.log(response);
    } catch (er) {
        //console.error(er);
        //console.log(er.response.data)
        const errors = concatKeysValues(er.response.data);
        //console.log(errors);
        setErrorArray(errors);
        setErrorObject(er.response.data);
        console.log(data);
        console.log(er.response);
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