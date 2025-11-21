import {useEffect, useState} from 'react';
import axios from 'axios';
import {API} from './globalConstants.js';

function useFetch(endpoint) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    function delay(ms) {
        return new Promise((resolve) => setTimeout(resolve, ms));
    }

    useEffect(() => {
        if(!endpoint) return; // Do not fetch data if there is no endpoint passed (i.e. for error/loading cards).
        const controller = new AbortController();
        const url = API + endpoint;

        async function fetchData() {
            setLoading(true);
            setError(false);
            try {
                const response = await axios.get(url);
                setData(response.data);
            } catch (er) {
                setError(er);
                console.log("Here comes the error:")
                console.error(er);
                console.error(er.message);
                console.error(endpoint);
            }
            setLoading(false);
        }

        fetchData();

        return function cleanup() {
            controller.abort();
        }
    }, [endpoint]);

    return {data, loading, error};
}

export default useFetch;