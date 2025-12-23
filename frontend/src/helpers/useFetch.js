import {useContext, useEffect, useState} from 'react';
import axios from 'axios';
import {API} from '../globalConstants.js';
import {AuthContext} from '../context/AuthContext.jsx';
import {useNavigate} from 'react-router-dom';

function useFetch(endpoint, config, updated) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const {isAuth, user} = useContext(AuthContext);
    const navigate = useNavigate();

/*
    useEffect(() => {
        if (isAuth && user && endpoint === `/users/${user?.username}`) {
            console.log('redirecting...')
            return navigate('/profile'); // Redirect to the profile page if the logged in user clicked on their own link.
        }
    }, []);
*/

    useEffect(() => {
        if(!endpoint) return; // Do not fetch data if there is no endpoint passed (i.e. for error/loading cards).
        const controller = new AbortController(); //TODO what should I do with this?
        const url = API + endpoint;
        async function fetchData() {
            setLoading(true);
            setError(false);
            try {
                const response = await axios.get(url, config);
                setData(response.data);
            } catch (er) {
                console.error(er);
                setError(er);
            }
            setLoading(false);
        }

        fetchData();

        return function cleanup() {
            controller.abort();
        }
    }, [endpoint, updated]);

    return {data, loading, error};
}

export default useFetch;